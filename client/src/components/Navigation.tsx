import React from "react";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white text-center py-4">
      <ul className="flex justify-center space-x-4">
        <li className="text-lg font-semibold transition duration-300 hvr-sweep-to-right">
          <a href="/">Home</a>
        </li>
        <li className="text-lg font-semibold transition duration-300 hvr-sweep-to-right">
          <a href="/karten">Karten</a>
        </li>
        <li className="text-lg font-semibold transition duration-300 hvr-sweep-to-right">
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
