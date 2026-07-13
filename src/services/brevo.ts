const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

type SendWelcomeEmailParams = {
  email: string;
  username: string;
  subject: string;
  bodyHtml: string;
};

export const sendWelcomeEmail = async ({ email, username, subject, bodyHtml }: SendWelcomeEmailParams): Promise<void> => {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    return;
  }

  try {
    await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: "CoreVerse Engine", email: "no-reply@coreverse.dev" },
        to: [{ email, name: username }],
        subject,
        htmlContent: bodyHtml,
      }),
    });
  } catch {
    // Registration should not fail due to a non-critical welcome email error.
  }
};
