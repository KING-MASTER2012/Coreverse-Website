const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL ?? "coreverseengine@gmail.com";
const SENDER_NAME = process.env.BREVO_SENDER_NAME ?? "CoreVerse Engine";

type SendWelcomeEmailParams = {
  email: string;
  username: string;
  subject: string;
  bodyHtml: string;
};

type SendPasswordResetEmailParams = {
  email: string;
  subject: string;
  bodyHtml: string;
};

export const sendWelcomeEmail = async ({ email, username, subject, bodyHtml }: SendWelcomeEmailParams): Promise<void> => {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("[sendWelcomeEmail] BREVO_API_KEY is not set");
    return;
  }

  try {
    const response = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email, name: username }],
        subject,
        htmlContent: bodyHtml,
      }),
    });

    const body = await response.text();
    console.log(`[sendWelcomeEmail] Brevo ${response.status}:`, body);
  } catch (err) {
    console.error("[sendWelcomeEmail] fetch failed:", err);
  }
};

export const sendPasswordResetEmail = async ({ email, subject, bodyHtml }: SendPasswordResetEmailParams): Promise<void> => {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("[sendPasswordResetEmail] BREVO_API_KEY is not set");
    return;
  }

  try {
    const response = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email }],
        subject,
        htmlContent: bodyHtml,
      }),
    });

    const body = await response.text();
    console.log(`[sendPasswordResetEmail] Brevo ${response.status}:`, body);
  } catch (err) {
    console.error("[sendPasswordResetEmail] fetch failed:", err);
  }
};
