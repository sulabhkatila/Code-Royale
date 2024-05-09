import MonacoEditor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import Split from "react-split";
import { useSubmit } from "../../hooks/useSubmit";

export default function CodeArena({ problem }) {
  // We get ResizeObserver loop completed with undelivered notifications error
  // when resizing the split window to a certain extent
  // This error is benign and can be ignored
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (
        e.message.startsWith(
          "ResizeObserver loop completed with undelivered notifications."
        )
      ) {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);

  var userOutput = null;
  var splitSize = [100, 0];
  const codeInEditor = useRef(problem.boilerPlate.python);
  const editorRef = useRef(null); //
  const [language, setLanguage] = useState("Python");
  const { submit, data, loading, error } = useSubmit();

  async function submitSolution() {
    let solution = codeInEditor.current;
    if (language === "Python") {
      const inputs = problem.tests.map((test) => test.input);
      solution += `\n\ninputs = ${JSON.stringify(inputs)}\n`;
      console.log(inputs); ////
    }
    console.log(solution);
    await submit(problem.name, language, solution);
  }

  if (data) {
    splitSize = [30, 70];
    JSON.stringify(data);
    userOutput = data.stdout;
  }

  if (loading) {
    return (
      <div className="h-screen text-white bg-dark-1">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen text-white bg-dark-1">
        <h1>there is a error{error}</h1>
      </div>
    );
  }

  function EditorNav() {
    return (
      <div className="flex items-center w-full h-12 pt-2 text-white bg-dark-1">
        <div className="flex overflow-hidden">
          <div className="flex items-center h-8 px-5 mx-1 text-xs text-center rounded-md cursor-pointer bg-dark-2">
            <select
              className="font-mono text-xs text-white cursor-pointer bg-dark-2"
              defaultValue={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="Python"> Python </option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  function TestCases() {
    const [selectedTests, setSelectedTests] = useState(new Set());
    const [passedTests, setPassedTests] = useState(0);

    const handleClick = (test) => {
      // toggle the selected test
      // Show/Hide test case details
      const newSelectedTests = new Set(selectedTests);

      if (selectedTests.has(test)) {
        newSelectedTests.delete(test);
      } else {
        newSelectedTests.add(test);
      }

      setSelectedTests(newSelectedTests);
    };

    useEffect(() => {
      const passedCount = problem.tests.reduce((count, test, index) => {
        const testPassed = userOutput
          ? userOutput[index] === test.expected_output
          : null;
        return testPassed ? count + 1 : count;
      }, 0);
      setPassedTests(passedCount);
    }, []);

    return (
      <div className="h-full overflow-y-auto font-mono text-white bg-dark-2">
        <div className="w-full h-[40px] border-b text-white flex items-center px-2">
          Testcases
        </div>
        <div>
          {userOutput && (
            <p className="w-full h-[30px] mx-2 flex items-center mt-2">
              Passed {passedTests}/{problem.tests.length}
            </p>
          )}
        </div>
        <div className="mx-3 mt-4">
          {problem.tests.map((test, index) => {
            const testPassed = userOutput
              ? userOutput[index] === test.expected_output
              : null;

            return (
              <div key={index} className={``}>
                <button
                  onClick={() => handleClick(test)}
                  className={`flex items-center justify-center min-w-max w-full h-[40px] hover:bg-dark-1 rounded-md border-b last:border-b-0 ${
                    testPassed !== null
                      ? testPassed
                        ? "text-green-500"
                        : "text-red-500"
                      : ""
                  } ${selectedTests.has(test) ? "bg-dark-1" : "bg-dark-3"}`}
                >
                  Test {index + 1}
                </button>
                {selectedTests.has(test) && (
                  <div className="py-2 mx-3 my-4">
                    <p>Input:</p>
                    <div className="px-4 py-5 my-3 bg-dark-1.5">
                      <pre>{test.input}</pre>
                    </div>

                    <p>Expected Output:</p>
                    <div className="px-4 py-5 my-3 bg-dark-1.5">
                      <pre>{test.expected_output}</pre>
                    </div>
                    {userOutput && (
                      <div
                        className={`${
                          testPassed !== null
                            ? testPassed
                              ? "text-green-500"
                              : "text-red-500"
                            : ""
                        }`}
                      >
                        <p>Your Output:</p>
                        <div className={`px-4 py-5 my-3 bg-dark-1`}>
                          <pre>{userOutput[index]}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  function CodeEditor() {
    function handleEditorChange(value, event) {
      codeInEditor.current = value;
    }

    function handleEditorDidMount(editor, monaco) {
      if (editorRef.current) {
        return;
      }
      codeInEditor.current = editor.getValue();
      editorRef.current = editor;
    }

    function editCodeInEditor() {
      // TODO
      // use in auto formatting option
      console.log(codeInEditor.current);

      // current value
      // const unformatted = editorRef.current.getValue();
      // format
      // const formatted = prettier.format(unformatted, {parser: 'babel}, plugins: [parser], useTabs: truw, semi: true, singleQuote: false)
      // set the formatted calue back in the editor
      // editorRef.current.setValue(formatted);
    }

    return (
      <div
        className="w-full overflow-hidden"
        style={{ height: "calc(100% - 47px)" }}
      >
        <MonacoEditor
          height="100%"
          width="100%"
          defaultLanguage="python"
          theme="vs-dark"
          defaultValue={`${codeInEditor.current}`}
          options={{
            wordWrap: "on",
            minimap: { enabled: false },
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
        />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div className="w-full h-full">
        <Split
          className="h-full"
          direction="vertical"
          sizes={splitSize}
          minSize={[49, 50]}
        >
          <div className="h-full">
            <EditorNav />
            <div className="w-full h-full">
              <CodeEditor />
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <TestCases />
            <div className="mt-auto overflow-x-auto text-right border-t bg-dark-2 min-h-[50px]">
              <button
                onClick={submitSolution}
                className={`px-3 py-1 rounded-lg bg-gold my-2 mx-2 ${
                  loading ? "diabled" : ""
                }`}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </Split>
      </div>
    </div>
  );
}
