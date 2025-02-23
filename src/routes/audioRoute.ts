import { Router, Request, Response } from "express";
import { processAudioFile } from "../services/audioService";
import { authUser } from "../middleWare/authUser";

const audioRouter = Router();

audioRouter.post("/upload-audio", authUser, async (req: Request, res: Response): Promise<void> => {
  try {
    const transcription = await processAudioFile(req);
    res.status(200).json({ transcription });
  } catch (error: any) {
    console.error("audio upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default audioRouter;