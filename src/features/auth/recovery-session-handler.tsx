"use client";

import { useEffect } from "react";
import { createClient } from "@/supabase/client";

export const RecoverySessionHandler = () => {
  useEffect(() => {
    const supabase = createClient();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        window.location.replace(window.location.pathname);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return null;
};
