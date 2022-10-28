export function middleware(req, res) {
  console.log(req);
  const { geo, ip, userAgent } = req;
  console.log(geo, ip, ua);
  return res.next();
}
