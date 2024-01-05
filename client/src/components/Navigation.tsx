import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvier";

const Navigation = () => {
  const nav = useNavigate();

  const { isLoggedIn, username, handleLogOut } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="flex flex-row justify-between items-center px-4">
        {isLoggedIn() && (
          <div className="text-lg font-semibold">
            <button onClick={() => nav("/scores")}>{username}</button>
          </div>
        )}
        <ul
          className={`flex justify-center space-x-4 ${
            isLoggedIn() ? "flex-grow" : ""
          }`}
        >
          <button className="text-lg font-semibold" onClick={() => nav("/")}>
            Home
          </button>
          {isLoggedIn() ? (
            <>
              <button
                className="text-lg font-semibold"
                onClick={() => nav("/add")}
              >
                Add set
              </button>
              <button
                className="text-lg font-semibold"
                onClick={() => nav("/delete")}
              >
                Delete Set
              </button>
              <button
                className="text-lg font-semibold"
                onClick={() => nav("/update")}
              >
                Update Set
              </button>
              <button
                className="text-lg font-semibold"
                onClick={() => nav("/quiz")}
              >
                Quiz
              </button>
              <button className="text-lg font-semibold" onClick={handleLogOut}>
                Logout
              </button>
            </>
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
