"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDueCards } from "../../services/studySessionService";
import { Card } from "../../types/cardTypes";


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
        setError(
          "Failed to load cards due for review. Please try again later."
        );
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

  const handleStartStudy = () => {
    if (dueCards.length > 0) {
      router.push(`/decks/${deckId}/study?mode=due`);
    }
  };

  if (loading) {
    return <div>Loading cards due for review...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Cards Due for Review</h2>

      {dueCards.length === 0 ? (
        <p>No cards are currently due for review!</p>
      ) : (
        <>
          <p>{dueCards.length} cards due for review</p>

          <button onClick={handleStartStudy}>Review Due Cards</button>

          <ul>
            {dueCards.slice(0, 5).map((card) => (
              <li key={card._id}>
                <p>Question: {card.question}</p>
                <div>
                  <span>Difficulty: {card.difficulty.toFixed(1)}</span>
                  <span>Due: {formatNextReview(card.nextReview)}</span>
                </div>
              </li>
            ))}

            {dueCards.length > 5 && (
              <li>
                <p>+ {dueCards.length - 5} more cards due for review</p>
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default DueCardsList;
