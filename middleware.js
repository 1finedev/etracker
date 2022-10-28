import { NextResponse } from "next/server";

export function middleware(req, res) {
  console.log(req);
  const { geo, ip, userAgent } = req;
  console.log(geo, ip, userAgent);
  return NextResponse.next();
}
