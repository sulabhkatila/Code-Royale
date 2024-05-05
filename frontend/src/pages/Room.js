import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {socket} from '../socket';

export default function Room() {

    useEffect(() => {
       
        const onConnect = () => {
            console.log("Connected to socket server");
            socket.emit("join", { room: room });
        }

        const onDisconnect = () => {
            console.log("Disconnected from socket server");
        }

        socket.connect();

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        
    }, [])

    const { room } = useParams();

    return (
        <div className="w-screen h-screen text-white bg-dark-1">
            {room}
        </div>
    )
}