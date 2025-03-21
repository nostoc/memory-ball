"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createDeck,
  getDeckById,
  updateDeck,
} from "../../services/deckService";
import { DeckFormData } from "../../types/deckTypes";

interface DeckFormProps {
  deckId?: string; // Optional - if provided, we're editing an existing deck
}

const DeckForm: React.FC<DeckFormProps> = ({ deckId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<DeckFormData>({
    title: "",
    description: "",
    isPublic: false,
    tags: [],
  });

  // If deckId is provided, fetch the deck data
  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;

      try {
        setLoading(true);
        const response = await getDeckById(deckId);
        const deck = response.data.deck;

        setFormData({
          title: deck.title,
          description: deck.description || "",
          isPublic: deck.isPublic,
          tags: deck.tags || [],
        });
      } catch (err) {
        console.error("Error fetching deck:", err);
        setError("Failed to load deck data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    setFormData({
      ...formData,
      tags: tagsArray,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (deckId) {
        // Update existing deck
        await updateDeck(deckId, formData);
      } else {
        // Create new deck
        await createDeck(formData);
      }

      router.push("/decks");
    } catch (err) {
      console.error("Error saving deck:", err);
      setError("Failed to save deck. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && deckId)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {deckId ? "Edit Deck" : "Create New Deck"}
        </h1>
        <p className="text-gray-600 mt-2">
          {deckId
            ? "Update your deck information"
            : "Create a new deck to organize your flashcards"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
      >
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter deck title"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe your deck (optional)"
          />
        </div>

        <div className="mb-5">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700">Make deck public</span>
          </label>
          <p className="text-sm text-gray-500 mt-1 ml-7">
            Public decks can be viewed by other users
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-gray-700 font-medium mb-2"
          >
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags?.join(", ")}
            onChange={handleTagsChange}
            placeholder="e.g. history, science, math"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Tags help organize and find your decks
          </p>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.push("/decks")}
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
            ) : deckId ? (
              "Update Deck"
            ) : (
              "Create Deck"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeckForm;
