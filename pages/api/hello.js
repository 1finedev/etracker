const requestIp = require("request-ip");

export default function handler(req, res) {
  const ipAddress = requestIp.getClientIp(req);
  console.log(ipAddress);
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;
  console.log(ip);
  res.status(200).json({ ip, ipAddress });
}
