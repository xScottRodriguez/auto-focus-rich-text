// Función para limpiar la transcripción de voz y eliminar etiquetas HTML innecesarias
export const cleanTranscription = (transcription) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = transcription;
  return tempDiv.textContent || tempDiv.innerText || "";
};
