import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.tsx";
import Navigation from "./components/Navigation.tsx";
import Login from "./pages/Login.tsx";
import Cards from "./pages/cards.tsx";
import NotFound from "./pages/NotFound.tsx";
import Register from "./pages/Register.tsx";
import AddSet from "./pages/AddSet.tsx";
import DeleteSet from "./pages/DeleteSet.tsx";

function App() {
  return (
    <Router>
      <div className="h-screen w-screen bg-slate-700 rounded">
        <Navigation />
        <div className="flex justify-center align-middle">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/add" element={<AddSet />} />
            <Route path="/delete" element={<DeleteSet />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
