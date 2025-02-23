import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import axios from "axios";
import { Document } from "../models/fileModel";

const UPLOADS_DIR = path.join(__dirname, "../Documents/audioUploads");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
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

        console.log("File read successfully, calling Wit.ai...");
        const response = await axios.post(
          "https://api.wit.ai/message?v=20250221&q=i%20did%20like%20a%20Audio%20to%20Text%20Conversion",
          audioBuffer,
          {
            headers: {
              "Content-Type": "audio/mpeg",
              "Authorization": `Bearer ${process.env.WIT_AI_TOKEN}`,
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
