/** @format */

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechRecognitionProvider = ({ children }) => {
  const [transcription, setTranscription] = useState("");
  const { transcript, listening, browserSupportsSpeechRecognition,finalTranscript } =
    useSpeechRecognition();

  useEffect(() => {
    if (!listening) {
      setTranscription(finalTranscript);
    }
  }, [transcript, listening, finalTranscript]);

  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("NO FUNCIONA CON TU NAVEGADOR QLERO");
      console.log({ browserSupportsSpeechRecognition });
      return;
    }
    SpeechRecognition.startListening({ language: "es-SV" });
  };

  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <>
      {children({
        listening,
        transcription,
        startListening,
        stopListening,
      })}
    </>
  );
};

SpeechRecognitionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SpeechRecognitionProvider;
