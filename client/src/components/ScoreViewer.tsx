import React, { useState, useEffect } from "react";
import { IFetchedScores } from "../interfaces/props";
const SetViewer: React.FC = () => {
  const [scores, setScores] = useState<IFetchedScores | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchScores = async () => {
      const username = localStorage.getItem("username") as string;
      const token = localStorage.getItem("token") as string;
      setLoading(true);

      try {
        const fetchScores = await fetch(
          `https://api.quiz.sanqro.me/scores/get/${username}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (!fetchScores.ok) {
          throw new Error("Response was not ok!");
        }
        const data = await fetchScores.json();
        setScores(data.fetchedScore);
      } catch (error) {
        alert("Request failed: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading)
    return (
      <div className="text-center text-white text-lg">Loading Scores...</div>
    );
  if (scores?.count == 0)
    return (
      <div className="text-center text-white text-lg">No scores found!</div>
    );

  return (
    <div className="p-4">
      <div className="bg-gray-400 rounded px-4 pt-4 pb-4 mb-4">
        {scores?.items.map((scoreItem, index) => {
          return (
            <div key={index}>
              <h3 className="mb-1 text-xl font-bold">{scoreItem.set}</h3>
              <p className="mb-1 text-base">{scoreItem.score}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SetViewer;
