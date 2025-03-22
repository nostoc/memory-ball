import api from '../utils/api';

// Start a new study session for a deck
export const startStudySession = async (deckId: string) => {
  const response = await api.post(`/v1/sessions`, {
    deckId
  });
  return response.data;
};

// Record card result during a session
export const recordCardResult = async (
  sessionId: string,
  cardId: string,
  isCorrect: boolean,
  timeSpent: number
) => {
  const response = await api.post(`/v1/sessions/${sessionId}/cards`, {
    cardId,
    isCorrect,
    timeSpent
  });
  return response.data;
};

// End a study session
export const endStudySession = async (sessionId: string) => {
  const response = await api.patch(`/v1/sessions/${sessionId}/end`);
  return response.data;
};

// Get cards for study - use the regular cards endpoint
export const getCardsForStudy = async (deckId: string) => {
  const response = await api.get(`/v1/decks/${deckId}/cards`);
  return response.data;
};

// Get user study statistics
export const getUserStudyStats = async () => {
  const response = await api.get(`/v1/sessions/user/stats`);
  return response.data;
};

// Get all sessions for a specific deck
export const getDeckSessions = async (deckId: string) => {
  const response = await api.get(`/v1/sessions?deckId=${deckId}`);
  return response.data;
};

// Get a specific session details
export const getSessionDetails = async (sessionId: string) => {
  const response = await api.get(`/v1/sessions/${sessionId}`);
  return response.data;
};


// Get all sessions for a specific user
export const getAllUserSessions = async () => {
  const response = await api.get(`/v1/sessions/user/all`);
  return response.data;
};


// Get due cards for a deck (cards that are due for review)
export const getDueCards = async (deckId: string) => {
  const response = await api.get(`/v1/decks/${deckId}/cards/due`);
  return response.data;
};