import { Link } from "react-router-dom";
import { INavigationButton } from "../interfaces/props";

function NavigationButton(props: INavigationButton) {
  return (
    <Link to={props.destination}>
      <button className="py-2 px-4 text-white text-xl rounded mx-10% bg-blue-500 hover:bg-blue-600 w-full">
        {props.children}
      </button>
    </Link>
  );
}

export default NavigationButton;
