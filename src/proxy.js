import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({ headers: request.headers });
  const user = session?.user;

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    loginUrl.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard",
    "/add-studio",
    "/my-listing",
    "/my-bookings",
    "/studios/:id",
    "/studios/edit/:id",
  ],
}
