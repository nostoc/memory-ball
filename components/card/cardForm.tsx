"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createCard,
  getCardById,
  updateCard,
} from "../../services/cardService";
import { CardFormData } from "../../types/cardTypes";
import Link from "next/link";

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

  // For card preview
  const [previewMode, setPreviewMode] = useState<"question" | "answer">(
    "question"
  );

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

  const togglePreviewMode = () => {
    setPreviewMode(previewMode === "question" ? "answer" : "question");
  };

  if (loading && cardId)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          href={`/decks/${deckId}/cards`}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Cards
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {cardId ? "Edit Card" : "Create New Card"}
        </h1>
        <p className="text-gray-600 mt-2">
          {cardId
            ? "Update your flashcard content"
            : "Create a new flashcard for your deck"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <div className="mb-5">
              <label
                htmlFor="question"
                className="block text-gray-700 font-medium mb-2"
              >
                Question
              </label>
              <textarea
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter the question"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="answer"
                className="block text-gray-700 font-medium mb-2"
              >
                Answer
              </label>
              <textarea
                id="answer"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter the answer"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push(`/decks/${deckId}/cards`)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors 
                       flex items-center justify-center ${
                         loading ? "opacity-70 cursor-not-allowed" : ""
                       }`}
              >
                {loading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                    Saving...
                  </>
                ) : cardId ? (
                  "Update Card"
                ) : (
                  "Create Card"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Card Preview */}
        <div className="hidden md:block">
          <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 h-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Card Preview
            </h2>

            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-md overflow-hidden">
                <button
                  onClick={() => setPreviewMode("question")}
                  className={`px-4 py-2 text-sm font-medium ${
                    previewMode === "question"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Question
                </button>
                <button
                  onClick={() => setPreviewMode("answer")}
                  className={`px-4 py-2 text-sm font-medium ${
                    previewMode === "answer"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Answer
                </button>
              </div>
            </div>

            <div className="relative bg-gray-50 rounded-lg p-4 min-h-[250px] flex flex-col">
              <div className="mb-2">
                <h3
                  className={`text-sm font-medium ${
                    previewMode === "question"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {previewMode === "question" ? "Question" : "Answer"}
                </h3>
              </div>
              <div className="flex-grow">
                <p className="text-gray-800">
                  {previewMode === "question"
                    ? formData.question || "Your question will appear here"
                    : formData.answer || "Your answer will appear here"}
                </p>
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={togglePreviewMode}
                  className="text-xs text-blue-500 italic inline-flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Flip card
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              This is a preview of how your card will appear when studying
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
