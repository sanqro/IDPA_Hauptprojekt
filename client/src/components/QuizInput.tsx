/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetStateAction, useState } from "react";
import { IQUizInput } from "../interfaces/props";
import OnClickButton from "./OnClickButton";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import HelpModal from "./HelpModal";

const QuizStartedView = ({ selectedSet }: IQUizInput) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [quizMode, setQuizMode] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const totalQuestions = selectedSet.question.length;
  const currentQuestion = selectedSet.question[currentIndex];
  const correctAnswer = selectedSet.answer[currentIndex];

  const nav = useNavigate();

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setInputValue(event.target.value);

  const closeModal = () => {
    console.log("close");
    setShowHelpModal(false);
  };

  const openModal = () => {
    setShowHelpModal(true);
  };

  const postData = async (score: number) => {
    try {
      const response = await fetch("https://api.quiz.sanqro.me/scores/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token") as string,
        },
        body: JSON.stringify({
          key: localStorage.getItem("username") + selectedSet.key,
          username: localStorage.getItem("username") as string,
          set: selectedSet.key,
          score: score,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      alert("Unknown error occured");
    }
  };

  const nextFlashcard = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < totalQuestions) {
      setCurrentIndex(nextIndex);
    } else {
      setIsFinished(true);
    }
  };

  const checkAnswer = async () => {
    const isCorrect = inputValue === correctAnswer;
    let updatedCorrectAnswers = correctAnswers;

    if (quizMode === "quiz" && isCorrect) {
      updatedCorrectAnswers = correctAnswers + 1;
      setCorrectAnswers(updatedCorrectAnswers);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < totalQuestions) {
      setCurrentIndex(nextIndex);
      setInputValue("");
    } else {
      const finalScore = Math.round(
        (updatedCorrectAnswers / totalQuestions) * 100
      );
      setScore(finalScore);
      await postData(finalScore);
      setIsFinished(true);
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

  if (isFinished) {
    return (
      <div className="p-4">
        {quizMode === "quiz" && (
          <p className="text-2xl text-white font-semibold">
            Your score is {score}%
          </p>
        )}
        {quizMode === "flashcard" && (
          <p className="text-2xl text-white font-semibold">
            There is no score in flashcard mode!
          </p>
        )}
        <OnClickButton
          onClick={() => nav("/")}
          label="Go home"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2"
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
              nextFlashcard();
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
        className="bg-blue-500 hover:bg-blue-600 mr-4 text-white py-2 px-4 rounded mt-2"
      />
      {selectedSet.type == "accounting" && (
        <OnClickButton
          onClick={openModal}
          label="Help"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-2"
        />
      )}
      {showHelpModal && <HelpModal closeModal={closeModal} />}
    </div>
  );
};

export default QuizStartedView;
