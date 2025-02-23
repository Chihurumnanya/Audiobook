import { Router, Request, Response } from "express";
import { processPdfFile } from "../services/pdfService";
import { authUser } from "../middleWare/authUser";

const pdfRouter = Router();

pdfRouter.post("/upload-pdf", authUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const extractedText = await processPdfFile(req);
    res.status(200).json({ extractedText });
  } catch (error: any) {
    console.error("PDF upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default pdfRouter;
