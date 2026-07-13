"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/supabase/client";

export type CurrentUser = {
  id: string;
  email: string;
  username: string;
};

type UseCurrentUserResult = {
  user: CurrentUser | null;
  isLoading: boolean;
};

const buildCurrentUser = (authUser: User): CurrentUser => {
  const email = authUser.email ?? "";
  const metadataUsername = authUser.user_metadata.username;
  const username =
    typeof metadataUsername === "string" && metadataUsername.length > 0 ? metadataUsername : email.split("@")[0] || "?";

  return { id: authUser.id, email, username };
};

export const useCurrentUser = (): UseCurrentUserResult => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) return;
      setUser(data.user ? buildCurrentUser(data.user) : null);
      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? buildCurrentUser(session.user) : null);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, isLoading };
};
