"use client";

import { useEffect } from "react";
import { createClient } from "@/supabase/client";

export const RecoverySessionHandler = () => {
  useEffect(() => {
    const hash = window.location.hash;

    if (!hash.includes("access_token")) {
      return;
    }

    const params = new URLSearchParams(hash.slice(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (!accessToken || !refreshToken) {
      return;
    }

    const supabase = createClient();

    supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }).then(({ data, error }) => {
      if (error || !data.session) {
        console.error("[RecoverySessionHandler] could not establish session from recovery link:", error?.message);
        return;
      }

      window.location.replace(window.location.pathname);
    });
  }, []);

  return null;
};
