"use client";
import { useState } from "react";
import { Card } from "../../types/cardTypes";

interface StudyCardProps {
  card: Card;
}

const StudyCard: React.FC<StudyCardProps> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card-container h-[300px] my-4">
      <div
        className={`card h-full cursor-pointer ${isFlipped ? "flipped" : ""}`}
        onClick={handleFlip}
      >
        {/* Question Side (Front) */}
        <div className="card-front bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-5">
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <h3 className="text-blue-600 text-sm font-medium">Question</h3>
            </div>
            <div className="flex-grow overflow-auto">
              <p className="text-gray-800 text-xl">{card.question}</p>
            </div>
            <div className="mt-3 flex justify-center">
              <span className="text-sm text-blue-500 italic">
                Tap to see answer
              </span>
            </div>
          </div>
        </div>

        {/* Answer Side (Back) */}
        <div className="card-back bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-5">
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <h3 className="text-green-600 text-sm font-medium">Answer</h3>
            </div>
            <div className="flex-grow overflow-auto">
              <p className="text-gray-800 text-xl">{card.answer}</p>
            </div>
            <div className="mt-3 flex justify-center">
              <span className="text-sm text-blue-500 italic">
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
