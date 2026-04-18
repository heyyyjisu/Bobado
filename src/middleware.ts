import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  if (!req.cookies.get("token")) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    return NextResponse.next();
  }
}
export const config = {
  matcher: ["/todos/:path*"],
};
