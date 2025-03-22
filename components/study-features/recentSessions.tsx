import { RecentActivity } from "../../types/statisticsTypes";
import Link from "next/link";

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

  if (sessions.length === 0) {
    return (
      <p>No recent study sessions. Start studying to see your activity!</p>
    );
  }

  return (
    <div>
      <h2>Recent Study Sessions</h2>

      <ul>
        {sessions.map((session) => (
          <li key={session._id}>
            <div>
              <h3>
                <Link href={`/sessions/${session._id}`}>
                  {session.deck.title}
                </Link>
              </h3>
              <p>Date: {formatDate(session.startTime)}</p>
              <p>Cards: {session.cardsStudied}</p>
              <p>
                Success Rate:{" "}
                {getSuccessRate(session.correctAnswers, session.cardsStudied)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <Link href="/sessions">View All Sessions</Link>
    </div>
  );
};

export default RecentSessions;
