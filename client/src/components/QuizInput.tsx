import { useState } from "react";
import { IQUizInput } from "../interfaces/props";
import OnClickButton from "./OnClickButton";
import InputField from "./InputField";

const QuizStartedView = ({ selectedSet }: IQUizInput) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const totalQuestions = selectedSet.question.length;
  const remainingQuestions = totalQuestions - currentIndex;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const checkAnswer = () => {
    const correctAnswer = selectedSet.answer[currentIndex];
    const isCorrect = inputValue === correctAnswer;

    console.log(isCorrect);

    if (currentIndex === totalQuestions - 1) {
      console.log("quiz finished");
    } else {
      setCurrentIndex(currentIndex + 1);
      setInputValue("");
    }
  };

  const currentQuestion = selectedSet.question[currentIndex];

  return (
    <div>
      <p>Question: {currentQuestion}</p>
      <span>
        Question {currentIndex + 1} of {totalQuestions}
      </span>
      <p>{remainingQuestions} questions remaining</p>

      <InputField
        type={"text"}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter the answer"
      />

      <OnClickButton onClick={checkAnswer} label="Check" />
    </div>
  );
};

export default QuizStartedView;
