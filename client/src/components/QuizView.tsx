/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ISet } from "../interfaces/props";
import SmallSetDisplay from "./SmallSetDisplay";
import QuizInput from "./QuizInput";

const QuizView = () => {
  const [set, setSet] = useState<ISet[]>([]);
  const [selectedSet, setSelectedSet] = useState<ISet | null>(null);

  useEffect(() => {
    const fetchSets = async () => {
      const user = localStorage.getItem("username");
      const response = await fetch(
        `https://api.quiz.sanqro.me/sets/getAll/${user}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") as string,
          },
        }
      );
      const data = await response.json();
      setSet(data.fetchedSets.items);
    };
    fetchSets();
  }, []);

  const handleStartClick = async (id: string) => {
    const response = await fetch(
      `https://api.quiz.sanqro.me/sets/getSet/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") as string,
        },
      }
    );
    const data = await response.json();
    setSelectedSet(data.fetchedSet);
  };

  return (
    <div className="p-4">
      {selectedSet === null &&
        set.map((set) => (
          <SmallSetDisplay
            key={set.key}
            set={set}
            onClick={() => handleStartClick(set.key)}
            label={"Start this quiz"}
          />
        ))}
      {selectedSet && <QuizInput selectedSet={selectedSet} />}
    </div>
  );
};

export default QuizView;
