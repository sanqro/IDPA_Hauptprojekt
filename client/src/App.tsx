// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navigation from "./Navigation";
import Login from "./Login";
import Karten from "./Karten";

function App() {
  return (
    <Router>
      <div className="h-screen w-screen bg-slate-700 rounded">
        <Navigation />
        <div className="flex justify-center align-middle">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/karten" element={<Karten />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
