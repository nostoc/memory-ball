"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface StudyOptionsFormProps {
  deckId: string;
  totalCards: number;
  dueCards: number;
}

interface StudyOptions {
  mode: "all" | "due" | "difficult";
  shuffle: boolean;
  limit: number | null;
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/decks/${deckId}`}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
        >
          <svg
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Deck
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Study Options</h1>
        <p className="text-gray-600 mt-2">Customize your study session</p>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="mode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Study Mode
              </label>
              <select
                id="mode"
                name="mode"
                value={options.mode}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm 
                         border-gray-300 rounded-md py-2 px-3"
              >
                <option value="all">All Cards ({totalCards})</option>
                <option value="due" disabled={dueCards === 0}>
                  Due Cards ({dueCards})
                </option>
                <option value="difficult">Difficult Cards Only</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                {options.mode === "all"
                  ? "Study all cards in this deck."
                  : options.mode === "due"
                  ? "Study only cards that are due for review based on spaced repetition."
                  : "Focus on difficult cards you previously struggled with."}
              </p>
            </div>

            <div className="flex items-center">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  id="shuffle"
                  name="shuffle"
                  checked={options.shuffle}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="shuffle" className="font-medium text-gray-700">
                  Shuffle Cards
                </label>
                <p className="text-gray-500">
                  Cards will be presented in random order.
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="limit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Limit Cards
              </label>
              <input
                type="number"
                id="limit"
                name="limit"
                min="1"
                max={totalCards}
                value={options.limit === null ? "" : options.limit}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm 
                         border-gray-300 rounded-md py-2 px-3"
                placeholder="Leave empty for all cards"
              />
              <p className="mt-1 text-xs text-gray-500">
                Limit the number of cards in your session (leave empty to
                include all).
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-medium 
                         py-3 px-6 rounded-md transition duration-200"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Start Studying
              </button>
            </div>
          </form>
        </div>

        <div className="bg-blue-50 px-6 py-4 border-t border-blue-100">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Study sessions help you remember cards more effectively through
                spaced repetition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyOptionsForm;
