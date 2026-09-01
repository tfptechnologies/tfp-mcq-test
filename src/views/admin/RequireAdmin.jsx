import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  const redirectTo = useMemo(() => {
    const path = location.pathname + (location.search || "");
    return `/admin/login?next=${encodeURIComponent(path)}`;
  }, [location]);

  // ✅ Tumhara admin email
  const ADMIN_EMAILS = ["admin@tfptechnoligies.in"];

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // ❌ not admin
  if (!ADMIN_EMAILS.includes(user.email)) {
    return (
      <div className="text-center mt-10 text-red-600 font-bold">
        ❌ Access Denied (Not Admin)
      </div>
    );
  }

  // ✅ allowed
  return children;
}