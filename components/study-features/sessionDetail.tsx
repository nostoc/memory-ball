"use client";
import { useState, useEffect } from "react";
//import { useRouter } from "next/navigation";
import { getSessionDetails } from "../../services/studySessionService";
import Link from "next/link";

interface CardResult {
  card: {
    _id: string;
    question: string;
    answer: string;
  };
  isCorrect: boolean;
  timeSpent: number;
}

interface SessionData {
  _id: string;
  deck: {
    _id: string;
    title: string;
  };
  startTime: string;
  endTime: string;
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
  cardResults: CardResult[];
}

interface SessionDetailProps {
  sessionId: string;
}

const SessionDetail: React.FC<SessionDetailProps> = ({ sessionId }) => {
  const [session, setSession] = useState<SessionData |null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 // const router = useRouter();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        setLoading(true);
        const response = await getSessionDetails(sessionId);

        if (response?.status === "success" && response?.data?.session) {
          setSession(response.data.session);
        } else {
          setError("Could not load session details");
        }
      } catch (err) {
        console.error("Error fetching session details:", err);
        setError("Failed to load session details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  // Format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Calculate session duration in minutes
  const calculateDuration = (startTime: string, endTime: string) => {
    if (!endTime) return "In progress";

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const durationMs = end - start;

    // Convert to minutes and seconds
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);

    return `${minutes}m ${seconds}s`;
  };

  // Calculate success rate
  const getSuccessRate = (correct: number, total: number) => {
    if (total === 0) return "0%";
    return `${Math.round((correct / total) * 100)}%`;
  };

  if (loading) {
    return <div>Loading session details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!session) {
    return <div>Session not found</div>;
  }

  return (
    <div>
      <div>
        <Link href="/sessions">Back to Sessions</Link>
      </div>

      <h1>Session Details</h1>

      <div>
        <div>
          <h2>Overview</h2>
          <p>Deck: {session.deck.title}</p>
          <p>Date: {formatDate(session.startTime)}</p>
          <p>
            Duration: {calculateDuration(session.startTime, session.endTime)}
          </p>
          <p>Cards Studied: {session.cardsStudied}</p>
          <p>
            Success Rate:{" "}
            {getSuccessRate(session.correctAnswers, session.cardsStudied)}
          </p>
        </div>

        <div>
          <h2>Card Results</h2>
          {session.cardResults && session.cardResults.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Card</th>
                  <th>Result</th>
                  <th>Time Spent</th>
                </tr>
              </thead>
              <tbody>
                {session.cardResults.map((result: CardResult, index: number) => (
                  <tr key={index}>
                    <td>
                      <div>
                        <p>
                          <strong>Q:</strong> {result.card.question}
                        </p>
                        <p>
                          <strong>A:</strong> {result.card.answer}
                        </p>
                      </div>
                    </td>
                    <td>
                      {result.isCorrect ? (
                        <span>Correct</span>
                      ) : (
                        <span>Incorrect</span>
                      )}
                    </td>
                    <td>{Math.round(result.timeSpent / 1000)}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No card results available</p>
          )}
        </div>
      </div>

      <div>
        <Link href={`/decks/${session.deck._id}/study`}>
          Study This Deck Again
        </Link>
      </div>
    </div>
  );
};

export default SessionDetail;
