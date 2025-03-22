"use client";
import { useState, useEffect } from "react";
//import { useRouter } from "next/navigation";
import { getAllUserSessions } from "../../services/studySessionService";
import Link from "next/link";

interface SessionHistoryItem {
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
}

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
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading your session history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Study History</h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-8 text-center">
          <div className="mb-4">
            <svg
              className="h-16 w-16 text-gray-400 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No Study Sessions Yet
          </h2>
          <p className="text-gray-600 mb-6">
            You haven&apos;t completed any study sessions yet.
          </p>
          <Link
            href="/decks"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md 
                   transition duration-200 inline-flex items-center"
          >
            Browse Your Decks
            <svg
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Study History</h1>
        <p className="text-gray-600 mt-2">
          Review all your past study sessions
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Deck
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cards
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Success Rate
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Duration
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {session.deck.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(session.startTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {session.cardsStudied}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        parseInt(
                          getSuccessRate(
                            session.correctAnswers,
                            session.cardsStudied
                          )
                        ) >= 70
                          ? "bg-green-100 text-green-800"
                          : parseInt(
                              getSuccessRate(
                                session.correctAnswers,
                                session.cardsStudied
                              )
                            ) >= 40
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {getSuccessRate(
                        session.correctAnswers,
                        session.cardsStudied
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {calculateDuration(session.startTime, session.endTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/sessions/${session._id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SessionHistory;
