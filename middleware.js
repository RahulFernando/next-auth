import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("Middleware", req.nextUrl.pathname);
    console.log("Middleware", req.nextauth.token.role);

    if (
      req.nextUrl.pathname.startsWith("/create-user") &&
      req.nextauth.token.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/create-user"] };
