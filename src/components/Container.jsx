/** @format */

import {
  useMemo,
  useRef,
  useState,
  Fragment,
  useEffect,
  useCallback,
} from "react";
import ReactPropTypes from "prop-types";
import JoditEditor from "jodit-react";

export const Container = ({
  startListening,
  stopListening,
  listening,
  transcription,
}) => {
  const editor = useRef();
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      placeholder: "Start typing...",
      toolbarAdaptive: false,
      buttons: "bold,italic,underline,|,ul,ol,|,font,fontsize,|,align",
      buttonsXS: "bold,italic,underline,|,ul,ol,|,font,fontsize,|,align",
      textAlign: "left",
      language: "es",
    }),
    []
  );

  const updateEditorContent = useCallback(() => {
    if (transcription) {
      const transWithoutLineBreaks = transcription.replaceAll(/\n/g, "");
      const currentNotas = editor.current?.value || "";
      const updatedNotas = `${currentNotas.replaceAll(
        /<\/?p>/g,
        " "
      )}${transWithoutLineBreaks} `;

      setContent(updatedNotas);
      const editorInstance = editor;
      console.log(editorInstance)
      // setTimeout(() => {
      //   editorInstance.setSelectionEnd(
      //     content.length + transcription.length,
      //     content.length + transcription.length
      //   );
      // }, 3);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcription]);

  useEffect(() => {
    updateEditorContent();
  }, [updateEditorContent]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <Fragment>
      {listening ? (
        <button onClick={stopListening}>Stop</button>
      ) : (
        <button onClick={startListening}>Start</button>
      )}
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onChange={(newContent) => handleEditorChange(newContent)}
      />
    </Fragment>
  );
};

Container.propTypes = {
  startListening: ReactPropTypes.func.isRequired,
  stopListening: ReactPropTypes.func.isRequired,
  listening: ReactPropTypes.bool.isRequired,
  transcription: ReactPropTypes.string.isRequired,
};
