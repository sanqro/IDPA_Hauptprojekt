import { useState, useEffect } from "react";
import { ISet } from "../interfaces/props";
import SmallSetDisplay from "./SmallSetDisplay";

const DeleteSetView = () => {
  const [set, setSet] = useState<ISet[]>([]);

  useEffect(() => {
    const fetchSets = async () => {
      const username = localStorage.getItem("username") as string;
      const response = await fetch(
        `https://api.quiz.sanqro.me/sets/get/${username}`,
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

  if (set.length === 0)
    return <div className="text-center text-white text-lg">No sets found!</div>;

  const handleDelete = async (id: string) => {
    const response = await fetch(
      `https://api.quiz.sanqro.me/sets/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") as string,
        },
      }
    );
    if (response.ok) {
      {
        const newSets = set.filter((set) => set.key !== id);
        setSet(newSets);
        alert("Set deleted successfully");
      }
    }
  };

  return (
    <div className="p-4">
      {set.map((set) => (
        <SmallSetDisplay
          key={set.key}
          set={set}
          onClick={() => handleDelete(set.key)}
          label={"Delete"}
          className="py-2 px-4 mt-4 text-white bg-red-500 hover:bg-red-600 rounded"
        />
      ))}
    </div>
  );
};

export default DeleteSetView;
