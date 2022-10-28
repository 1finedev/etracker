import { NextResponse, NextRequest } from "next/server";

export function middleware(req = NextRequest) {
  console.log(req);

  return NextResponse.next();
}
