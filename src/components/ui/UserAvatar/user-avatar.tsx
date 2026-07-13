"use client";

import { useState } from "react";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar/initials-avatar";
import { getAvatarUrl } from "@/lib/avatar-url";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  userId: string;
  username: string;
  size?: number;
  className?: string;
};

export const UserAvatar = ({ userId, username, size = 40, className }: UserAvatarProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <InitialsAvatar name={username} size={size} className={className} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getAvatarUrl(userId)}
      alt={username}
      className={cn("shrink-0 rounded-full object-cover", className)}
      style={{ width: size, height: size }}
      onError={() => setHasError(true)}
    />
  );
};
