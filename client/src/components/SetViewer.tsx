import React, { useState, useEffect } from "react";
import { IFetchedSets } from "../interfaces/props";
const SetViewer: React.FC = () => {
  const [sets, setSets] = useState<IFetchedSets | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSets = async () => {
      const username = localStorage.getItem("username") as string;
      const token = localStorage.getItem("token") as string;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.quiz.sanqro.me/sets/getAll/${username}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Response was not ok!");
        }
        const data = await response.json();
        setSets(data.fetchedSets);
      } catch (error) {
        setError("Request failed: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSets();
  }, []);

  if (loading) return <div>Loading Sets...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!sets) return <div>No sets found! Please create one.</div>;

  return (
    <div>
      <ul>
        {sets.items.map((setItem, index) => (
          <li key={index}>
            <h3>{setItem.title}</h3>
            <p>{setItem.creator}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetViewer;
