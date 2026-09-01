import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import QuizApp from "../App.jsx";
import AdminLogin from "../views/admin/AdminLogin.jsx";
import AdminResults from "../views/admin/AdminResults.jsx";
import RequireAdmin from "../views/admin/RequireAdmin.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<QuizApp />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      {/* <Route path="/admi
      n/demo-results" element={<AdminResults />} /> */}
      <Route
        path="/admin/results"
        element={
          // <RequireAdmin>
            <AdminResults />
          // </RequireAdmin>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

