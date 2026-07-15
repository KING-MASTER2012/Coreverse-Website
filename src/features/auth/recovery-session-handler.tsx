"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";

type Status = "processing" | "no-hash" | "failed";

export const RecoverySessionHandler = () => {
  const [status, setStatus] = useState<Status>("processing");

  useEffect(() => {
    const hash = window.location.hash;
    console.log("[RecoverySessionHandler] mounted, hash present:", Boolean(hash), hash);

    if (!hash.includes("access_token")) {
      console.log("[RecoverySessionHandler] no access_token in hash, nothing to process");
      setStatus("no-hash");
      return;
    }

    const params = new URLSearchParams(hash.slice(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type = params.get("type");

    console.log("[RecoverySessionHandler] parsed hash", {
      hasAccessToken: Boolean(accessToken),
      hasRefreshToken: Boolean(refreshToken),
      type,
    });

    if (!accessToken || !refreshToken) {
      setStatus("no-hash");
      return;
    }

    const supabase = createClient();

    supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }).then(({ data, error }) => {
      console.log("[RecoverySessionHandler] setSession result", {
        error: error?.message,
        hasSession: Boolean(data.session),
      });

      if (error || !data.session) {
        setStatus("failed");
        return;
      }

      console.log("[RecoverySessionHandler] session established, reloading without hash");
      window.location.replace(window.location.pathname);
    });
  }, []);

  if (status === "failed") {
    console.error("[RecoverySessionHandler] could not establish session from recovery link");
  }

  return null;
};
