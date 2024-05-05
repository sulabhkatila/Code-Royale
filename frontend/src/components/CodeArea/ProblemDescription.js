export default function ProblemDescription({ problem }) {
  function getClassNamesForDifficulty(difficulty) {
    let difficultyClass =
      "inline-block rounded-[20px] bg-opacity-[.15] px-2.5 py-1 text-sm font-medium capitalize";

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

  function ProblemNav() {
    return (
      <div className="flex items-center w-full h-12 pt-2 font-mono text-white bg-dark-1">
        <div className="flex min-w-[300px]">
          <div
            className={
              "bg-dark-2 rounded-t-[5px] px-5 py-[10px] text-sm cursor-pointer mx-0 flex-1 text-center"
            }
          >
            Description
          </div>
          <div
            className={
              "bg-dark-2 rounded-t-[5px] px-5 py-[10px] text-sm cursor-pointer mx-1 flex-1 text-center"
            }
          >
            Solution
          </div>
        </div>
      </div>
    );
  }

  function Problem({ problem }) {
    return (
      <div className="flex px-0 pt-5 pb-4 min-w-[400px]">
        <div className="px-5">
          <div className="w-full">
            <div className="flex-1 mr-2 text-xl font-medium text-white">
              {problem.title}
            </div>
            <div className="flex-col items-center mt-3">
              <div className="flex pb-5">
                <div
                  className={`${getClassNamesForDifficulty(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </div>
              </div>
              <div className="text-white text-m">
                <div
                  dangerouslySetInnerHTML={{ __html: problem.description }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function ProblemExample({ problem }) {
    return (
      <div className="p-5 min-w-[400px]">
        {problem.example.map((eg, index) => (
          <div key={index}>
            <div className="font-medium text-white ">Example {index + 1}: </div>
            <div className="px-5 py-3 my-4 leading-7 text-gray-300 bg-gray-100 rounded-lg text-m bg-opacity-10">
              <p className="">
                <strong className="text-white">Input: </strong>{" "}
                <pre className="" dangerouslySetInnerHTML={{ __html: eg[0] }} />
              </p>
              <p className="mt-2">
                <strong className="text-white">Output:</strong>{" "}
                <p className="">{eg[1]}</p>
              </p>
              {eg[2] && (
                <p className="mt-2">
                  <strong className="text-white">Explanation:</strong>{" "}
                  <p className="">{eg[2]}</p>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-screen overflow-x-auto overflow-y-auto font-mono text-light-gray bg-dark-2">
      <ProblemNav />

      <Problem problem={problem} />

      <ProblemExample problem={problem} />

      <div className="pb-4 mx-5 mb-5">
        <div className="font-medium text-white text-m">Note:</div>
        <ul className="ml-5 text-white list-disc ">
          {problem.notes.map((note, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: note }}></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
