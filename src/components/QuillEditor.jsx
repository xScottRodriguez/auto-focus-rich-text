/** @format */
import "react-quill/dist/quill.snow.css";
import ReactProptypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import QuillToolbar, { formats, modules } from "./EditorToolBar";

export const QuillEditor = ({
  transcription,
  listening,
  stopListening,
  startListening,
}) => {
  const editor = useRef();
  const [editorData, setEditorData] = useState(transcription);

  useEffect(() => {
    const updatedContent = `${editorData.replaceAll(
      /<\/?p>/g,
      " "
    )} ${transcription}`;
    setEditorData(updatedContent);
    const editorInstance = editor.current.getEditor();
    setTimeout(() => {
      editorInstance.setSelection(
        editorData.length + transcription.length,
        editorData.length + transcription.length
      );
    }, 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcription]);

  return (
    <div className="text-editor">
      {listening ? (
        <button style={{marginBottom:20}} onClick={stopListening}>Stop</button>
      ) : (
        <button style={{marginBottom:20}} onClick={startListening}>Start</button>
      )}
      <QuillToolbar />
      <ReactQuill
        className="quill-editor"
        style={{ height: "100%" }}
        ref={editor}
        theme="snow"
        value={editorData}
        onChange={setEditorData}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};
QuillEditor.propTypes = {
  startListening: ReactProptypes.func.isRequired,
  stopListening: ReactProptypes.func.isRequired,
  listening: ReactProptypes.bool.isRequired,
  transcription: ReactProptypes.string.isRequired,
};
