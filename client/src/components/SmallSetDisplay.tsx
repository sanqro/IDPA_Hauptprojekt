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
    <div>
      <h2>{set.title}</h2>
      <p>Type: {set.type || 0}</p>
      <p>Creator: {set.creator}</p>
      <OnClickButton onClick={onClick} label={label} className={className} />
    </div>
  );
};

export default SmallSetDisplay;
