"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { StudyOptions } from "../../types/statisticsTypes";

interface StudyOptionsFormProps {
  deckId: string;
  totalCards: number;
  dueCards: number;
}

const StudyOptionsForm: React.FC<StudyOptionsFormProps> = ({
  deckId,
  totalCards,
  dueCards,
}) => {
  const router = useRouter();
  const [options, setOptions] = useState<StudyOptions>({
    mode: "all",
    shuffle: true,
    limit: 20,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setOptions({
        ...options,
        [name]: checkbox.checked,
      });
    } else if (name === "limit") {
      setOptions({
        ...options,
        limit: value === "" ? null : parseInt(value),
      });
    } else {
      setOptions({
        ...options,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Encode options as query params
    const params = new URLSearchParams();
    params.append("mode", options.mode);
    params.append("shuffle", options.shuffle.toString());
    if (options.limit !== null) {
      params.append("limit", options.limit.toString());
    }

    router.push(`/decks/${deckId}/study?${params.toString()}`);
  };

  return (
    <div>
      <h2>Study Options</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mode">Study Mode</label>
          <select
            id="mode"
            name="mode"
            value={options.mode}
            onChange={handleChange}
          >
            <option value="all">All Cards ({totalCards})</option>
            <option value="due" disabled={dueCards === 0}>
              Due Cards ({dueCards})
            </option>
            <option value="difficult">Difficult Cards Only</option>
          </select>
        </div>

        <div>
          <label htmlFor="shuffle">Shuffle Cards</label>
          <input
            type="checkbox"
            id="shuffle"
            name="shuffle"
            checked={options.shuffle}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="limit">Limit Cards (leave empty for all)</label>
          <input
            type="number"
            id="limit"
            name="limit"
            min="1"
            max={totalCards}
            value={options.limit === null ? "" : options.limit}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Start Studying</button>
      </form>
    </div>
  );
};

export default StudyOptionsForm;
