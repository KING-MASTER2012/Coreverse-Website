import { randomBytes } from "crypto";

export const generateRandomPassword = (): string => randomBytes(24).toString("base64url");
