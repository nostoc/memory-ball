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

  return (
    <div>
      <h2>Study Session Complete!</h2>

      <div>
        <h3>Summary</h3>
        {session ? (
          <ul>
            <li>Total Cards: {session.cardsStudied}</li>
            <li>Correct Answers: {session.correctAnswers}</li>
            <li>Incorrect Answers: {session.incorrectAnswers}</li>
            <li>Success Rate: {successRate}%</li>
            <li>Time Spent: {formatTime(duration)}</li>
          </ul>
        ) : (
          <p>Session data not available</p>
        )}
      </div>

      <button onClick={onBackToDeck}>Back to Deck</button>
    </div>
  );
};

export default StudySummary;
