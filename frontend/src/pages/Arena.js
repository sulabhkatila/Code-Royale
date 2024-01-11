import { useParams } from "react-router-dom";
import Split from "react-split";
import ProblemDescription from "../components/ProblemDescription";
import WorkSpace from "../components/WorkSpace";
import useGet from "../hooks/useGet";
import { useEffect, useState } from "react";

// I
import problem1 from "../to_delete";

export default function Arena() {
  const { problem: problemName } = useParams();

  // I
  const problem = problem1;

  return (
    <div className="w-screen h-screen bg-dark">
      <Split direction="horizontal" className="split" sizes={[50, 50]} minSize={0}>
        <ProblemDescription problem={problem} />
        <WorkSpace problem={problem} />        
      </Split>
    </div>
  );
}
