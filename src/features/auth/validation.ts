import { z } from "zod";

type Translate = (key: string, values?: Record<string, string | number>) => string;

export const createLoginSchema = (t: Translate) =>
  z.object({
    email: z.email({ error: t("errors.emailInvalid") }),
    password: z.string().min(6, t("errors.passwordMin")),
    rememberMe: z.boolean().default(false),
  });

export const createRegisterSchema = (t: Translate) =>
  z
    .object({
      username: z
        .string()
        .min(3, t("errors.usernameMin"))
        .max(24, t("errors.usernameMax"))
        .regex(/^[a-zA-Z0-9_]+$/, t("errors.usernamePattern")),
      email: z.email({ error: t("errors.emailInvalid") }),
      password: z.string().min(6, t("errors.passwordMin")),
      confirmPassword: z.string(),
      acceptTerms: z.literal(true, { error: t("errors.acceptTermsRequired") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: t("errors.passwordMismatch"),
      path: ["confirmPassword"],
    });

export const createForgotPasswordSchema = (t: Translate) =>
  z.object({
    email: z.email({ error: t("errors.emailInvalid") }),
  });

export const createResetPasswordSchema = (t: Translate) =>
  z
    .object({
      password: z.string().min(6, t("errors.passwordMin")),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: t("errors.passwordMismatch"),
      path: ["confirmPassword"],
    });
