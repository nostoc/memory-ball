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

  if (loading && deckId) return <div>Loading deck data...</div>;

  return (
    <div>
      <h1>{deckId ? "Edit Deck" : "Create New Deck"}</h1>

      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="isPublic">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
            />
            Make deck public
          </label>
        </div>

        <div>
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags?.join(", ")}
            onChange={handleTagsChange}
            placeholder="e.g. history, science, math"
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : deckId ? "Update Deck" : "Create Deck"}
          </button>
          <button type="button" onClick={() => router.push("/decks")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeckForm;
