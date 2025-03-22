"use client";
import CardList from "../../../../../components/card/cardList";
import ProtectedRoute from "../../../../../components/ProtectedRoute";

export default function CardsPage({ params }: { params: { id: string } }) {
  // Just use params directly
  return (
    <ProtectedRoute>
      <main>
        <CardList deckId={params.id} />
      </main>
    </ProtectedRoute>
  );
}
