/** @format */

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import SpeechRecognitionProvider from "./HOC/SpeachHOC";
import { Container } from "./components/Container";
import { DraftEditor } from "./components/DraftEditor";
import { QuillEditor } from "./components/QuillEditor";

function App() {
  return (
    <main>
      <header>  
        <img src={reactLogo} className="react-logo" alt="logo" />
        <img src={viteLogo} className="vite-logo" alt="logo" />
        <h1>React + Vite + Jodit + SpeechRecognition</h1>
      </header>
      <SpeechRecognitionProvider>
        {({ listening, transcription, startListening, stopListening }) => (
          <Container
            startListening={startListening}
            stopListening={stopListening}
            listening={listening}
            transcription={transcription}
          />
        )}
      </SpeechRecognitionProvider>

          <hr />
      <SpeechRecognitionProvider>
        {({ listening, transcription, startListening, stopListening }) => (
          <DraftEditor
            startListening={startListening}
            stopListening={stopListening}
            listening={listening}
            transcription={transcription}
          />
        )}
      </SpeechRecognitionProvider>
      <hr />
      
      <SpeechRecognitionProvider>
        {({ listening, transcription, startListening, stopListening }) => (
          <QuillEditor
            startListening={startListening}
            stopListening={stopListening}
            listening={listening}
            transcription={transcription}
          />
        )}
      </SpeechRecognitionProvider>



          


    </main>
  );
}

export default App;
