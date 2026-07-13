export const getInitials = (value: string): string => {
  const trimmed = value.trim();

  if (!trimmed) {
    return "?";
  }

  return trimmed.slice(0, 2).toUpperCase();
};

export const getAvatarColor = (seed: string): string => {
  const normalizedSeed = seed.trim() || "coreverse";
  let hash = 0;

  for (let index = 0; index < normalizedSeed.length; index += 1) {
    hash = normalizedSeed.charCodeAt(index) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return `oklch(0.62 0.17 ${hue})`;
};
