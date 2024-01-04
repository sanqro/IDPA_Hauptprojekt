import { useState } from "react";
import { IUpdateView } from "../interfaces/props";
import InputField from "./InputField";
import OnClickButton from "./OnClickButton";

const UpdateSetView = ({
  selectedSet,
  handlePairChange,
  handleSaveClick,
  handleCancelClick,
  handleChange,
}: IUpdateView) => {
  const [publicToggle, setPublicToggle] = useState(selectedSet.public);
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
        className="block w-full px-4 py-2 mt-3 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      >
        <option value="accounting">Accounting</option>
        <option value="questions">Questions</option>
      </select>

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

      {selectedSet.answer.map((_answer, index) => (
        <div key={index} className="flex space-x-4 mt-4">
          <InputField
            type="text"
            placeholder="Question"
            value={selectedSet.answer[index]}
            onChange={(e) => handlePairChange("answer", index, e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Answer"
            value={selectedSet.question[index]}
            onChange={(e) =>
              handlePairChange("question", index, e.target.value)
            }
          />
        </div>
      ))}
      <div>
        <OnClickButton
          onClick={() => handleSaveClick()}
          label="Save"
          className="py-2 px-4 mt-4 mr-5 text-white bg-blue-500 hover:bg-blue-600 rounded"
        />
        <OnClickButton
          onClick={() => handleCancelClick()}
          label="Cancel"
          className="py-2 px-4 mt-4 text-white bg-red-500 hover:bg-red-600 rounded"
        />
      </div>
    </div>
  );
};

export default UpdateSetView;
