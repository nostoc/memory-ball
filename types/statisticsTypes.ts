
export interface UserStats {
  totalSessions: number;
  totalCardsStudied: number;
  totalCorrect: number;
  totalIncorrect: number;
  averageSuccessRate: number;
  totalStudyTimeMinutes: number;
}

export interface RecentActivity {
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

export interface SessionHistoryItem {
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

export interface StudyOptions {
  mode: 'all' | 'due' | 'difficult';
  shuffle: boolean;
  limit: number | null;
}

export interface StatsResponseData {
  stats: UserStats;
  recentActivity: RecentActivity[];
}