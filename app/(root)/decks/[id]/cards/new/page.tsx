"use client";
import CardForm from "../../../../../../components/card/cardForm";
import ProtectedRoute from "../../../../../../components/ProtectedRoute";

export default function NewCardPage({ params }: { params: { id: string } }) {
  const unwrappedParams = params;

  return (
    <ProtectedRoute>
      <main>
        <CardForm deckId={unwrappedParams.id} />
      </main>
    </ProtectedRoute>
  );
}
