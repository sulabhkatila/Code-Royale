import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import CodeArena from "./CodeArena";


export default function WorkSpace({ problem }) {
  return (
    <div className="w-screen h-screen bg-dark">
      <Split
        direction="horizontal"
        className="split"
        sizes={[50, 50]}
        minSize={0}
      >
        <ProblemDescription problem={problem} />
        <CodeArena problem={problem} />
      </Split>
    </div>
  );
}
