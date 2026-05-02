import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const target = pathname.replace(/^\/en/, "/es") || "/es";
    const url = req.nextUrl.clone();
    url.pathname = target;
    const res = NextResponse.redirect(url, 302);
    res.headers.set("x-robots-tag", "noindex, nofollow");
    return res;
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
