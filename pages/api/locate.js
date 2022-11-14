const handler = async (req, res) => {
  const ip =
    req.headers["x-forwarded-for"].split(/, /)[0] ||
    req.connection.remoteAddress;
  const latitude = req.headers["x-vercel-ip-latitude"].split(/, /)[0];
  const longitude = req.headers["x-vercel-ip-longitude"].split(/, /)[0];
  const country = req.headers["x-vercel-ip-country"].split(/, /)[0];
  const city = req.headers["x-vercel-ip-city"].split(/, /)[0];
  const timezone = req.headers["x-vercel-ip-timezone"].split(/, /)[0];

  console.log(ip, latitude, longitude, country, city, timezone);

  res.status(200).json({
    ip,
    latitude,
  });
};

export default handler;
