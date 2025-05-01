import { Router } from "express";
import { convertTextToAudio } from "../services/textToAudioService";

const textToAudioRouter = Router();

const handleConvertRequest = async (req: any, res: any) => {
    try {
        const { text, userId } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        const outputFileName = `audio_${Date.now()}`;
        const filePath = await convertTextToAudio(text, outputFileName, userId);
        
        return res.json({
            success: true,
            filePath
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Conversion failed" });
    }
};

// Assign the handler to the route
textToAudioRouter.post('/convert-to-audio', handleConvertRequest);

// Export the router
export { textToAudioRouter };