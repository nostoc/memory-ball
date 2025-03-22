"use client";
import ProtectedRoute from "../../../components/ProtectedRoute";
import StudyDashboard from "../../../components/study-features/studyDashboard";

export default function StatsPage() {
  return (
    <ProtectedRoute>
      <main>
        <StudyDashboard />
      </main>
    </ProtectedRoute>
  );
}
