import "server-only";
import { createAdminClient } from "@/supabase/admin";

const AVATAR_BUCKET = "avatars";

export const uploadAvatar = async (userId: string, file: File): Promise<void> => {
  const supabase = createAdminClient();
  const path = `${userId}/avatar.webp`;

  const { error } = await supabase.storage.from(AVATAR_BUCKET).upload(path, file, {
    contentType: file.type || "image/webp",
    upsert: true,
  });

  if (error) {
    throw error;
  }
};
