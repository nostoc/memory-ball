"use client";
import DeckList from "../../../components/deck/deckList";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function DecksPage() {
  return (
    <ProtectedRoute>
      <main>
        <DeckList />
      </main>
    </ProtectedRoute>
  );
}
