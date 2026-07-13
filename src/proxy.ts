import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/supabase/middleware";

const handleI18nRouting = createMiddleware(routing);

const proxy = async (request: NextRequest) => {
  const response = handleI18nRouting(request);
  return updateSession(request, response);
};

export default proxy;

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
