"use client";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import SessionDetail from "../../../../components/study-features/sessionDetail";

export default function SessionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <ProtectedRoute>
      <main>
        <SessionDetail sessionId={params.id} />
      </main>
    </ProtectedRoute>
  );
}
