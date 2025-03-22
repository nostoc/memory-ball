"use client";
import ProtectedRoute from "../../../components/ProtectedRoute";
import SessionHistory from "../../../components/study-features/sessionHistory";

export default function SessionsPage() {
  return (
    <ProtectedRoute>
      <main>
        <SessionHistory />
      </main>
    </ProtectedRoute>
  );
}
