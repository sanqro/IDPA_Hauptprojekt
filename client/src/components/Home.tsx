import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username") as string;
    if (token && username) {
      setUsername(username);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div className="text-white">{username} </div>
      ) : (
        <div className="flex justify-center w-80 align-middle mt-52 rounded-3xl bg-slate-500">
          <div className="h-72 w-72 flex flex-col justify-center items-center text-white">
            <img
              src="https://www.logomaker.com/api/main/images/1j+ojlxEOMkX9Wyqfhe43D6kh...CCrRRPmhzFwXs1M3EMoAJtlikkj...Zt9vo...PExevg9C3ktKMcs8"
              alt="Logo"
              className="mb-8"
            />
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hvr-sweep-to-right-login"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
