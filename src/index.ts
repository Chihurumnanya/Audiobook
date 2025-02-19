import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB } from './config/databaseConfig';



dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the PDF & Audio Converter API!");
});


app.get("/api/status", (req: Request, res: Response) => {
  res.json({ message: "API is up and running!" });
});

const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      console.log(`AudioBook server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
