import NavBar from "../components/NavBar";
import ProblemTable from "../components/ProblemTable";
import problem1 from "../to_delete";

export default function Home() {
  return (
    <div className="h-screen bg-dark-1">
      <NavBar />
      <ProblemTable problems={problem1}/>
    </div>
  );
}
