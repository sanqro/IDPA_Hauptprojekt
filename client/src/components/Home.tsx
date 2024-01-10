import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvier";

const Homepage = () => {
  const { username, isLoggedIn } = useContext(AuthContext);
  return (
    <div>
      {isLoggedIn() ? (
        <div className="flex items-center flex-col text-white mt-12">
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="text-2xl font-bold mb-4">Welcome {username}!</div>
          </div>
          <div className="flex justify-center w-80 align-middle mt-2 0 rounded-3xl bg-slate-500">
            <div className="h-72 w-72 flex flex-col justify-center items-center text-white">
              <img
                src="https://www.logomaker.com/api/main/images/1j+ojlxEOMkX9Wyqfhe43D6kh...CCrRRPmhzFwXs1M3EMoAJtlikkj...Zt9vo...PExevg9C3ktKMcs8"
                alt="Logo"
                className="mb-8"
              />
              <div className="flex space-x-4">
                <Link
                  to="/quiz"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hvr-sweep-to-right-login"
                >
                  Learn now!
                </Link>
              </div>
            </div>
          </div>
        </div>
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
