import { useParams } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import WorkSpace from "../components/CodeArea/WorkSpace";
import { useEffect } from "react";
import { useSocketContext } from "../hooks/useSocketContext";

export default function Arena() {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) {
      return;
    }
    // Listen for if the other person won
    socket.on("opponentWon", () => {
      alert("You Loose!");
    });

    // Send info if you won
    socket.on("iWon", () => {
      alert("You win!");
    });

  }); 
  const { problem: problemName } = useParams();
  const {
    data: problem,
    loading,
    error,
  } = useGet(`/api/problem/${problemName}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (problem) {
    return (
      <WorkSpace problem={problem} />
    );
  }
}
