"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDeckById,
  getDeckStats,
  deleteDeck,
} from "../../services/deckService";
import { Deck } from "../../types/deckTypes";

interface DeckDetailProps {
  deckId: string;
}

const DeckDetail: React.FC<DeckDetailProps> = ({ deckId }) => {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [stats, setStats] = useState<{
    cardCount: number;
    deckName: string;
    createdAt: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDeckData = async () => {
      try {
        setLoading(true);
        const [deckResponse, statsResponse] = await Promise.all([
          getDeckById(deckId),
          getDeckStats(deckId),
        ]);

        setDeck(deckResponse.data.deck);
        setStats(statsResponse.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching deck data:", err);
        setError("Failed to load deck. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeckData();
  }, [deckId]);

  const handleEdit = () => {
    router.push(`/decks/edit/${deckId}`);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this deck? This will also delete all cards in this deck."
      )
    ) {
      try {
        await deleteDeck(deckId);
        router.push("/decks");
      } catch (err) {
        console.error("Error deleting deck:", err);
        setError("Failed to delete deck. Please try again.");
      }
    }
  };

  const handleManageCards = () => {
    router.push(`/decks/${deckId}/cards`);
  };

  const handleStudyDeck = () => {
    router.push(`/decks/${deckId}/study`);
  };

  if (loading) return <div>Loading deck...</div>;

  if (error) return <div>{error}</div>;

  if (!deck) return <div>Deck not found</div>;

  return (
    <div>
      <h1>{deck.title}</h1>

      <div>
        <p>{deck.description || "No description provided"}</p>

        <div>
          <h3>Deck Information</h3>
          <p>Created: {new Date(deck.createdAt).toLocaleDateString()}</p>
          <p>Last updated: {new Date(deck.updatedAt).toLocaleDateString()}</p>
          <p>Visibility: {deck.isPublic ? "Public" : "Private"}</p>
          {stats && <p>Cards: {stats.cardCount}</p>}
          {deck.tags && deck.tags.length > 0 && (
            <p>Tags: {deck.tags.join(", ")}</p>
          )}
        </div>
      </div>

      <div>
        <button onClick={handleStudyDeck}>Study Deck</button>
        <button onClick={handleManageCards}>Manage Cards</button>
        <button onClick={handleEdit}>Edit Deck</button>
        <button onClick={handleDelete}>Delete Deck</button>
        <button onClick={() => router.push("/decks")}>Back to Decks</button>
      </div>
    </div>
  );
};

export default DeckDetail;
