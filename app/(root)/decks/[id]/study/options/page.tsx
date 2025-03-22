"use client";
import { useState, useEffect } from "react";
import ProtectedRoute from "../../../../../../components/ProtectedRoute";
import StudyOptionsForm from "../../../../../../components/study-features/studyOptions";
import {
  getCardsForStudy,
  getDueCards,
} from "../../../../../../services/studySessionService";

export default function StudyOptionsPage({
  params,
}: {
  params: { id: string };
}) {
  const [totalCards, setTotalCards] = useState(0);
  const [dueCards, setDueCards] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardCounts = async () => {
      try {
        setLoading(true);

        // Get total cards
        const cardsResponse = await getCardsForStudy(params.id);
        if (cardsResponse?.data?.cards) {
          setTotalCards(cardsResponse.data.cards.length);
        }

        // Get due cards
        try {
          const dueResponse = await getDueCards(params.id);
          if (dueResponse?.data?.cards) {
            setDueCards(dueResponse.data.cards.length);
          }
        } catch (error) {
            console.log(error);
          // If due cards endpoint doesn't exist yet, just set to 0
          console.warn("Due cards endpoint may not be implemented yet");
          setDueCards(0);
        }
      } catch (err) {
        console.error("Error fetching card counts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCardCounts();
  }, [params.id]);

  return (
    <ProtectedRoute>
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <StudyOptionsForm
            deckId={params.id}
            totalCards={totalCards}
            dueCards={dueCards}
          />
        )}
      </main>
    </ProtectedRoute>
  );
}
