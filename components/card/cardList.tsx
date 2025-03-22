"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCardsByDeck, deleteCard } from "../../services/cardService";
import { Card } from "../../types/cardTypes";
import CardItem from "./cardItem";

interface CardListProps {
  deckId: string;
}

const CardList: React.FC<CardListProps> = ({ deckId }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

const fetchCards = async () => {
  try {
    setLoading(true);
    console.log("Fetching cards for deck:", deckId);
    const response = await getCardsByDeck(deckId);
    console.log("Full API response:", response);

    // Log the structure to help debug
    console.log("Response structure:", {
      hasStatus: !!response?.status,
      hasData: !!response?.data,
      hasNestedCards: !!response?.data?.data?.cards,
    });

    // Access the cards correctly based on the actual API structure
    if (response?.data?.data?.cards) {
      console.log(
        "Found cards array in data.data.cards:",
        response.data.data.cards
      );
      setCards(response.data.data.cards);
    } else {
      console.warn("Cards array not found in expected location:", response);
      setCards([]);
    }

    setError(null);
  } catch (err) {
    console.error("Error fetching cards:", err);
    setError("Failed to load cards. Please try again later.");
  } finally {
    setLoading(false);
    console.log("Fetch completed, loading state set to false");
  }
};

  useEffect(() => {
    fetchCards();
  }, [deckId]);

  const handleCreateCard = () => {
    router.push(`/decks/${deckId}/cards/new`);
  };

  const handleEditCard = (cardId: string) => {
    router.push(`/decks/${deckId}/cards/edit/${cardId}`);
  };

  const handleDeleteCard = async (cardId: string) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await deleteCard(cardId);
        fetchCards(); // Refresh list after deletion
      } catch (err) {
        console.error("Error deleting card:", err);
        setError("Failed to delete card. Please try again.");
      }
    }
  };

  if (loading) return <div>Loading cards...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div>
      <div>
        <h2>Cards</h2>
        <button onClick={handleCreateCard}>Add New Card</button>
      </div>

      {cards.length === 0 ? (
        <div>
          <p>
            This deck doesn&apos;t have any cards yet. Add your first card to
            start studying!
          </p>
          <button onClick={handleCreateCard}>Add Card</button>
        </div>
      ) : (
        <div>
          {cards.map((card) => (
            <CardItem
              key={card._id}
              card={card}
              onEdit={() => handleEditCard(card._id)}
              onDelete={() => handleDeleteCard(card._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
