import { UserStats } from "../../types/statisticsTypes";

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
    <div>
      <h2>Study Statistics</h2>

      <div>
        <div>
          <h3>Sessions Completed</h3>
          <p>{stats.totalSessions}</p>
        </div>

        <div>
          <h3>Cards Studied</h3>
          <p>{stats.totalCardsStudied}</p>
        </div>

        <div>
          <h3>Correct Answers</h3>
          <p>{stats.totalCorrect}</p>
        </div>

        <div>
          <h3>Success Rate</h3>
          <p>{stats.averageSuccessRate.toFixed(1)}%</p>
        </div>

        <div>
          <h3>Total Study Time</h3>
          <p>{formatStudyTime(stats.totalStudyTimeMinutes)}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
