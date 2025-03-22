"use client";
import StudySession from "../../../../../components/study-session/studySession";
import ProtectedRoute from "../../../../../components/ProtectedRoute";

export default function StudyPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <main>
        <StudySession deckId={params.id} />
      </main>
    </ProtectedRoute>
  );
}
