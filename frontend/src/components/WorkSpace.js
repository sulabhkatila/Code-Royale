import Split from "react-split";
import MonacoEditor from "@monaco-editor/react";
import { useRef } from "react";
////
import problem1 from "../to_delete";

export default function WorkSpace({ problem }) {
  problem = problem1[0];

  function EditorNav() {
    return (
      <div className="flex items-center w-full h-12 pt-2 text-white bg-dark-1">
        <div className="flex overflow-hidden">
          <div className="flex items-center h-8 px-5 mx-1 text-xs text-center rounded-md cursor-pointer bg-dark-2">
            <select
              className="font-mono text-xs text-white cursor-pointer bg-dark-2"
              defaultValue="Python"
            >
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  function TestCases() {
    return (
      <div>
        <div className="flex flex-col h-full bg-dark-2 text-light-gray">
          <div className="overflow-y-auto">test cases</div>
        </div>
      </div>
    );
  }

  function CodeEditor() {
    const codeInEditor = useRef(null);
    const editorRef = useRef(null); //

    function handleEditorChange(value, event) {
      codeInEditor.current = value;
    }

    function handleEditorDidMount(editor, monaco) {
      codeInEditor.current = editor.getValue();
      editorRef.current = editor;
    }

    function editCodeInEditor() {
      console.log(codeInEditor.current);

      // formatting possibly, prettier is only for javascript
      // current value
      //const unformatted = editorRef.current.getValue();
      // format
      // const formatted = prettier.format(unformatted, {parser: 'babel}, plugins: [parser], useTabs: truw, semi: true, singleQuote: false)
      // set the formatted calue back in the editor
      //editorRef.current.setValue(formatted);
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
          defaultValue={`${problem.boilerplate.python}`}
          options={{
            wordWrap: "on",
            minimap: { enabled: false },
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 17,
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
    <div className="flex flex-col w-full h-screen">
      <Split
        className="h-full"
        direction="vertical"
        sizes={[70, 30]}
        minSize={[51, 100]}
      >
        <div className="h-full">
          <EditorNav />
          <div className="w-full h-full">
            <CodeEditor />
          </div>
        </div>
        <TestCases />
      </Split>
      <div className="relative z-10 flex justify-end w-full py-2 mt-auto bg-dark-1">
        <button className="px-3 py-1 rounded-lg bg-gold">Submit</button>
      </div>
    </div>
  );
}
