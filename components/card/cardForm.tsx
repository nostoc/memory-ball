"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createCard,
  getCardById,
  updateCard,
} from "../../services/cardService";
import { CardFormData } from "../../types/cardTypes";

interface CardFormProps {
  deckId: string;
  cardId?: string; // Optional - if provided, we're editing an existing card
}

const CardForm: React.FC<CardFormProps> = ({ deckId, cardId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CardFormData>({
    question: "",
    answer: "",
    deck: deckId,
  });

  // If cardId is provided, fetch the card data
  useEffect(() => {
    const fetchCard = async () => {
      if (!cardId) return;

      try {
        setLoading(true);
        const response = await getCardById(cardId);
        const card = response.data.card;

        setFormData({
          question: card.question,
          answer: card.answer,
          deck: deckId,
        });
      } catch (err) {
        console.error("Error fetching card:", err);
        setError("Failed to load card data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [cardId, deckId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (cardId) {
        // Update existing card
        await updateCard(cardId, {
          question: formData.question,
          answer: formData.answer,
        });
      } else {
        // Create new card
        await createCard(formData);
      }

      router.push(`/decks/${deckId}/cards`);
    } catch (err) {
      console.error("Error saving card:", err);
      setError("Failed to save card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && cardId) return <div>Loading card data...</div>;

  return (
    <div>
      <h1>{cardId ? "Edit Card" : "Create New Card"}</h1>

      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question</label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="answer">Answer</label>
          <textarea
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : cardId ? "Update Card" : "Create Card"}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/decks/${deckId}/cards`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
