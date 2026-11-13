import crypto from "crypto";

export const generateHmacSignature = (data: string, secret: string): string => {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
};
