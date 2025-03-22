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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
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
          onClick={() => router.push("/decks")}
          className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          ← Back to Decks
        </button>
      </div>
    );

  if (!deck)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
          Deck not found
        </div>
        <button
          onClick={() => router.push("/decks")}
          className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          ← Back to Decks
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => router.push("/decks")}
        className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center"
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
        Back to Decks
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{deck.title}</h1>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                deck.isPublic
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {deck.isPublic ? "Public" : "Private"}
            </span>
          </div>

          <p className="text-gray-600 mb-6">
            {deck.description || "No description provided"}
          </p>

          {deck.tags && deck.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {deck.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md">
            <div className="flex flex-col items-center p-3 bg-white rounded-md shadow-sm border border-gray-100">
              <span className="text-lg font-semibold text-blue-600">
                {stats?.cardCount || 0}
              </span>
              <span className="text-gray-500 text-sm">Cards</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-md shadow-sm border border-gray-100">
              <span className="text-gray-600 text-sm">Created</span>
              <span className="text-gray-900">
                {new Date(deck.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-md shadow-sm border border-gray-100">
              <span className="text-gray-600 text-sm">Last Updated</span>
              <span className="text-gray-900">
                {new Date(deck.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleStudyDeck}
            disabled={stats?.cardCount === 0}
            className="button-primary"
          >
            Study Deck
          </button>
          <button
            onClick={handleManageCards}
            className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            Manage Cards
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleEdit}
          className="text-gray-600 hover:text-gray-800 font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Deck
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Delete Deck
        </button>
      </div>
    </div>
  );
};

export default DeckDetail;
