import { HuggingFaceInference } from "@langchain/community/llms/hf";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";

export const askQuestionFromText = async (text: string, question: string): Promise<string> => {
    try {
        if (!process.env.HUGGINGFACE_API_KEY) {
            throw new Error("HuggingFace API key not configured");
        }

        const model = new HuggingFaceInference({
            apiKey: process.env.HUGGINGFACE_API_KEY, 
            model: "google/flan-t5-xl", 
        });

        const docs = [new Document({ pageContent: text })];
        const chain = loadQAStuffChain(model);
        
        const result = await chain.call({
            input_documents: docs,
            question,
        });

        if (!result.text) {
            throw new Error("No answer generated");
        }

        return result.text;
    } catch (error) {
        console.error("AI Service Error:", error);
        throw new Error(`Question processing failed: ${error instanceof Error ? error.message : String(error)}`);
    }
};