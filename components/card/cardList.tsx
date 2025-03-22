"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCardsByDeck, deleteCard } from "../../services/cardService";
import { Card } from "../../types/cardTypes";
import CardItem from "./cardItem";
import Link from "next/link";

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

      // Access the cards correctly based on the actual API structure
      if (response?.data?.cards) {
        console.log("Found cards array:", response.data.cards);
        setCards(response.data.cards);
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
          {error}
        </div>
        <button
          onClick={() => router.push(`/decks/${deckId}`)}
          className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          ← Back to Deck
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          href={`/decks/${deckId}`}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Deck
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cards</h2>
          <p className="text-gray-600 mb-4">
            Manage the flashcards in this deck
          </p>
          <button
            onClick={handleCreateCard}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md 
                     transition duration-200 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Card
          </button>
        </div>
      </div>

      {cards.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg text-gray-600 mb-4">
            This deck doesn&apos;t have any cards yet. Add your first card to
            start studying!
          </p>
          <button
            onClick={handleCreateCard}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md 
                     transition duration-200"
          >
            Add Your First Card
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p className="text-gray-600">
              {cards.length} card{cards.length !== 1 ? "s" : ""} in this deck
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card) => (
              <CardItem
                key={card._id}
                card={card}
                onEdit={() => handleEditCard(card._id)}
                onDelete={() => handleDeleteCard(card._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardList;
