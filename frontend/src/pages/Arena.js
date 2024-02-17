import { useParams } from "react-router-dom";
import Split from "react-split";
import ProblemDescription from "../components/ProblemDescription";
import WorkSpace from "../components/WorkSpace";
import useGet from "../hooks/useGet";

export default function Arena() {
  const { problem: problemName } = useParams();
  const { data: problem, loading, error } = useGet(`/api/problem/${problemName}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (problem) {
    return (
      <div className="w-screen h-screen bg-dark">
        <Split direction="horizontal" className="split" sizes={[50, 50]} minSize={0}>
          <ProblemDescription problem={problem} />
          <WorkSpace problem={problem} />        
        </Split>
      </div>
    );
  }
}
