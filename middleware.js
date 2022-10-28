export function middleware(req) {
  console.log(req);
  const { geo, ip, userAgent } = req;
  console.log(geo, ip, ua);
}
