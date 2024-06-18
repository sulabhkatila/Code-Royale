import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import { SocketContext } from "./context/SocketContext";
import { useAuthContext } from "./hooks/useAuthContext";
import Arena from "./pages/Arena";
import Challange from "./pages/Challange";
import CreateRoom from "./pages/CreateRoom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Room from "./pages/Room";
import Rooms from "./pages/Rooms";
import { socket } from "./socket";

function App() {
  const { user } = useAuthContext();

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challange" element={<Challange />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:room" element={<Room />} />
          <Route path="/accounts/register" element={<Register />} />
          <Route
            path="/accounts/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/problem/:problem" element={<Arena />} />
          <Route path="/room/new" element={<CreateRoom />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
