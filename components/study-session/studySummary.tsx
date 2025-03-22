import { Session } from "../../types/studySessionTypes";

interface StudySummaryProps {
  session: Session | null;
  onBackToDeck: () => void;
}

const StudySummary: React.FC<StudySummaryProps> = ({
  session,
  onBackToDeck,
}) => {
  // Format time from milliseconds to minutes and seconds
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  // Calculate success rate
  const successRate = session
    ? session.cardsStudied > 0
      ? Math.round((session.correctAnswers / session.cardsStudied) * 100)
      : 0
    : 0;

  // Calculate duration
  const duration =
    session && session.endTime && session.startTime
      ? new Date(session.endTime).getTime() -
        new Date(session.startTime).getTime()
      : 0;

  // Get date for display
  const sessionDate =
    session && session.startTime
      ? new Date(session.startTime).toLocaleDateString()
      : "Unknown date";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-block p-4 rounded-full bg-green-100 text-green-600 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Study Session Complete!
        </h2>
        <p className="text-gray-600">{sessionDate}</p>
      </div>

      <div className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden mb-8">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Summary</h3>

          {session ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium mb-1">
                  Total Cards
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {session.cardsStudied}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium mb-1">
                  Correct
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {session.correctAnswers}
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-600 font-medium mb-1">
                  Incorrect
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {session.incorrectAnswers}
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600 font-medium mb-1">
                  Time Spent
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {formatTime(duration)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 italic">Session data not available</p>
          )}
        </div>

        {session && session.cardsStudied > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-600">
                  Success Rate
                </h4>
                <span className="text-sm font-medium text-gray-800">
                  {successRate}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    successRate >= 80
                      ? "bg-green-500"
                      : successRate >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${successRate}%` }}
                ></div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4">
              {successRate >= 80
                ? "Great job! You've mastered most of these cards."
                : successRate >= 60
                ? "Good progress! Keep practicing to improve your score."
                : "These cards need more practice. Try studying them again soon."}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onBackToDeck}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md 
                   transition duration-200 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Deck
        </button>
      </div>
    </div>
  );
};

export default StudySummary;
