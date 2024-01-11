import NavBar from "../components/NavBar";
import ProblemTable from "../components/ProblemTable";
import problem1 from "../to_delete";

export default function Home() {
  return (
    <div className="h-full bg-dark">
      <NavBar />
      <ProblemTable problems={problem1}/>
    </div>
  );
}
