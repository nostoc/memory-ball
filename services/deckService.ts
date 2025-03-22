import api from '../utils/api';

// Get all decks for the current user
export const getAllDecks = async () => {
  const response = await api.get('/v1/decks');
  return response.data;
};

// Get a single deck by ID
export const getDeckById = async (id: string) => {
  const response = await api.get(`/v1/decks/${id}`);
  return response.data;
};

// Create a new deck
export const createDeck = async (deckData: {
  title: string;
  description: string;
  isPublic: boolean;
  tags?: string[];
}) => {
  const response = await api.post('/v1/decks', deckData);
  return response.data;
};

// Update an existing deck
export const updateDeck = async (
  id: string,
  deckData: {
    title?: string;
    description?: string;
    isPublic?: boolean;
    tags?: string[];
  }
) => {
  const response = await api.patch(`/v1/decks/${id}`, deckData);
  return response.data;
};

// Delete a deck
export const deleteDeck = async (id: string) => {
  const response = await api.delete(`/v1/decks/${id}`);
  return response.data;
};

// Get deck statistics
export const getDeckStats = async (id: string) => {
  const response = await api.get(`/v1/decks/${id}/stats`);
  return response.data;
};