import { getAvatarColor, getInitials } from "@/lib/avatar-color";
import { cn } from "@/lib/utils";

type InitialsAvatarProps = {
  name: string;
  size?: number;
  className?: string;
};

export const InitialsAvatar = ({ name, size = 96, className }: InitialsAvatarProps) => {
  return (
    <div
      className={cn("flex shrink-0 items-center justify-center rounded-full font-semibold text-white select-none", className)}
      style={{ width: size, height: size, backgroundColor: getAvatarColor(name), fontSize: size * 0.38 }}
    >
      {getInitials(name)}
    </div>
  );
};
