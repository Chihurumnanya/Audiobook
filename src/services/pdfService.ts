import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import { Document } from "../models/fileModel";

// Define the uploads directory for PDFs.
const PDF_UPLOADS_DIR = path.join(__dirname, "../Documents/pdfUploads");

// Ensure the PDF uploads directory exists.
if (!fs.existsSync(PDF_UPLOADS_DIR)) {
  fs.mkdirSync(PDF_UPLOADS_DIR, { recursive: true });
}

// Configure Multer storage for PDF uploads.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PDF_UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

export const processPdfFile = async (req: Request): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const singleUpload = upload.single("pdf");
    singleUpload(req, {} as Response, async (err: any) => {
      if (err) {
        return reject(err);
      }
      if (!req.file) {
        return reject(new Error("No file uploaded"));
      }
      try {
        const fileBuffer = fs.readFileSync(req.file.path);
        // Use pdf-parse to extract text from the PDF.
        const parsedData = await pdfParse(fileBuffer);
        const extractedText = parsedData.text;
        
        const userId = (req as any).user ? (req as any).user.id : null;
        
        // Store the file metadata and extracted text in the Document model.
        await Document.create({
          originalName: req.file.originalname,
          filePath: req.file.path,
          extractedText: extractedText,
          userId: userId,
        });
        
        resolve(extractedText);
      } catch (error: any) {
        console.error("Error processing PDF file:", error);
        reject(new Error("Failed to process PDF file"));
      }
    });
  });
};
