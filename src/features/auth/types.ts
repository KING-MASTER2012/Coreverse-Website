export type AuthActionState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export type OAuthProvider = "google" | "github";
