import { Router } from "express";
import { askQuestionFromText } from "../services/AiService";
import { Conversation } from "../models/AiModel";
import { Document } from "../models/fileModel";

const aiRouter = Router();

// Simple route handler without complex types
aiRouter.post('/ask', async (req, res) => {
    try {
        // 1. Get and validate input
        const { documentId, question, userId } = req.body;
        if (!documentId || !question) {
            res.status(400).json({ error: "documentId and question are required" });
            return;
        }

        // 2. Find document
        const doc = await Document.findByPk(documentId);
        if (!doc) {
            res.status(404).json({ error: "Document not found" });
            return;
        }

        // 3. Get text content (using type assertion)
        const docData = doc.get({ plain: true });
        const extractedText = docData.extractedText;
        if (!extractedText) {
            res.status(400).json({ error: "Document has no text content" });
            return;
        }

        // 4. Process question
        const answer = await askQuestionFromText(extractedText, question);
        
        // 5. Create conversation record
        const conversation = await Conversation.create({
            question,
            answer,
            userId
        });
        const conversationData = conversation.get({ plain: true });

        // 6. Return response
        res.json({
            success: true,
            conversationId: conversationData.id,
            question,
            answer
        });

    } catch (error: any) {
        console.error("Error:", error);
        res.status(500).json({ 
            error: "Failed to process question",
            details: error.message 
        });
    }
});

export { aiRouter };