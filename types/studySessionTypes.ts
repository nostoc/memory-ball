import { Card } from './cardTypes';

export interface Session {
  _id: string;
  user: string;
  deck: string;
  startTime: string;
  endTime?: string;
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
  cardResults: CardResult[];
}

export interface CardResult {
  card: string;
  isCorrect: boolean;
  timeSpent: number; // Time spent on card in ms
}

export interface StudySessionState {
  sessionId: string;
  cards: Card[];
  currentCardIndex: number;
  isFinished: boolean;
  startTime: number;
  endTime?: number;
}

export interface StudySessionSummary {
  totalCards: number;
  correctAnswers: number;
  incorrectAnswers: number; 
  successRate: number;
  duration: number; // in minutes
}