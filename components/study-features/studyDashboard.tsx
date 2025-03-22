"use client";
import { useState, useEffect } from "react";
import { getUserStudyStats } from "../../services/studySessionService";
import StatsOverview from "./statsoverview";
import RecentSessions from "./recentSessions";

// Types for statistics
interface UserStats {
  totalSessions: number;
  totalCardsStudied: number;
  totalCorrect: number;
  totalIncorrect: number;
  averageSuccessRate: number;
  totalStudyTimeMinutes: number;
}

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

interface StatsResponseData {
  stats: UserStats;
  recentActivity: RecentActivity[];
}

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
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading your study statistics...</p>
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

  if (!statsData || !statsData.stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-6 py-4 rounded-lg mb-6 text-center">
          <p className="text-lg">No statistics available yet.</p>
          <p className="mt-2">Start studying to see your progress!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Your Study Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Track your progress and review your study habits
        </p>
      </div>

      <div className="mb-10">
        <StatsOverview stats={statsData.stats} />
      </div>

      <div>
        <RecentSessions sessions={statsData.recentActivity} />
      </div>
    </div>
  );
};

export default StudyDashboard;
