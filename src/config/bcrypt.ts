import bcrypt from "bcrypt";

// Define the number of salt rounds;
const saltRounds = 10;

/**
 * Hashes a plain text password using bcrypt.
 */
const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

/**
 * Verifies a plain text password against a hashed password.
 */
const verifyPassword = async (
  hashedPassword: string,
  plainPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export { hashPassword, verifyPassword };
