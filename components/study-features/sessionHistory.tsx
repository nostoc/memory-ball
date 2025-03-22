"use client";
import { useState, useEffect } from "react";
//import { useRouter } from "next/navigation";
import { getAllUserSessions } from "../../services/studySessionService";
import { SessionHistoryItem } from "../../types/statisticsTypes";
import Link from "next/link";

const SessionHistory: React.FC = () => {
  const [sessions, setSessions] = useState<SessionHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //const router = useRouter();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const response = await getAllUserSessions();

        if (response?.status === "success" && response?.data?.sessions) {
          setSessions(response.data.sessions);
        } else {
          setError("Could not load session history");
        }
      } catch (err) {
        console.error("Error fetching sessions:", err);
        setError(
          "Failed to load your session history. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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

    // Convert to minutes
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
    return <div>Loading your session history...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (sessions.length === 0) {
    return (
      <div>
        <h1>Study History</h1>
        <p>You haven&apos;t completed any study sessions yet.</p>
        <Link href="/decks">Browse your decks to start studying</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Study History</h1>

      <table>
        <thead>
          <tr>
            <th>Deck</th>
            <th>Date</th>
            <th>Cards</th>
            <th>Success Rate</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session._id}>
              <td>{session.deck.title}</td>
              <td>{formatDate(session.startTime)}</td>
              <td>{session.cardsStudied}</td>
              <td>
                {getSuccessRate(session.correctAnswers, session.cardsStudied)}
              </td>
              <td>{calculateDuration(session.startTime, session.endTime)}</td>
              <td>
                <Link href={`/sessions/${session._id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionHistory;
