"use client";
import { Card } from "../../types/cardTypes";

interface StudyCardProps {
  card: Card;
  isFlipped: boolean;
}

const StudyCard: React.FC<StudyCardProps> = ({ card, isFlipped }) => {
  return (
    <div className="card-container h-[350px] sm:h-[300px] cursor-pointer">
      <div className={`card h-full ${isFlipped ? "flipped" : ""}`}>
        {/* Question Side (Front) */}
        <div className="card-front bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="flex flex-col h-full">
            <div className="bg-blue-500 text-white p-4">
              <h3 className="text-lg font-medium">Question</h3>
            </div>
            <div className="flex-grow overflow-auto p-6">
              <p className="text-gray-800 text-xl">{card.question}</p>
            </div>
            <div className="p-4 text-center border-t border-gray-100 bg-gray-50">
              <span className="text-sm text-blue-500 italic flex items-center justify-center">
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
                Tap to see answer
              </span>
            </div>
          </div>
        </div>

        {/* Answer Side (Back) */}
        <div className="card-back bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="flex flex-col h-full">
            <div className="bg-green-500 text-white p-4">
              <h3 className="text-lg font-medium">Answer</h3>
            </div>
            <div className="flex-grow overflow-auto p-6">
              <p className="text-gray-800 text-xl">{card.answer}</p>
            </div>
            <div className="p-4 text-center border-t border-gray-100 bg-gray-50">
              <span className="text-sm text-blue-500 italic flex items-center justify-center">
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
                Tap to see question
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;
