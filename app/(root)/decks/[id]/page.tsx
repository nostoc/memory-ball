"use client";
import DeckDetail from "../../../../components/deck/deckDetail";
import ProtectedRoute from "../../../../components/ProtectedRoute";

export default function ViewDeckPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <main>
        <DeckDetail deckId={params.id} />
      </main>
    </ProtectedRoute>
  );
}
