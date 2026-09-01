import React, { useMemo, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../../lib/firebase";

export default function AdminLogin() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const next = (() => searchParams.get("next") || "/admin/results", [
    searchParams,
  ]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      let x=await signInWithEmailAndPassword(auth, email.trim(), password);
      if(x.user) {localStorage.setItem('adminLoginlogin', 'true');}
      console.log("Login successful");
      // /admin/results
      navigate("/admin/results");
      // navigate(next, { replace: true });
    } catch (err) {
      console.log("Login failed");
      setError(err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-indigo-700 text-center">
          Admin Login
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Sign in to view quiz submissions.
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="admin@yourdomain.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-indigo-700 font-semibold hover:underline"
          >
            Back to quiz
          </a>
        </div>
      </div>
    </div>
  );
}

