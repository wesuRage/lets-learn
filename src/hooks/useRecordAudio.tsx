import axios from "axios";
import { useState, useRef } from "react";
import { blobToBase64 } from "@/utils/blobToBase64";

export const useRecordAudio = () => {
  // State to hold the media recorder instance
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const [text, setText] = useState<string>();

  // State to track whether recording is currently in progress
  const [recording, setRecording] = useState(false);

  // Ref to store audio chunks during recording
  const chunks = useRef<Blob[]>([]);

  const getText = async (base64data: any) => {
    try {
      const response = await axios.post(
        "/api/stt",
        JSON.stringify({
          audio: base64data,
        }),
        { headers: { "Content-Type": "application/json" } }
      );

      const { text } = response.data;
      console.log(response.data);
      setText(text);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to start the recording
  const startRecording = async () => {
    try {
      // Request audio stream only when starting the recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);

      // Reset chunks array and set up media recorder events
      chunks.current = [];

      mediaRecorder.ondataavailable = (ev: BlobEvent) => {
        chunks.current.push(ev.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
        blobToBase64(audioBlob, getText);
        stream.getTracks().forEach((track) => track.stop()); // Stop the audio stream to release the microphone
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  // Function to stop the recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setMediaRecorder(null); // Clear the media recorder instance
    }
  };

  return { recording, startRecording, stopRecording, text };
};
