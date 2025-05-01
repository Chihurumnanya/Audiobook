import fs from "fs";
import axios from "axios";
import path from "path";
import { GeneratedAudio } from "../models/GeneratedAudioModel";

const AUDIO_OUTPUT_DIR = path.join(__dirname, "../Documents/audioOutputs");
 if (!fs.existsSync(AUDIO_OUTPUT_DIR)) {
   fs.mkdirSync(AUDIO_OUTPUT_DIR, { recursive: true });
}

/**
* Converts input text to audio using AWS Polly.
* Saves the generated audio file and its metadata in the GeneratedAudio model.
*/

export const convertTextToAudio = async (text: string, outputFileName: string, userId?: string): Promise<string> => {
    const API_URL = "https://api-inference.huggingface.co/models/espnet/kan-bayashi_ljspeech_vits";
    const headers = {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json",
    };
  
    try {
      const response = await axios.post(
        API_URL,
        { inputs: text },
        { headers, responseType: "arraybuffer" }
      );
  
      const filePath = path.join(AUDIO_OUTPUT_DIR, `${outputFileName}.wav`);
      fs.writeFileSync(filePath, response.data);

      const duration = undefined;

      await GeneratedAudio.create({
        originalName: `${outputFileName}.wav`,
        filePath,
        inputText: text,
        language: "en", 
        voice: "vits-default", 
        duration,
        userId,
      });

      return filePath;
    } catch (error: any) {
      console.error("Text-to-Speech error:", error.response?.data || error.message);
      throw new Error("Failed to convert text to speech");
    }
  };