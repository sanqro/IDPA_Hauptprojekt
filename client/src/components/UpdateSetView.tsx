/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IUpdateView, IQuestionItem, QuestionType } from "../interfaces/props";
import InputField from "./InputField";
import OnClickButton from "./OnClickButton";

const UpdateSetView = ({
  selectedSet,
  handleSaveClick,
  handleCancelClick,
  handleChange,
}: IUpdateView) => {
  const [publicToggle, setPublicToggle] = useState(selectedSet.public);
  const [questions, setQuestions] = useState<IQuestionItem[]>(
    selectedSet.question
  );

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updatedQuestions = [...questions];
    if (field.startsWith("options")) {
      const optionIndex = parseInt(field.split("[")[1].split("]")[0]);
      const newOptions = [...(updatedQuestions[index].options || [])];
      newOptions[optionIndex] = value as string;
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        options: newOptions,
      };
    } else {
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    }
    setQuestions(updatedQuestions);
  };

  const displayQuestions = (questionItem: IQuestionItem, index: number) => {
    if (questionItem.questionType === QuestionType.MultipleChoice) {
      return (
        <div>
          {Array.from({ length: 4 }).map((_, optionIndex) => (
            <InputField
              key={optionIndex}
              type="text"
              placeholder={`Option ${optionIndex + 1}`}
              value={
                questionItem.options
                  ? questionItem.options[optionIndex] || ""
                  : ""
              }
              onChange={(e) =>
                handleQuestionChange(
                  index,
                  `options[${optionIndex}]`,
                  e.target.value
                )
              }
            />
          ))}
          <select
            value={questionItem.correctAnswer as string}
            className="block px-4 py-2 mt-3 bg-white border border-gray-300 rounded-md"
            onChange={(e) =>
              handleQuestionChange(index, "correctAnswer", e.target.value)
            }
          >
            {questionItem.options?.map((option: any, optionIndex: any) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={index} className="my-4">
        <p className="font-semibold text-white">Question Type:</p>
        <select
          className="block px-4 py-2 bg-white border border-gray-300 rounded-md"
          value={questionItem.questionType}
          onChange={(e) =>
            handleQuestionChange(index, "questionType", e.target.value)
          }
        >
          <option value={QuestionType.TextInput}>Text Input</option>
          <option value={QuestionType.MultipleChoice}>Multiple Choice</option>
          <option value={QuestionType.TrueFalse}>True/False</option>
        </select>

        <p className="mt-2 font-semibold text-white">Question:</p>
        <InputField
          type="text"
          placeholder="Question"
          value={questionItem.question}
          onChange={(e) =>
            handleQuestionChange(index, "question", e.target.value)
          }
        />

        {questionItem.questionType === QuestionType.TrueFalse && (
          <select
            value={String(questionItem.correctAnswer)}
            className="block px-4 py-2 mt-3 bg-white border border-gray-300 rounded-md"
            onChange={(e) =>
              handleQuestionChange(
                index,
                "correctAnswer",
                e.target.value === "true"
              )
            }
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        )}

        {questionItem.questionType === QuestionType.TextInput && (
          <InputField
            type="text"
            placeholder="Correct Answer"
            value={questionItem.correctAnswer as string}
            onChange={(e) =>
              handleQuestionChange(index, "correctAnswer", e.target.value)
            }
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <InputField
        type="text"
        placeholder="Title"
        value={selectedSet.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <select
        onChange={(e) => handleChange("type", e.target.value)}
        value={selectedSet.type}
        className="block w-full px-4 py-2 mt-3 bg-white border border-gray-300 rounded-md"
      >
        <option value="accounting">Accounting</option>
        <option value="questions">Questions</option>
      </select>

      <button
        onClick={() => setPublicToggle(!publicToggle)}
        className={`px-4 py-2 text-sm font-semibold mt-2 text-white rounded-md ${
          publicToggle
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {publicToggle ? "Public" : "Private"}
      </button>

      {questions.map(displayQuestions)}

      <OnClickButton
        onClick={() => {
          selectedSet.question = questions;
          selectedSet.public = publicToggle;
          console.log(selectedSet);
          handleSaveClick();
        }}
        label="Save"
        className="py-2 px-4 mt-4 mr-5 text-white bg-blue-500 hover:bg-blue-600 rounded"
      />
      <OnClickButton
        onClick={() => handleCancelClick()}
        label="Cancel"
        className="py-2 px-4 mt-4 text-white bg-red-500 hover:bg-red-600 rounded"
      />
    </div>
  );
};

export default UpdateSetView;
