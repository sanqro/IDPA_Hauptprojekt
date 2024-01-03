import React from "react";
import { ISmallSetDisplay } from "../interfaces/props";
import OnClickButton from "./OnClickButton";

const SmallSetDisplay: React.FC<ISmallSetDisplay> = ({
  label,
  className,
  set,
  onClick,
}) => {
  return (
    <div className="bg-gray-400 rounded px-4 pt-4 pb-4 mb-4">
      <h2 className="mb-1 text-xl font-bold">{set.title}</h2>
      <p className="mb-1 text-base">Type: {set.type || 0}</p>
      <p className="mb-1 text-base">Creator: {set.creator}</p>
      <OnClickButton onClick={onClick} label={label} className={className} />
    </div>
  );
};

export default SmallSetDisplay;
