// Login.tsx
import React from "react";
import LoginField from "../components/LoginField";

const Login: React.FC = () => {
  return (
    <div className="h-72 w-72 flex flex-col justify-center items-center text-white">
      <LoginField />
    </div>
  );
};

export default Login;
