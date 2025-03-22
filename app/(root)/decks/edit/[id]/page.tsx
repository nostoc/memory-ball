"use client";
import DeckForm from "../../../../../components/deck/deckForm";
import ProtectedRoute from "../../../../../components/ProtectedRoute";

export default function EditDeckPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <main>
        <DeckForm deckId={params.id} />
      </main>
    </ProtectedRoute>
  );
}
