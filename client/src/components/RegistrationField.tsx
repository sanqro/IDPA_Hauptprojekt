import React from "react";
import { useNavigate } from "react-router-dom";
import OnClickButton from "./OnClickButton";

function RegistrationField() {
  const nav = useNavigate();

  const submitRegistration = async () => {
    const username = (document.getElementById("username") as HTMLInputElement)
      .value as string;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value as string;

    if (username == "" || password == "") {
      alert("Please provide your password and username!");
      return false;
    }

    const register = await fetch("https://api.quiz.sanqro.me/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const response = await register.json();
    if (await response.success) {
      alert("Registration successful!");
      nav("/login");
    } else {
      alert("There was an error: " + response.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center rounded-md py-8 px-10 w-1/4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Register</h1>
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-gray-800 font-bold text-lg">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            className="py-2 px-4 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-gray-800 font-bold text-lg">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            className="py-2 px-4 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <OnClickButton
            onClick={submitRegistration}
            label="Register"
            className="py-2 px-4 text-white text-xl rounded mx-10% bg-blue-500 hover:bg-blue-600 w-full"
          />
          <button
            onClick={() => nav("/login")}
            className="text-blue-600 hover:text-blue-700 text-lg font-medium"
          >
            Already have an account? Login here!
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationField;
