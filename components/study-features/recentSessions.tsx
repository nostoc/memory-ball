import Link from "next/link";

interface RecentActivity {
  _id: string;
  startTime: string;
  endTime: string;
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
  deck: {
    _id: string;
    title: string;
  };
}

interface RecentSessionsProps {
  sessions: RecentActivity[];
}

const RecentSessions: React.FC<RecentSessionsProps> = ({ sessions }) => {
  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate success rate
  const getSuccessRate = (correct: number, total: number) => {
    if (total === 0) return "0%";
    return `${Math.round((correct / total) * 100)}%`;
  };

  // Get time since session
  const getTimeSince = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return `${diffSec} seconds ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHr / 24);
    if (diffDays < 30) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    return formatDate(dateStr);
  };

  if (sessions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-6 text-center">
        <div className="mb-4">
          <svg
            className="h-12 w-12 text-gray-400 mx-auto"
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
          No Recent Activity
        </h2>
        <p className="text-gray-600 mb-6">
          Start studying to see your recent sessions here!
        </p>
        <Link
          href="/decks"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Browse Your Decks
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Study Sessions
          </h2>
          <Link
            href="/sessions"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            View All
            <svg
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <Link
              key={session._id}
              href={`/sessions/${session._id}`}
              className="block p-4 rounded-lg border border-gray-200 hover:border-blue-200 
                       hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">
                    {session.deck.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {getTimeSince(session.startTime)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {session.cardsStudied} cards
                  </span>

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
                    )}{" "}
                    success
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center">
        <Link
          href="/sessions"
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center"
        >
          View All Sessions
          <svg
            className="h-4 w-4 ml-1"
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
};

export default RecentSessions;
