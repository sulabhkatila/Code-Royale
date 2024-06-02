import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
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
import { useEffect, useState } from "react";

function App() {
  const { user } = useAuthContext();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("Connected to socket<><><>");
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function receive(value) {
      console.log("Received message: ", value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", receive);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", receive);
    };
  }, []);

  return (
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
  );
}

export default App;
