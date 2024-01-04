import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvier";

const Navigation = () => {
  const nav = useNavigate();

  const { isLoggedIn, username, handleLogOut } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="flex justify-between items-center px-4">
        {isLoggedIn() && (
          <div className="text-lg font-semibold">
            <span>{username}</span>
          </div>
        )}
        <ul
          className={`flex justify-center space-x-4 ${
            isLoggedIn() ? "flex-grow" : ""
          }`}
        >
          <li className="text-lg font-semibold">
            <button onClick={() => nav("/")}>Home</button>
          </li>
          <li className="text-lg font-semibold">
            <button onClick={() => nav("/cards")}>Cards</button>
          </li>
          {isLoggedIn() ? (
            <li className="text-lg font-semibold transition">
              <button onClick={handleLogOut}>Logout</button>
            </li>
          ) : (
            <li className="text-lg font-semibold transition">
              <button onClick={() => nav("/login")}>Login</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
