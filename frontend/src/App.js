import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Arena from "./pages/Arena";
import Challange from "./pages/Challange";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accounts/register" element={<Register />} />
        <Route
          path="/accounts/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/problem/:problem" element={<Arena />} />
        <Route path="/challange" element={<Challange />} />
      </Routes>
    </Router>
  );
}

export default App;
