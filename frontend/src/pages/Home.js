import NavBar from "../components/NavBar";
import ProblemTable from "../components/ProblemTable";
import useGet from "../hooks/useGet";

export default function Home() {
  const { data: problems, loading, error } = useGet("/api/problemset");

  if (problems) {
    return (
      <div className="h-screen bg-dark-1">
        <NavBar />
        <ProblemTable problems={problems} />
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
}
