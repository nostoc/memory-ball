"use client";
import DeckForm from "../../../../components/deck/deckForm";
import ProtectedRoute from "../../../../components/ProtectedRoute";

export default function NewDeckPage() {
  return (
    <ProtectedRoute>
      <main>
        <DeckForm />
      </main>
    </ProtectedRoute>
  );
}
