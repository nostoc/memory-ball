"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../types/cardTypes";
import { Session } from "../../types/studySessionTypes";
import {
  startStudySession,
  getCardsForStudy,
  recordCardResult,
  endStudySession,
} from "../../services/studySessionService";
import StudyCard from "./studyCard";
import StudySummary from "./studySummary";

interface StudySessionProps {
  deckId: string;
}

const StudySession: React.FC<StudySessionProps> = ({ deckId }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [cardStartTime, setCardStartTime] = useState(Date.now());
  const [sessionSummary, setSessionSummary] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeStudySession = async () => {
      try {
        setLoading(true);

        // 1. Fetch the cards for study
        const cardsResponse = await getCardsForStudy(deckId);

        if (cardsResponse?.data?.cards && cardsResponse.data.cards.length > 0) {
          setCards(cardsResponse.data.cards);
        } else {
          setError("No cards available for study in this deck.");
          setLoading(false);
          return;
        }

        // 2. Start a new study session
        const sessionResponse = await startStudySession(deckId);

        if (sessionResponse?.data?.session?._id) {
          setSessionId(sessionResponse.data.session._id);
        } else {
          setError("Failed to start study session.");
        }
      } catch (err) {
        console.error("Error initializing study session:", err);
        setError("Failed to initialize study session. Please try again.");
      } finally {
        setLoading(false);
        setStartTime(Date.now());
        setCardStartTime(Date.now());
      }
    };

    initializeStudySession();
  }, [deckId]);

  const handleCardResult = async (isCorrect: boolean) => {
    if (!sessionId || currentCardIndex >= cards.length) return;

    const card = cards[currentCardIndex];
    const timeSpent = Date.now() - cardStartTime;

    try {
      // Record the result
      await recordCardResult(sessionId, card._id, isCorrect, timeSpent);

      // Move to the next card or finish the session
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setCardStartTime(Date.now());
      } else {
        await finishSession();
      }
    } catch (err) {
      console.error("Error recording card result:", err);

      // Move on anyway
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setCardStartTime(Date.now());
      } else {
        await finishSession();
      }
    }
  };

  const finishSession = async () => {
    if (!sessionId) return;

    try {
      const response = await endStudySession(sessionId);

      if (response?.data?.session) {
        setSessionSummary(response.data.session);
      }
    } catch (err) {
      console.error("Error ending study session:", err);
    }

    setIsFinished(true);
  };

  const handleBackToDeck = () => {
    router.push(`/decks/${deckId}`);
  };

  if (loading) {
    return <div>Loading study session...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={handleBackToDeck}>Back to Deck</button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <StudySummary session={sessionSummary} onBackToDeck={handleBackToDeck} />
    );
  }

  if (cards.length === 0) {
    return (
      <div>
        <p>No cards available for study.</p>
        <button onClick={handleBackToDeck}>Back to Deck</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={handleBackToDeck}>Exit Study Session</button>
        <span>
          Card {currentCardIndex + 1} of {cards.length}
        </span>
      </div>

      <StudyCard card={cards[currentCardIndex]} />

      <div>
        <button onClick={() => handleCardResult(false)}>Incorrect</button>
        <button onClick={() => handleCardResult(true)}>Correct</button>
      </div>
    </div>
  );
};

export default StudySession;
