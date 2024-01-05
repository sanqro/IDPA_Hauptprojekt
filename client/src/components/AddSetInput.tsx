import { useEffect, useState } from "react";
import { ISet, IQuestionItem, QuestionType } from "../interfaces/props";
import InputField from "./InputField";
import OnClickButton from "./OnClickButton";

const addSet = async (set: ISet) => {
  try {
    set.creator = localStorage.getItem("username") as string;
    const response = await fetch("https://api.quiz.sanqro.me/sets/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") as string,
      },
      body: JSON.stringify(set),
    });

    if (response.ok) {
      alert("Set created successfully");
    } else {
      const data = await response.json();
      alert(data.error);
    }
  } catch (error) {
    alert("Unknown error occurred");
  }
};

function checkInput(set: ISet) {
  if (
    set.creator === "" ||
    set.title === "" ||
    set.type === "" ||
    !set.question ||
    set.public === null ||
    (set.type !== "accounting" && set.type !== "questions")
  ) {
    alert("Invalid Input");
    return false;
  }
  return true;
}

const AddSetInput = () => {
  const handleQuestionTypeChange = (
    index: number,
    questionType: QuestionType
  ) => {
    const newPairs = [...pairs];
    newPairs[index].questionType = questionType;
    if (questionType === QuestionType.MultipleChoice) {
      newPairs[index].options = [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
      ];
      newPairs[index].correctAnswer = "Option 1";
    } else if (questionType === QuestionType.TrueFalse) {
      newPairs[index].correctAnswer = true;
    } else {
      newPairs[index].correctAnswer = "";
    }
    setPairs(newPairs);
  };

  const [publicToggle, setPublicToggle] = useState(false);
  const [type, setType] = useState("accounting");
  const [title, setTitle] = useState("");
  const [pairs, setPairs] = useState<IQuestionItem[]>([]);

  useEffect(() => {}, [type]);

  const handleAddPair = () => {
    setPairs([
      ...pairs,
      {
        question: "",
        questionType: QuestionType.TextInput,
        correctAnswer: "",
      },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof IQuestionItem,
    value: string | boolean
  ) => {
    const newPairs = [...pairs];
    if (field === "questionType") {
      newPairs[index].questionType = value as QuestionType;
    } else if (field === "correctAnswer") {
      newPairs[index].correctAnswer = value as string | boolean;
    } else if (field === "options" && typeof value === "string") {
      newPairs[index].options = value.split(",");
    } else if (field === "question") {
      newPairs[index].question = value as string;
    }
    setPairs(newPairs);
  };

  const handleCreateSet = () => {
    const newSet: ISet = {
      key: (sessionStorage.getItem("username") as string) + title,
      creator: sessionStorage.getItem("username") as string,
      title: title,
      question: pairs,
      public: publicToggle,
      type: type,
    };

    if (checkInput(newSet)) {
      addSet(newSet);
    }
  };

  const handleOptionChange = (
    pairIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newPairs = [...pairs];
    const currentPair = newPairs[pairIndex];

    if (
      currentPair.questionType === QuestionType.MultipleChoice &&
      currentPair.options
    ) {
      currentPair.options[optionIndex] = value;
      setPairs(newPairs);
    }
  };

  const handleCorrectAnswerChange = (pairIndex: number, value: string) => {
    const newPairs = [...pairs];
    const currentPair = newPairs[pairIndex];

    if (currentPair.questionType === QuestionType.MultipleChoice) {
      currentPair.correctAnswer = value;
      setPairs(newPairs);
    }
  };

  const displayQuestions = (pair: IQuestionItem, index: number) => {
    return (
      <div>
        <InputField
          type="text"
          placeholder="Enter your question here"
          value={pair.question}
          onChange={(e) => handleChange(index, "question", e.target.value)}
        />
        {pair.questionType === QuestionType.MultipleChoice && (
          <div>
            <h3 className="font-semibold mt-2 text-white">Correct answer</h3>
            <select
              value={pair.correctAnswer as string}
              className="block w-full px-4 py-2 mt-3 bg-white border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
            >
              {pair.options?.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {pair.options?.map((option, optionIndex) => (
              <InputField
                key={optionIndex}
                type="text"
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, optionIndex, e.target.value)
                }
              />
            ))}
          </div>
        )}
        {pair.questionType === QuestionType.TrueFalse && (
          <div>
            <select
              value={String(pair.correctAnswer)}
              className="block w-full px-4 py-2 mt-3 bg-white border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              onChange={(e) =>
                handleChange(index, "correctAnswer", e.target.value === "true")
              }
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        )}
        {pair.questionType === QuestionType.TextInput && (
          <InputField
            type="text"
            placeholder="Correct Answer"
            value={pair.correctAnswer as string}
            onChange={(e) =>
              handleChange(index, "correctAnswer", e.target.value)
            }
          />
        )}
      </div>
    );
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
      <h3 className="font-semibold mt-2 text-white">Visbility of set:</h3>
      <button
        onClick={() => setPublicToggle(!publicToggle)}
        className={`px-4 py-2 text-sm font-semibold mt-2 text-white transition-colors ${
          publicToggle
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {publicToggle ? "Public" : "Private"}
      </button>
      <h3 className="font-semibold mt- text-white">Type of set:</h3>
      <select
        onChange={(e) => {
          const newType = e.target.value;
          setType(newType);
        }}
        className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300  focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      >
        <option value="accounting">Accounting</option>
        <option value="questions">Questions</option>
      </select>
      {pairs.map((pair, index) => (
        <div className="flex flex-col space-y-4 mt-2" key={index}>
          <h3 className="font-semibold mt-2 text-white">Type of question:</h3>
          <select
            className="block w-full px-4 py-2 bg-white border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={pair.questionType}
            onChange={(e) =>
              handleQuestionTypeChange(index, e.target.value as QuestionType)
            }
          >
            <option value={QuestionType.TextInput}>Text Input</option>
            <option value={QuestionType.MultipleChoice}>Multiple Choice</option>
            <option value={QuestionType.TrueFalse}>True/False</option>
          </select>
          {displayQuestions(pair, index)}
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
export default AddSetInput;
