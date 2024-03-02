import NavBar from "../components/NavBar";
import ProblemTable from "../components/ProblemTable";
import useGet from "../hooks/useGet";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Home() {
  let query = useQuery();
  const {
    data: problems,
    loading,
    error,
  } = useGet(`/api/problemset${query ? `?${query}` : ""}`);

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
