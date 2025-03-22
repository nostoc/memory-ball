interface UserStats {
  totalSessions: number;
  totalCardsStudied: number;
  totalCorrect: number;
  totalIncorrect: number;
  averageSuccessRate: number;
  totalStudyTimeMinutes: number;
}

interface StatsOverviewProps {
  stats: UserStats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  // Format time into hours and minutes
  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);

    if (hours === 0) return `${mins} minutes`;
    return `${hours} hour${hours !== 1 ? "s" : ""} ${mins} minute${
      mins !== 1 ? "s" : ""
    }`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Study Statistics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg">
            <div className="flex items-start">
              <div className="bg-blue-500 p-3 rounded-lg mr-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Sessions
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stats.totalSessions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-lg">
            <div className="flex items-start">
              <div className="bg-indigo-500 p-3 rounded-lg mr-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Cards Studied
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stats.totalCardsStudied}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg">
            <div className="flex items-start">
              <div className="bg-green-500 p-3 rounded-lg mr-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Correct Answers
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stats.totalCorrect}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-lg">
            <div className="flex items-start">
              <div className="bg-red-500 p-3 rounded-lg mr-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Incorrect Answers
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stats.totalIncorrect}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg">
            <div className="flex items-start">
              <div className="bg-purple-500 p-3 rounded-lg mr-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Success Rate
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {stats.averageSuccessRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-lg">
            <div className="flex items-start">
              <div className="bg-yellow-500 p-3 rounded-lg mr-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Study Time
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {formatStudyTime(stats.totalStudyTimeMinutes)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium text-gray-600">Success Rate</h3>
            <span className="text-sm font-medium text-gray-800">
              {stats.averageSuccessRate.toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                stats.averageSuccessRate >= 80
                  ? "bg-green-500"
                  : stats.averageSuccessRate >= 60
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${stats.averageSuccessRate}%` }}
            ></div>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Based on {stats.totalCardsStudied} cards studied across{" "}
          {stats.totalSessions} sessions.
        </p>
      </div>
    </div>
  );
};

export default StatsOverview;
