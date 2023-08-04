/** @format */

import { CKEditor } from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import ReactPropTypes from "prop-types";
import { useState, useEffect } from "react";
export const DraftEditor = ({ transcription }) => {
  const [editorData, setEditorData] = useState(transcription);

  useEffect(() => {
    
    setEditorData(editorData.replaceAll(/<\/?p>/g, " ") + " " + transcription);
  }, [transcription]);

  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorData}
      config={{
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "bulletedList",
          "numberedList",
          "|",
          "link",
          "blockQuote",
          "|",
          "alignment",
        ],
        forceEnterMode: true,
        locale: "es",
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setEditorData(data);
      }}
    />
  );
};

DraftEditor.propTypes = {
  startListening: ReactPropTypes.func.isRequired,
  stopListening: ReactPropTypes.func.isRequired,
  listening: ReactPropTypes.bool.isRequired,
  transcription: ReactPropTypes.string.isRequired,
};
