/** @format */
import "react-quill/dist/quill.snow.css";
import ReactProptypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import QuillToolbar, { formats, modules } from "./EditorToolBar";

export const QuillEditor = ({ transcription }) => {
  const editor = useRef();
  const [editorData, setEditorData] = useState(transcription);

  useEffect(() => {
    setEditorData(editorData.replaceAll(/<\/?p>/g, " ") + " " + transcription);

    const editorInstance = editor.current.getEditor();
    setTimeout(() => {
      editorInstance.setSelection(
        editorData.length + transcription.length,
        editorData.length + transcription.length
      );
    }, 3);
    // setTimeout(() => quill.setSelection(length, length), 0); }, [transcription]);
  }, [transcription]);

  return (
    <div className="text-editor">
      <h3>asd</h3>
      <QuillToolbar />
      <ReactQuill
        ref={editor}
        theme="snow"
        value={editorData}
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
