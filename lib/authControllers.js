import bcrypt from "bcryptjs";
import crypto from "crypto";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

export const correctPassword = async (candidatePassword, userPassword) => {
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
