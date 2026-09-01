import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../../lib/firebase";

function toDateString(ts) {
  try {
    const d =
      ts?.toDate?.() ||
      (typeof ts === "string" || typeof ts === "number"
        ? new Date(ts)
        : null) ||
      null;
    if (!d || Number.isNaN(d.getTime())) return "-";
    return d.toLocaleString();
  } catch {
    return "-";
  }
}

function escapeCsv(value) {
  const s = value == null ? "" : String(value);
  if (/[,"\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function downloadCsv(filename, rows) {
  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function AdminResults() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [search, setSearch] = useState("");
  const [minPercent, setMinPercent] = useState("");
  const [autoOnly, setAutoOnly] = useState(false);

  async function fetchPage({ after } = {}) {
    if (!localStorage.getItem("adminLoginlogin")) {
      window.location.href = "/admin/login";
    }

    const base = [
      collection(db, "python_4_30_to_5_50_submissions"),
      orderBy("timestamp", "desc"),
      limit(50),
    ];
    const q = after ? query(...base, startAfter(after)) : query(...base);
    const snap = await getDocs(q);
    const next = snap.docs.at(-1) || null;
    const nextRows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { next, nextRows, empty: snap.empty };
  }

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError("");
      try {
        const { next, nextRows, empty } = await fetchPage();
        if (cancelled) return;
        setRows(nextRows);
        setCursor(next);
        setHasMore(!empty && Boolean(next));
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load results");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onLoadMore() {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    setError("");
    try {
      const { next, nextRows, empty } = await fetchPage({ after: cursor });
      setRows((prev) => [...prev, ...nextRows]);
      setCursor(next);
      setHasMore(!empty && Boolean(next));
    } catch (e) {
      setError(e?.message || "Failed to load more");
    } finally {
      setLoadingMore(false);
    }
  }

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    const minP = minPercent === "" ? null : Number(minPercent);
    return rows.filter((r) => {
      if (autoOnly && !r.autoSubmitted) return false;

      if (minP != null && Number.isFinite(minP)) {
        const p = Number(r.percent ?? 0);
        if (p < minP) return false;
      }

      if (!s) return true;
      const hay = [
        r.name,
        r.rollNumber,
        r.branch,
        r.phoneNumber,
        r.phone,
        r.school,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(s);
    });
  }, [autoOnly, minPercent, rows, search]);

  function onExport() {
    const header = [
      "Name",
      "RollNumber",
      "Branch",
      "PhoneNumber",
      "Score",
      "Wrong",
      "Percent",
      "AutoSubmitted",
      "Timestamp",
      "DocId",
      "quiz",
    ]
      .map(escapeCsv)
      .join(",");

    const lines = filtered.map((r) =>
      [
        r.name,
        r.rollNumber,
        r.branch,
        r.phoneNumber ?? r.phone,
        r.score,
        r.wrong,
        r.percent,
        r.autoSubmitted ? "yes" : "no",
        toDateString(r.timestamp),
        r.id,
        r.quiz ?? 1,
      ]
        .map(escapeCsv)
        .join(","),
    );

    const filename = `quiz_submissions_${new Date()
      .toISOString()
      .slice(0, 19)
      .replaceAll(":", "-")}.csv`;
    downloadCsv(filename, [header, ...lines]);
  }

  async function onLogout() {
    await signOut(auth);
    localStorage.removeItem("adminLoginlogin");
    window.location.href = "/admin/login";
  }

  //Delete Action

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setShowDeleteModal(true);
  };

  // confirm delete
  const confirmDelete = async () => {
    if (!selectedRow) {console.log("No Row found");return;};

    try {
      setDeleting(true);

      await deleteDoc(
        doc(db, "aditya_clg_py_quiz_submissions", selectedRow.id),
      );

      // remove from UI list
      setRows((prev) => prev.filter((item) => item.id !== selectedRow.id));

      setShowDeleteModal(false);
      setSelectedRow(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700">
                Admin Panel
              </h1>
              <p className="text-gray-600 mt-1">
                Python Quiz submissions from {" "}
                <span className="font-semibold">Aditya College</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onExport}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
              >
                Export CSV
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-lg bg-slate-200 text-slate-800 font-semibold hover:bg-slate-300"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Search (name/phone/roll/branch)
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="type to filter..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Min % (e.g. 60)
              </label>
              <input
                value={minPercent}
                onChange={(e) => setMinPercent(e.target.value)}
                placeholder="0 - 100"
                inputMode="numeric"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex items-end">
              <label className="inline-flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg w-full">
                <input
                  type="checkbox"
                  checked={autoOnly}
                  onChange={(e) => setAutoOnly(e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-gray-800 font-semibold">
                  Auto-submitted only
                </span>
              </label>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="mt-5 overflow-auto rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-700">
                  <th className="p-3 font-bold">Name</th>
                  <th className="p-3 font-bold">Roll</th>
                  <th className="p-3 font-bold">Branch</th>
                  <th className="p-3 font-bold">Phone</th>
                  <th className="p-3 font-bold">Score</th>
                  <th className="p-3 font-bold">%</th>
                  <th className="p-3 font-bold">Auto</th>
                  <th className="p-3 font-bold">Time</th>
                  <th className="p-3 font-bold">Quiz</th>
                  <th className="p-3 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td className="p-4 text-gray-600" colSpan={8}>
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td className="p-4 text-gray-600" colSpan={8}>
                      No results found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-indigo-50/40">
                      <td className="p-3 font-semibold text-slate-900">
                        {r.name || "-"}
                      </td>
                      <td className="p-3 text-slate-700">
                        {r.rollNumber || "-"}
                      </td>
                      <td className="p-3 text-slate-700">{r.branch || "-"}</td>
                      <td className="p-3 text-slate-700">
                        {r.phoneNumber ?? r.phone ?? "-"}
                      </td>
                      <td className="p-3 text-slate-700">
                        {r.score ?? "-"} / 50
                      </td>
                      <td className="p-3 text-slate-700">{r.percent ?? "-"}</td>
                      <td className="p-3 text-slate-700">
                        {r.autoSubmitted ? "Yes" : "No"}
                      </td>
                      <td className="p-3 text-slate-700">
                        {toDateString(r.timestamp)}
                      </td>
                      <td className="p-3 text-slate-700">{r.quiz ?? 1}</td>
                      <td className="p-3 text-slate-700">
                        {" "}
                        <button
                          onClick={() => handleDeleteClick(r)}
                          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl">
                <h2 className="text-xl font-bold text-slate-800 mb-3">
                  Confirm Delete
                </h2>

                <p className="text-slate-600 mb-5">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">{selectedRow?.name}</span> (
                  {selectedRow?.rollNumber}) ?
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={confirmDelete}
                    disabled={deleting}
                    className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing <span className="font-semibold">{filtered.length}</span> /{" "}
              <span className="font-semibold">{rows.length}</span> loaded
            </div>
            <div>
              {hasMore && (
                <button
                  onClick={onLoadMore}
                  disabled={loadingMore}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 font-semibold hover:bg-gray-50 disabled:opacity-60"
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
