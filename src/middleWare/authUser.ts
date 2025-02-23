import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../config/token";

export const authUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "Authorization header missing" });
      return;
    }

    // Expected format: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Token not provided" });
      return;
    }

    const verifiedToken = verifyToken(token);
    if (!verifiedToken?.valid) {
      res.status(401).json({ error: "Token verification failed" });
      return;
    }

    // Attach decoded token data to req and res.locals.
    (req as any).user = verifiedToken.decoded;
    res.locals.user = verifiedToken.decoded;

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ error: "Error authorizing user." });
    return;
  }
};
