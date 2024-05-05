import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import WorkSpace from "../components/CodeArea/WorkSpace";

export default function Room() {
  useEffect(() => {
    const onConnect = () => {
      console.log("Connected to socket server");
      socket.emit("join", { room: room });
    };

    const onDisconnect = () => {
      console.log("Disconnected from socket server");
    };

    socket.connect();

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
  }, [Room]);

  const { room } = useParams();

  return (
    <div className="flex flex-row justify-between w-screen h-screen text-white bg-dark-1">
      <div className="flex flex-col w-1/4 h-full">hi</div>
      <div className="w-3/4 h-full">
        <WorkSpace problem={null}/>
      </div>
    </div>
  );
}
