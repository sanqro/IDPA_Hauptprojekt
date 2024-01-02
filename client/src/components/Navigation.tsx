import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (token && storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername("");
    setIsLoggedIn(false);
    nav("/login");
  };

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="flex justify-between items-center px-4">
        {isLoggedIn && (
          <div className="text-lg font-semibold">
            <span>{username}</span>
          </div>
        )}
        <ul
          className={`flex justify-center space-x-4 ${
            isLoggedIn ? "flex-grow" : ""
          }`}
        >
          <li className="text-lg font-semibold">
            <button onClick={() => nav("/")}>Home</button>
          </li>
          <li className="text-lg font-semibold">
            <button onClick={() => nav("/cards")}>Cards</button>
          </li>
          {isLoggedIn ? (
            <li className="text-lg font-semibold transition">
              <button onClick={handleLogout}>Logout</button>
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
