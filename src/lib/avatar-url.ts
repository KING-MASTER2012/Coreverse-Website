export const getAvatarUrl = (userId: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${baseUrl}/storage/v1/object/public/avatars/${userId}/avatar.webp`;
};
