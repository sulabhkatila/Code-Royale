import { useLocation } from "react-router-dom";
import ChallangeForm from "../components/Cards/ChallangeCard";
import NavBar from "../components/NavBar";
import ProblemTable from "../components/ProblemTable";

import problem1 from "../to_delete";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Home() {
  let query = useQuery();
  const {
    data: problems,
    loading,
    error,
  } = /*useGet(`/api/problemset${query ? `?${query}` : ""}`);*/ {
    data: problem1,
    loading: false,
    error: null,
  };

  if (problems) {
    return (
      <div className="h-screen bg-dark-1">
        <NavBar />
        <div className="flex flex-row justify-between">
          <ProblemTable problems={problems} />
          <ChallangeForm />
        </div>
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
