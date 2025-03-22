"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDueCards } from "../../services/studySessionService";


interface Card {
  _id: string;
  question: string;
  answer: string;
  difficulty: number;
  nextReview: string;
}

interface DueCardsListProps {
  deckId: string;
}

const DueCardsList: React.FC<DueCardsListProps> = ({ deckId }) => {
  const [dueCards, setDueCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDueCards = async () => {
      try {
        setLoading(true);
        const response = await getDueCards(deckId);

        if (response?.status === "success" && response?.data?.cards) {
          setDueCards(response.data.cards);
        } else {
          setError("Could not load due cards");
        }
      } catch (err) {
        console.error("Error fetching due cards:", err);
        // For now, just set it to empty array if the endpoint doesn't exist yet
        setDueCards([]);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchDueCards();
  }, [deckId]);

  // Format date for next review
  const formatNextReview = (dateStr: string) => {
    if (!dateStr) return "Not set";

    const nextReview = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if due today
    if (nextReview.toDateString() === today.toDateString()) {
      return "Today";
    }

    // Check if due tomorrow
    if (nextReview.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }

    // Otherwise return date
    return nextReview.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return "bg-red-100 text-red-800";
    if (difficulty <= 3.5) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const handleStartStudy = () => {
    if (dueCards.length > 0) {
      router.push(`/decks/${deckId}/study?mode=due`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-sm text-gray-500">
            Loading cards due for review...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Cards Due for Review
          </h2>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium
            ${
              dueCards.length > 0
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {dueCards.length} cards
          </span>
        </div>
      </div>

      <div className="p-6">
        {dueCards.length === 0 ? (
          <div className="text-center py-6">
            <svg
              className="h-12 w-12 text-gray-400 mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 mb-4">
              No cards are currently due for review!
            </p>
            <p className="text-sm text-gray-500">
              Cards will appear here when they&apos;re scheduled for review based on
              your study performance.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <button
                onClick={handleStartStudy}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md 
                         transition duration-200 flex items-center justify-center"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Review Due Cards
              </button>
            </div>

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {dueCards.slice(0, 5).map((card) => (
                <div
                  key={card._id}
                  className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <p className="text-gray-800 mb-2 line-clamp-2">
                    {card.question}
                  </p>
                  <div className="flex justify-between">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                      ${getDifficultyColor(card.difficulty)}`}
                    >
                      Difficulty: {card.difficulty.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      Due: {formatNextReview(card.nextReview)}
                    </span>
                  </div>
                </div>
              ))}

              {dueCards.length > 5 && (
                <div className="border-t border-gray-100 pt-3 text-center">
                  <p className="text-sm text-gray-600">
                    + {dueCards.length - 5} more cards due for review
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-xs text-gray-600">
              Spaced repetition determines when you should review cards based on
              how well you remember them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueCardsList;
