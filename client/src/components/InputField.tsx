import { InputField } from "../interfaces/props";

const InputField = (props: InputField) => {
  return (
    <input
      type="text"
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      className="block w-full px-4 py-2 mt-3 bg-white border"
    />
  );
};

export default InputField;
