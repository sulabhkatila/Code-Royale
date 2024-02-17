import { BsCheckCircle } from "react-icons/bs";
import { FaRegCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProblemTable({ problems }) {
  const { user } = useAuthContext();

  function getClassNamesForIndex(index) {
    if (index % 2 === 0) {
      return "bg-dark-1";
    } else {
      return "bg-dark-2";
    }
  }

  function getClassNamesForDifficulty(difficulty) {
    let difficultyClass =
      "inline-block rounded-[20px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize";

    switch (difficulty.toLowerCase()) {
      case "easy":
        difficultyClass += " bg-light-green text-light-green";
        break;
      case "medium":
        difficultyClass += " bg-yellow-100 text-yellow-600";
        break;
      case "hard":
        difficultyClass += " bg-red-100 text-red-800";
        break;
      default:
        difficultyClass += " bg-gray-100 text-gray-800";
        break;
    }

    return difficultyClass;
  }

  function ProblemTableHead() {
    const thClass =
      "px-6 py-3 text-xs font-medium tracking-wider text-left uppercase";

    return (
      <thead className="text-sm text-white uppercase border-b">
        <tr className="font-bold text-left">
          <th scope="col" className={`${thClass} max-w-[20px]`}>
            Status
          </th>
          <th scope="col" className={`${thClass} max-w-[200px]`}>
            Title
          </th>
          <th scope="col" className={`${thClass} max-w-[200px] text-center`}>
            Difficulty
          </th>
          <th scope="col" className={`${thClass} max-w-[200px] text-center`}>
            Challange
          </th>
        </tr>
      </thead>
    );
  }

  function ProblemRow({ problem, index }) {
    const tdClass = "px-5 py-5 whitespace-nowrap overflow-x-auto text-white";
    var solvedProblems = [];

    if (user) {
      solvedProblems = user.problemsSolved ? user.problemsSolved : [];
    }

    return (
      <tr className={getClassNamesForIndex(index)}>
        <td className={`${tdClass} flex justify-center`}>
          {solvedProblems.includes(problem.name) ? (
            user.problemsSolved.includes(problem.name) && (
              <BsCheckCircle
                fontSize={"18"}
                width="18"
                className="text-green-500"
              />
            )
          ) : (
            <FaRegCircle fontSize={"18"} width="18" className="text-gray-500" />
          )}
        </td>
        <td className={`${tdClass}`}>
          <Link
            to={`/problem/${problem.name}`}
            className="cursor-pointer hover:text-blue-400"
          >
            {problem.title}
          </Link>
        </td>
        <td className={`${tdClass} text-center`}>
          <div className={`${getClassNamesForDifficulty(problem.difficulty)}`}>
            {problem.difficulty}
          </div>
        </td>
        <td className={`${tdClass}`}>
          <Link to="/" />
        </td>
      </tr>
    );
  }

  return (
    <div className="relative px-5 bg-dark-1 min-w-[900px] max-w-[1000px] font-mono">
      <div className="flex flex-col items-center justify-center w-full mt-6 text-sm">
        {/* TODO */}
        <input
          type="search"
          className="hidden w-full py-3 mx-auto mb-4 text-black border-0 rounded-full px-7 bg-black-layer-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Search..."
        />
      </div>
      <table className="w-full mx-auto text-base text-left border-collapse min-w-[400px] rounded-t-lg overflow-hidden">
        <ProblemTableHead />
        <tbody className="text-white">
          {problems.map((problem, index) => (
            <ProblemRow problem={problem} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
