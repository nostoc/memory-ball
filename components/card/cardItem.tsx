"use client";
import { useState } from "react";
import { Card } from "../../types/cardTypes";

interface CardItemProps {
  card: Card;
  onEdit: () => void;
  onDelete: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <div onClick={handleFlip} style={{ cursor: "pointer" }}>
        <div style={{ display: isFlipped ? "none" : "block" }}>
          <h3>Question:</h3>
          <p>{card.question}</p>
        </div>
        <div style={{ display: isFlipped ? "block" : "none" }}>
          <h3>Answer:</h3>
          <p>{card.answer}</p>
        </div>
        <p>Click to flip</p>
      </div>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default CardItem;
