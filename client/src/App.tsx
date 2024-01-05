import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.tsx";
import Navigation from "./components/Navigation.tsx";
import Login from "./pages/Login.tsx";
import Cards from "./pages/cards.tsx";
import NotFound from "./pages/NotFound.tsx";
import Register from "./pages/Register.tsx";
import AddSet from "./pages/AddSet.tsx";
import DeleteSet from "./pages/DeleteSet.tsx";
import UpdateSet from "./pages/UpdateSet.tsx";
import AuthProvider from "./contexts/AuthProvier.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import Quiz from "./pages/Quiz.tsx";
import Scores from "./pages/Scores.tsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="h-screen w-screen overflow-y-scroll bg-slate-700">
          <Navigation />
          <div className="flex justify-center align-middle">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/cards" element={<Cards />} />
                <Route path="/add" element={<AddSet />} />
                <Route path="/delete" element={<DeleteSet />} />
                <Route path="/update" element={<UpdateSet />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/scores" element={<Scores />} />
              </Route>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
