/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ISetData } from "../interfaces/props"; // Pfad zu Ihrem Interface
import OnClickButton from "./OnClickButton";
import InputField from "./InputField";

const addSet = async (set: ISetData) => {
  try {
    const response = await fetch("https://api.quiz.sanqro.me/sets/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") as string,
      },
      body: JSON.stringify({
        title: set.title,
        creator: localStorage.getItem("username") as string,
        question: set.question,
        answer: set.answer,
        public: set.public,
        type: set.type,
      }),
    });
    if (response.ok) {
      alert("Set created successfully");
    } else {
      const data = await response.json();
      alert(data.error);
    }
  } catch (error) {
    alert("Unknown error occured");
  }
};

function checkInput(set: ISetData) {
  let questionBoolean = false;
  let answerBoolean = false;
  for (let i = 0; i < set.question.length; i++) {
    if (set.question[i] === "" || set.question[i] === " ") {
      questionBoolean = true;
    }
  }
  for (let i = 0; i < set.answer.length; i++) {
    if (set.answer[i] === "" || set.answer[i] === " ") {
      answerBoolean = true;
    }
  }

  if (set.title === "" || set.title === " ") {
    alert("Please add a title to your set");
  } else if (set.question.length === 0 || set.answer.length === 0) {
    alert("Please add at least one question and one answer");
  } else if (questionBoolean || answerBoolean) {
    alert("There is a pair which is empty");
  } else if (answerBoolean == false && questionBoolean == false) {
    addSet(set);
  }
}

const InputPair = () => {
  const [publicToggle, setPublicToggle] = useState(false);
  const [type, setType] = useState("accounting");
  const [title, setTitle] = useState("");
  const [pairs, setPairs] = useState<ISetData[]>([]);

  useEffect(() => {}, [type]);

  const handleAddPair = () => {
    setPairs([
      ...pairs,
      {
        creator: "",
        title: "",
        question: [""],
        answer: [""],
        public: false,
        type: "",
      },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof ISetData,
    value: string
  ) => {
    const newPairs = [...pairs];
    if (field === "question" || field === "answer") {
      (newPairs[index][field] as string[])[0] = value;
    } else {
      newPairs[index][field] = value as never;
    }
    setPairs(newPairs);
  };

  const handleCreateSet = () => {
    const Set: ISetData = {
      creator: sessionStorage.getItem("username") as string,
      title: title,
      question: pairs.map((pair) => pair.question[0]),
      answer: pairs.map((pair) => pair.answer[0]),
      public: publicToggle,
      type: type,
    };
    checkInput(Set);
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto mt-2">
      <h1 className="text-2xl font-semibold text-white">Title:</h1>
      <InputField
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h3 className="text-2xl font-semibold mt-2 text-white">
        Visbility of set:
      </h3>
      <button
        onClick={() => setPublicToggle(!publicToggle)}
        className={`px-4 py-2 text-sm font-semibold mt-2 text-white rounded-md transition-colors ${
          publicToggle
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {publicToggle ? "Public" : "Private"}
      </button>
      <select
        onChange={(e) => {
          const newType = e.target.value;
          setType(newType);
        }}
        className="block w-full px-4 py-2 mt-3 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      >
        <option value="accounting">Accounting</option>
        <option value="questions">Questions</option>
      </select>
      {pairs.map((pair, index) => (
        <div className="flex space-x-4 mt-4" key={index}>
          <InputField
            type="text"
            placeholder="Question"
            value={pair.question[0]}
            onChange={(e) => handleChange(index, "question", e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Answer"
            value={pair.answer[0]}
            onChange={(e) => handleChange(index, "answer", e.target.value)}
          />
        </div>
      ))}

      <OnClickButton
        onClick={handleAddPair}
        label={"Add new pair"}
        className="py-2 px-4 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded"
      />
      <OnClickButton
        onClick={handleCreateSet}
        label="Create set"
        className="py-2 px-4 mt-4 text-white bg-green-500 hover:bg-green-600 rounded float-right"
      />
    </div>
  );
};

export default InputPair;
