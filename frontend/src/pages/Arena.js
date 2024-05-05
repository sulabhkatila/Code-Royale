import { useParams } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import WorkSpace from "../components/CodeArea/WorkSpace";

export default function Arena() {
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
