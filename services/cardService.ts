import api from '../utils/api';

// Get all cards for a deck
export const getCardsByDeck = async (deckId: string) => {
  console.log('Making API request for deck:', deckId);
  try {
    const response = await api.get(`/v1/decks/${deckId}/cards`);
    console.log('API request successful, status:', response.status);
    // Return the response directly - don't transform it
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Get a single card
export const getCardById = async (cardId: string) => {
  const response = await api.get(`/v1/cards/${cardId}`);
  return response.data;
};

// Create a new card
export const createCard = async (cardData: {
  question: string;
  answer: string;
  deck: string;
}) => {
  const response = await api.post('/v1/cards', cardData);
  return response.data;
};

// Update a card
export const updateCard = async (
  cardId: string,
  cardData: {
    question?: string;
    answer?: string;
  }
) => {
  const response = await api.patch(`/v1/cards/${cardId}`, cardData);
  return response.data;
};

// Delete a card
export const deleteCard = async (cardId: string) => {
  const response = await api.delete(`/v1/cards/${cardId}`);
  return response.data;
};