export function middleware(req) {
  const { geo, ip, ua } = req;
  console.log(geo, ip, ua);
}
