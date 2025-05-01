import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import { Document } from "../models/fileModel";
dotenv.config();

const UPLOADS_DIR = path.join(__dirname, "../Documents/audioUploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR); 
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

export const processAudioFile = async (req: Request): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const singleUpload = upload.single("audio");
    singleUpload(req, {} as Response, async (err: any) => {
      if (err) {
        return reject(err);
      }
      if (!req.file) {
        return reject(new Error("No file uploaded"));
      }
      try {
        console.log("Reading audio file from path:", req.file.path);
        const audioBuffer = fs.readFileSync(req.file.path);

        console.log("File read successfully, calling Hugging Face...");
        const response = await axios.post(
          "https://api-inference.huggingface.co/models/openai/whisper-large",
          audioBuffer,
          {
            headers: {
              "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
              "Content-Type": "audio/mpeg", 
            },
          }
        );
        const transcription = response.data.text;

        const userId = (req as any).user ? (req as any).user.id : null;

        await Document.create({
          originalName: req.file.originalname,
          filePath: req.file.path,
          extractedText: transcription,
          userId: userId,
        });

        resolve(transcription);
      } catch (error: any) {
        console.error("Error processing audio file:", error);
        reject(new Error("Failed to process audio file"));
      }
    });
  });
};
