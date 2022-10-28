import { NextResponse, NextRequest } from "next/server";

export function middleware() {
  console.log(NextRequest);
  const { geo, ip, userAgent } = NextRequest;
  console.log(geo, ip, userAgent);
  return NextResponse.next();
}
