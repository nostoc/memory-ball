"use client";
import CardForm from "../../../../../../../components/card/cardForm";
import ProtectedRoute from "../../../../../../../components/ProtectedRoute";

export default function EditCardPage({
  params,
}: {
  params: { id: string; cardId: string };
}) {
 

  return (
    <ProtectedRoute>
      <main>
        <CardForm deckId={params.id} cardId={params.cardId} />
      </main>
    </ProtectedRoute>
  );
}
