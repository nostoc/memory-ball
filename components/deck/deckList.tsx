"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllDecks, deleteDeck } from "../../services/deckService";
import { Deck } from "../../types/deckTypes"

const DeckList = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchDecks = async () => {
    try {
      setLoading(true);
      const response = await getAllDecks();
      setDecks(response.data.decks);
      setError(null);
    } catch (err) {
      console.error("Error fetching decks:", err);
      setError("Failed to load decks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleCreateDeck = () => {
    router.push("/decks/new");
  };

  const handleEditDeck = (id: string) => {
    router.push(`/decks/edit/${id}`);
  };

  const handleViewDeck = (id: string) => {
    router.push(`/decks/${id}`);
  };

  const handleDeleteDeck = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this deck? This will also delete all cards in this deck."
      )
    ) {
      try {
        await deleteDeck(id);
        fetchDecks(); // Refresh list after deletion
      } catch (err) {
        console.error("Error deleting deck:", err);
        setError("Failed to delete deck. Please try again.");
      }
    }
  };

  if (loading) return <div>Loading decks...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <div>
        <h1>My Decks</h1>
        <button onClick={handleCreateDeck}>Create New Deck</button>
      </div>

      {decks.length === 0 ? (
        <div>
          <p>
            You don&apos;t have any decks yet. Create your first deck to get started!
          </p>
        </div>
      ) : (
        <div>
          {decks.map((deck) => (
            <div key={deck._id}>
              <h3>{deck.title}</h3>
              <p>{deck.description || "No description"}</p>
              <div>
                <button onClick={() => handleViewDeck(deck._id)}>View</button>
                <button onClick={() => handleEditDeck(deck._id)}>Edit</button>
                <button onClick={() => handleDeleteDeck(deck._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckList;
