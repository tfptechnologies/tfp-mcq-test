import React, { useState, useEffect, useTransition, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./lib/firebase";
import TFPLogo from "./assets/tfp-logo.png";
import questions from "./lib/questions";
import useWakeLock from "./hook/useWakeLock";


export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    phoneNumber: "",
  });
  const [formError, setFormError] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, startSubmitting] = useTransition();

  const [showPasswordUI, setShowPasswordUI] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const questionRefs = useRef({});
  const answersRef = useRef({});
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    if (!quizStarted || submitted) return;

    if (timeLeft <= 0) {
      autoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizStarted, submitted]);

  useEffect(() => {
    if (!quizStarted || submitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        autoSubmit();
      }
    };

    const handleBlur = () => {
      autoSubmit();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [quizStarted, submitted]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!userInfo.name.trim() || !userInfo.phoneNumber.trim()) {
      setFormError(" Please fill in all the details!");
      return;
    }

    if (userInfo.phoneNumber.length !== 10) {
      setFormError(" Phone number must be 10 digits!");
      return;
    }

    setFormError("");
    setShowPasswordUI(true);
  };

  const handlePasswordSubmit = () => {
    if (password === "TFP@2026@PY3") {
      setPasswordError("");
      setShowPasswordUI(false);
      setQuizStarted(true);
    } else {
      setPasswordError("❌ Wrong Password!");
    }
  };

  const handleChange = (qid, val) => {
    // setAnswers((prev) => ({ ...prev, [qid]: val }));
    const updated = {
      ...answersRef.current,
      [qid]: val,
    };

    answersRef.current = updated;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const firstUnanswered = questions.find((q) => !answers[q.id]);

    if (firstUnanswered) {
      setError(" Please answer all the questions before submitting!");

      const element = questionRefs.current[firstUnanswered.id];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });

        // Optional: add focus if input exists
        const input = element.querySelector("input, button");
        if (input) input.focus();
      }

      return;
    }

    const score = questions.reduce(
      (acc, q) => (answers[q.id] === q.correct ? acc + 1 : acc),
      0,
    );

    const wrong = questions.length - score;
    const percent = Math.round((score / questions.length) * 100);

    const collectionRef = collection(db, "aditya_clg_py_quiz_submissions");
    const payload = {
      name: userInfo.name,
      rollNumber: userInfo.rollNumber,
      branch: userInfo.branch,
      phoneNumber: userInfo.phoneNumber,
      score,
      wrong,
      percent,
      answers,
      timestamp: new Date(),
      quiz: 3,
    };

    startSubmitting(async () => {
      await addDoc(collectionRef, payload);
      setError("");
      setSubmitted(true);
      setShowModal(true);
    });
  };

  const autoSubmit = async () => {
    if (hasSubmittedRef.current) return;

    hasSubmittedRef.current = true; // instant lock
    setSubmitted(true);

    const currentAnswers = answersRef.current;

    const score = questions.reduce(
      (acc, q) => (currentAnswers[q.id] === q.correct ? acc + 1 : acc),
      0,
    );

    const wrong = questions.length - score;
    const percent = Math.round((score / questions.length) * 100);

    try {
      await addDoc(collection(db, "python_4_30_to_5_50_submissions"), {
        ...userInfo,
        score,
        wrong,
        percent,
        answers: currentAnswers,
        timestamp: new Date(),
        autoSubmitted: true,
        quiz: 1,
      });
    } catch (err) {
      console.error(err);
    }

    setShowModal(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(1800);
    setError("");
    setShowModal(false);
    setQuizStarted(false);
    setUserInfo({ name: "", rollNumber: "", branch: "", phoneNumber: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const score = questions.reduce(
    (acc, q) => (answers[q.id] === q.correct ? acc + 1 : acc),
    0,
  );
  useWakeLock(quizStarted && !submitted);
  const wrong = questions.length - score;
  const percent = Math.round((score / questions.length) * 100);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Determine timer urgency color
  const timerUrgent = timeLeft <= 300; // last 5 minutes
  const timerWarning = timeLeft <= 600 && timeLeft > 300; // last 10 minutes

  // ─── Registration Screen ───────────────────────────────────────────────────
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 flex items-center justify-center p-3 sm:p-6">
        <div className="max-w-lg w-full bg-white/90 p-5 sm:p-7 rounded-3xl shadow-2xl border border-indigo-100">
          {/* Header */}
          <div className="text-center mb-6 flex flex-col items-center">
            <img
              src={TFPLogo}
              alt="Logo"
              className="mb-3 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-indigo-100 shadow"
              style={{ objectFit: "contain", background: "#eef2ff" }}
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-400 bg-clip-text text-transparent mb-2 drop-shadow-sm">
              Quiz Registration
            </h1>
            <p className="text-gray-600 font-medium text-sm sm:text-base tracking-wide">
              Fill in your details to unlock the quiz!
            </p>
          </div>

          {/* Form Error */}
          {formError && (
            <div className="p-3 mb-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg font-semibold text-sm shadow">
              <span className="mr-2">⛔</span>
              {formError}
            </div>
          )}

          {/* Form */}
          <form
            autoComplete="off"
            className="space-y-4 sm:space-y-5"
            onSubmit={handleFormSubmit}
          >
            {/* Name */}
            <div>
              <label className="block text-indigo-900 font-bold mb-1.5 text-sm sm:text-base flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.582 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleFormChange}
                autoComplete="name"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border-2 border-indigo-100 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none bg-indigo-50 text-sm sm:text-base transition"
              />
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-indigo-900 font-bold mb-1.5 text-sm sm:text-base flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h18M3 12h18M3 17h18"
                  />
                </svg>
                Roll Number
              </label>
              <input
                type="text"
                name="rollNumber"
                value={userInfo.rollNumber}
                onChange={handleFormChange}
                autoComplete="off"
                placeholder="e.g. 22IT053"
                className="w-full px-4 py-3 border-2 border-indigo-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none bg-indigo-50 text-sm sm:text-base transition"
              />
            </div>

            {/* Branch + Phone side by side on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-indigo-900 font-bold mb-1.5 text-sm sm:text-base flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-indigo-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"
                    />
                  </svg>
                  Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  value={userInfo.branch}
                  onChange={handleFormChange}
                  autoComplete="organization"
                  placeholder="e.g. CSE, IT, ECE"
                  className="w-full px-4 py-3 border-2 border-indigo-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none bg-indigo-50 text-sm sm:text-base transition"
                />
              </div>
              <div>
                <label className="block text-indigo-900 font-bold mb-1.5 text-sm sm:text-base flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-indigo-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h2.586A2 2 0 0110 4.414l1.293 1.293a1 1 0 001.414 0L14 4.414A2 2 0 0115.414 3H18a2 2 0 012 2V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                    />
                  </svg>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handleFormChange}
                  autoComplete="tel"
                  placeholder="e.g. 9876543210"
                  maxLength={10}
                  inputMode="numeric"
                  className="w-full px-4 py-3 border-2 border-indigo-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-100 focus:outline-none bg-indigo-50 text-sm sm:text-base transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base sm:text-lg font-extrabold rounded-xl hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-all shadow-lg mt-2"
            >
              <svg
                className="w-5 h-5 text-white opacity-80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2l4-4m5.707-2.707A8 8 0 11.293 7.293a8 8 0 0114.414 0z"
                />
              </svg>
              Start Quiz
            </button>
          </form>

          {/* Password Modal */}
          {showPasswordUI && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 text-indigo-700">
                  Enter Password to Start Quiz
                </h2>

                <div className="relative mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handlePasswordSubmit()
                    }
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-12 text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 p-1"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        width="22"
                        height="22"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13.359 11.238 15.147 13a.5.5 0 0 0 .707-.707L2.707 1.146a.5.5 0 0 0-.707.707l2.045 2.044C2.319 5.117.89 7.385.843 7.464a.5.5 0 0 0 0 .497C1.37 8.672 4.221 13 8 13a6.134 6.134 0 0 0 3.439-1.051l.408.408zm-1.219-1.219-1.084-1.084A2.5 2.5 0 0 1 6.065 6.08l-1.07-1.071A4.534 4.534 0 0 0 3.07 7.977C3.438 8.437 5.526 11 8 11c1.183 0 2.354-.448 3.14-1.2zm-3.154-3.154-1.983-1.983A2.5 2.5 0 0 1 8 5c1.342 0 2.486 1.004 2.481 2.241l-1.495-1.495a.5.5 0 1 0-.707.707zm7.214 1.6a14.434 14.434 0 0 0-2.697-3.278A6.134 6.134 0 0 0 8 3c-.898 0-1.773.16-2.602.454l-.847-.847A7.032 7.032 0 0 1 8 2c4.221 0 7.072 4.328 7.157 4.461a.5.5 0 0 1 0 .496z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        width="22"
                        height="22"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                      </svg>
                    )}
                  </button>
                </div>

                {passwordError && (
                  <p className="text-red-500 text-sm mb-3">{passwordError}</p>
                )}

                <button
                  onClick={handlePasswordSubmit}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  Verify & Start
                </button>
              </div>
            </div>
          )}

          {/* Quiz Info */}
          <div className="mt-6 p-4 bg-blue-100/60 rounded-xl border border-blue-200 text-center">
            <p className="text-sm sm:text-base text-blue-900 font-semibold mb-2">
              <strong>Quiz Details</strong>
            </p>
            <div className="flex justify-center gap-4 sm:gap-6 text-blue-800 font-medium text-sm">
              <span>
                📝 <strong className="text-indigo-700">50</strong> Questions
              </span>
              <span>
                ⏱️ <strong className="text-indigo-700">30</strong> Minutes
              </span>
              <span>☑️ MCQ</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Quiz Screen ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ── Sticky Timer Bar (mobile: always visible at top) ── */}
      {!submitted && (
        <div
          className={`
            sticky top-0 z-40 w-full
            flex items-center justify-between
            px-4 py-2.5 sm:py-3
            shadow-md
            ${
              timerUrgent
                ? "bg-red-600 text-white"
                : timerWarning
                  ? "bg-orange-500 text-white"
                  : "bg-indigo-700 text-white"
            }
          `}
        >
          {/* Left: Quiz label */}
          <div className="flex items-center gap-2">
            <img
              src={TFPLogo}
              alt="Logo"
              className="w-7 h-7 rounded-full bg-white/20 object-contain"
            />
            <span className="font-bold text-sm sm:text-base hidden xs:inline">
              Python Quiz
            </span>
          </div>

          {/* Center: Timer */}
          <div className="flex items-center gap-2">
            <svg
              className={`w-5 h-5 ${timerUrgent ? "animate-pulse" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" d="M12 7v5l3 3" />
            </svg>
            <span
              className={`text-xl sm:text-2xl font-mono font-extrabold tracking-widest ${timerUrgent ? "animate-pulse" : ""}`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Right: Progress */}
          <div className="text-right">
            <span className="text-xs sm:text-sm font-semibold opacity-90">
              {Object.keys(answers).length}/{questions.length}
            </span>
            <div className="w-16 sm:w-24 h-1.5 bg-white/30 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{
                  width: `${(Object.keys(answers).length / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="py-6 px-3 sm:px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Quiz header card */}
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={TFPLogo}
                alt="Quiz Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-indigo-700 leading-tight">
                  Python Basic Quiz
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {questions.length} Questions · 30 Minutes
                </p>
              </div>
            </div>

            {/* User info pill */}
            <div className="bg-indigo-50 rounded-xl p-3 text-xs sm:text-sm text-gray-700 flex flex-wrap gap-x-3 gap-y-1">
              <span>
                <strong>Name:</strong> {userInfo.name}
              </span>
              <span>
                <strong>Phone:</strong> {userInfo.phoneNumber}
              </span>
              {userInfo.rollNumber && (
                <span>
                  <strong>Roll:</strong> {userInfo.rollNumber}
                </span>
              )}
              {userInfo.branch && (
                <span>
                  <strong>Branch:</strong> {userInfo.branch}
                </span>
              )}
            </div>
          </div>

          {/* Desktop-only inline timer (hidden on mobile since sticky bar handles it) */}
          {!submitted && (
            <div className="hidden sm:block mx-6 mt-5">
              <div
                className={`text-center p-3 rounded-xl border-2 font-bold text-lg
                ${
                  timerUrgent
                    ? "bg-red-50 border-red-400 text-red-600 animate-pulse"
                    : timerWarning
                      ? "bg-orange-50 border-orange-400 text-orange-600"
                      : "bg-red-50 border-red-300 text-red-600"
                }`}
              >
                ⏱ Time Remaining: {formatTime(timeLeft)}
              </div>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div className="mx-4 sm:mx-6 mt-4 p-3 bg-red-100 border-2 border-red-400 text-red-700 rounded-xl font-semibold text-sm">
              {error}
            </div>
          )}

          {/* Questions */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {questions.map((q) => (
              <div
                key={q.id}
                ref={(el) => (questionRefs.current[q.id] = el)}
                className="p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-200"
              >
                {/* Question text */}
                <h3 className="font-bold text-base sm:text-lg mb-3 text-gray-800 leading-snug">
                  {`${q.id.toUpperCase()}. ${q.question}`}
                </h3>

                {/* Code block */}
                {q.code && (
                  <pre className="bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto my-3 text-xs sm:text-sm leading-relaxed">
                    <code>{q.code}</code>
                  </pre>
                )}

                {/* Options */}
                <div className="space-y-2 mt-3">
                  {q.options.map((opt) => {
                    const isChecked = answers[q.id] === opt;
                    const isCorrect = opt === q.correct;

                    let labelClass =
                      "flex items-start gap-3 p-3 sm:p-3.5 border-2 rounded-xl cursor-pointer transition-all select-none ";

                    if (submitted) {
                      if (isCorrect) {
                        labelClass +=
                          "bg-green-100 border-green-500 font-semibold";
                      } else if (isChecked) {
                        labelClass += "bg-red-100 border-red-500";
                      } else {
                        labelClass += "bg-gray-100 border-gray-300";
                      }
                    } else {
                      if (isChecked) {
                        labelClass += "bg-blue-100 border-blue-500";
                      } else {
                        labelClass +=
                          "bg-white border-gray-300 hover:bg-gray-100 hover:border-gray-400 active:bg-blue-50";
                      }
                    }

                    return (
                      <label key={opt} className={labelClass}>
                        {/* Custom radio for better touch target */}
                        <input
                          type="radio"
                          name={q.id}
                          value={opt}
                          checked={isChecked}
                          disabled={submitted}
                          onChange={() => handleChange(q.id, opt)}
                          className="mt-0.5 w-4 h-4 flex-shrink-0 accent-indigo-600"
                        />
                        <span className="text-sm sm:text-base text-gray-800 leading-snug flex-1">
                          {opt}
                        </span>
                        {submitted && isCorrect && (
                          <span className="text-green-600 font-bold flex-shrink-0">
                            ✓
                          </span>
                        )}
                        {submitted && isChecked && !isCorrect && (
                          <span className="text-red-600 font-bold flex-shrink-0">
                            ✗
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>

                {/* Correct answer hint after submit */}
                {submitted && answers[q.id] !== q.correct && (
                  <p className="text-green-700 text-sm font-bold mt-3 p-2.5 bg-green-50 rounded-lg border border-green-200">
                    ✅ Correct Answer: {q.correct}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="px-4 sm:px-6 pb-6 sm:pb-8">
            {!submitted && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base sm:text-lg font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting…" : "Submit Quiz"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Result Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          {/* Sheet on mobile, centered modal on desktop */}
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Drag handle (mobile) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-indigo-700">
                🎉 Quiz Result
              </h2>

              {/* User info */}
              <div className="mb-5 p-3 bg-indigo-50 rounded-xl text-sm">
                <p>
                  <strong>Name:</strong> {userInfo.name}
                </p>
                <p>
                  <strong>Phone:</strong> {userInfo.phoneNumber}
                </p>
                {(userInfo.rollNumber || userInfo.branch) && (
                  <p>
                    {userInfo.rollNumber && (
                      <>
                        <strong>Roll:</strong> {userInfo.rollNumber}{" "}
                      </>
                    )}
                    {userInfo.branch && (
                      <>
                        <strong>Branch:</strong> {userInfo.branch}
                      </>
                    )}
                  </p>
                )}
              </div>

              {/* Score cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-blue-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Total
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {questions.length}
                  </p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Score
                  </p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {percent}%
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Correct
                  </p>
                  <p className="text-2xl font-bold text-green-600">{score}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Wrong
                  </p>
                  <p className="text-2xl font-bold text-red-600">{wrong}</p>
                </div>
              </div>

              {/* Performance message */}
              <div className="text-center text-xl font-bold mb-5">
                {percent >= 80 && (
                  <p className="text-green-600">🏆 Excellent!</p>
                )}
                {percent >= 60 && percent < 80 && (
                  <p className="text-blue-600">👍 Good Job!</p>
                )}
                {percent >= 40 && percent < 60 && (
                  <p className="text-yellow-600">📚 Keep Learning!</p>
                )}
                {percent < 40 && (
                  <p className="text-red-600">💪 Practice More!</p>
                )}
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all text-base"
              >
                View Answers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
