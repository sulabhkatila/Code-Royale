import { useParams } from "react-router-dom";

export default function Room() {

    const { room } = useParams();

    return (
        <div className="w-screen h-screen text-white bg-dark-1">
            {room}
        </div>
    )
}