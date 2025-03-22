"use client";
import { useState, useEffect } from "react";
import { getUserStudyStats } from "../../services/studySessionService";
import { StatsResponseData } from "../../types/statisticsTypes";
import StatsOverview from "./statsoverview";
import RecentSessions from "./recentSessions";

const StudyDashboard: React.FC = () => {
  const [statsData, setStatsData] = useState<StatsResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getUserStudyStats();

        if (response?.status === "success" && response?.data) {
          setStatsData(response.data);
        } else {
          setError("Could not load statistics data");
        }
      } catch (err) {
        console.error("Error fetching study statistics:", err);
        setError(
          "Failed to load your study statistics. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading your study statistics...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!statsData) {
    return (
      <div>No statistics available. Start studying to see your progress!</div>
    );
  }

  return (
    <div>
      <h1>Your Study Dashboard</h1>
      <StatsOverview stats={statsData.stats} />
      <RecentSessions sessions={statsData.recentActivity} />
    </div>
  );
};

export default StudyDashboard;
