/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ISet } from "../interfaces/props";
import SmallSetDisplay from "./SmallSetDisplay";
import UpdateView from "./UpdateView";

const Update = () => {
  const [set, setSet] = useState<ISet[]>([]);
  const [selectedSet, setSelectedSet] = useState<ISet | null>(null);

  useEffect(() => {
    const fetchSets = async () => {
      const user = localStorage.getItem("username");
      const response = await fetch(
        `https://api.quiz.sanqro.me/sets/get/${user}`,
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

  const handleEditClick = async (id: string) => {
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

  const handleSaveClick = async () => {
    if (!selectedSet) return;

    const oldKey = selectedSet.key;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { key, ...newSetData } = selectedSet;

    try {
      const response = await fetch("https://api.quiz.sanqro.me/sets/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") as string,
        },
        body: JSON.stringify({ oldKey, ...newSetData }),
      });
      if (response.ok) {
        alert("Set updated successfully");
        setSelectedSet(null);
        setSet((prevSets) =>
          prevSets.map((set) =>
            set.key === oldKey ? { key: oldKey, ...newSetData } : set
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePairChange = (type: keyof ISet, index: number, value: string) => {
    if (selectedSet) {
      const updatedSet: ISet = { ...selectedSet };
      (updatedSet[type] as string[])[index] = value;
      setSelectedSet(updatedSet);
    }
  };

  const handleChange = (type: keyof ISet, value: string) => {
    if (selectedSet && typeof selectedSet[type] === "string") {
      const updatedSet: ISet = { ...selectedSet };
      (updatedSet[type] as any) = value;
      setSelectedSet(updatedSet);
    }
  };

  return (
    <div className="p-4">
      {selectedSet === null &&
        set.map((set) => (
          <SmallSetDisplay
            key={set.key}
            set={set}
            onClick={() => handleEditClick(set.key)}
            label={"Edit"}
          />
        ))}
      {selectedSet && (
        <UpdateView
          selectedSet={selectedSet}
          handlePairChange={handlePairChange}
          handleSaveClick={handleSaveClick}
          handleChange={handleChange}
          handleCancelClick={() => setSelectedSet(null)}
        />
      )}
    </div>
  );
};

export default Update;
