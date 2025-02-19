import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY || "defaultSecret";

// Generate a JWT for a user
const generateToken = (id: string): string => {
  const payload = { id };
  try {
    return jwt.sign(payload, secretKey, {
      expiresIn: "30d",
      algorithm: "HS256",
    });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};


// Verify a JWT
const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey, {
      algorithms: ["HS256"],
    });
    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return { valid: false, expired: true, decoded: null };
    }
    return { valid: false, expired: false, decoded: null };
  }
};

export { generateToken, verifyToken };
