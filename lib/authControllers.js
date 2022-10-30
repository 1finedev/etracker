import bcrypt from "bcryptjs";
import crypto from "crypto";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const createPasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return { resetToken, passwordResetExpires, passwordResetToken };
};

export const getServerSession = async (req, res) =>
  await unstable_getServerSession(req, res, authOptions);
