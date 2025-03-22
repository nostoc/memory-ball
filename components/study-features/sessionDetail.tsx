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
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //const router = useRouter();

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
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading session details...</p>
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
        <Link
          href="/sessions"
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
        >
          <svg
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Sessions
        </Link>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-4 rounded-lg mb-6">
          <p>Session not found</p>
        </div>
        <Link
          href="/sessions"
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
        >
          <svg
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Sessions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/sessions"
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
        >
          <svg
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Sessions
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Session Details</h1>
        <p className="text-gray-600 mt-2">
          Review your performance from this study session
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Session Overview
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Deck</p>
                <p className="font-medium text-gray-800">
                  {session.deck.title}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-800">
                  {formatDate(session.startTime)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium text-gray-800">
                  {calculateDuration(session.startTime, session.endTime)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Statistics
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Cards Studied</p>
                <p className="font-medium text-gray-800">
                  {session.cardsStudied}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Correct Answers</p>
                <p className="font-medium text-green-600">
                  {session.correctAnswers}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Incorrect Answers</p>
                <p className="font-medium text-red-600">
                  {session.incorrectAnswers}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Success Rate
            </h2>
            <div className="text-center mb-4">
              <div className="inline-block relative">
                <svg className="w-24 h-24" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={
                      session.correctAnswers / session.cardsStudied >= 0.7
                        ? "#10B981"
                        : session.correctAnswers / session.cardsStudied >= 0.4
                        ? "#F59E0B"
                        : "#EF4444"
                    }
                    strokeWidth="3"
                    strokeDasharray={`${
                      session.cardsStudied > 0
                        ? (session.correctAnswers / session.cardsStudied) * 100
                        : 0
                    }, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">
                    {getSuccessRate(
                      session.correctAnswers,
                      session.cardsStudied
                    )}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href={`/decks/${session.deck._id}/study`}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Study Again
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Card Results
          </h2>

          {session.cardResults && session.cardResults.length > 0 ? (
            <div className="space-y-4">
              {session.cardResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    result.isCorrect
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex-grow">
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Question:</p>
                        <p className="text-gray-800">{result.card.question}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Answer:</p>
                        <p className="text-gray-800">{result.card.answer}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end space-y-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            result.isCorrect
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                      >
                        {result.isCorrect ? "Correct" : "Incorrect"}
                      </span>
                      <span className="text-xs text-gray-500">
                        Time spent: {Math.round(result.timeSpent / 1000)}s
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No card results available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
