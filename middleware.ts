import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PATH: any = { "/login": true, "/forgot-password": true };

const PATH: any = ["/payment", "/learn-page", "/my-course"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("kosei-token");
  const url = request.nextUrl.clone();

  const isMatchAuthPath = AUTH_PATH[request.nextUrl.pathname];

  const isMatchPath = PATH.find(
    (path: string) => request.nextUrl.pathname === path
  );
  if (token) {
    if (isMatchAuthPath) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!token && isMatchPath) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/payment", "/learn-page", "/my-course"],
};
