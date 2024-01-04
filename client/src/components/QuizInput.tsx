import { SetStateAction, useState } from "react";
import { IQUizInput } from "../interfaces/props";
import OnClickButton from "./OnClickButton";
import InputField from "./InputField";

const QuizStartedView = ({ selectedSet }: IQUizInput) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [quizMode, setQuizMode] = useState("");

  const totalQuestions = selectedSet.question.length;
  const isQuizFinished = currentIndex === totalQuestions - 1;
  const currentQuestion = selectedSet.question[currentIndex];
  const correctAnswer = selectedSet.answer[currentIndex];

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setInputValue(event.target.value);

  const checkAnswer = () => {
    console.log(quizMode);
    if (quizMode === "quiz") {
      const isCorrect = inputValue === correctAnswer;
      console.log(isCorrect);
    }
    if (!isQuizFinished) {
      setCurrentIndex(currentIndex + 1);
      setInputValue("");
    } else {
      console.log("quiz finished");
    }
  };

  const toggleMode = (mode: SetStateAction<string>) => {
    setQuizMode(mode);
  };

  if (!quizMode) {
    return (
      <div className="p-4">
        <OnClickButton
          onClick={() => toggleMode("flashcard")}
          label="Flashcard Mode"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        />
        <OnClickButton
          onClick={() => toggleMode("quiz")}
          label="Quiz Mode"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded ml-2"
        />
      </div>
    );
  }

  if (quizMode === "flashcard") {
    return (
      <div className="p-4 max-w-md mx-auto bg-white rounded-lg">
        <p className="text-lg font-semibold mb-3 text-gray-700">
          {inputValue ? correctAnswer : currentQuestion}
        </p>
        <div className="flex justify-between items-center">
          <OnClickButton
            onClick={() => setInputValue(inputValue ? "" : correctAnswer)}
            label={inputValue ? "Show Question" : "Show Answer"}
            className="bg-blue-500 hover:bg-blue-600 mr-4 text-white py-2 px-4 rounded mt-2"
          />
          <OnClickButton
            onClick={() => {
              setCurrentIndex(currentIndex + 1);
              checkAnswer();
            }}
            label="Next Flashcard"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-2"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <p className="text-2xl text-white font-semibold">{selectedSet.title}</p>
      <p className="text-lg text-white font-semibold">
        Question: {currentQuestion}
      </p>
      <span className="text-sm text-white">
        Question {currentIndex + 1} of {totalQuestions}
      </span>
      <p className="text-sm text-white">
        {totalQuestions - currentIndex} questions remaining
      </p>
      <InputField
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter the answer"
      />
      <OnClickButton
        onClick={checkAnswer}
        label="Check"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2"
      />
    </div>
  );
};

export default QuizStartedView;
