import { hashPassword, requestData } from "../../../lib/authControllers";
import { create, findOne } from "../../../lib/model";

const handler = async (req, res) => {
  const { method } = req;

  if (method !== "POST")
    return res.status(400).json({
      status: "Error",
      message: "Invalid req method!, route expects POST request!",
    });

  const { displayName, username, password } = req.body;
  const { ip, timezone, city, country, latitude, longitude } = requestData(req);

  if (!displayName || !username || !password)
    return res.status(400).json({
      status: "Error",
      message: "Incomplete credentials!",
    });

  try {
    // check if username has been taken
    const existingUser = await findOne("Users", {
      username: username.toLowerCase(),
    });

    if (existingUser?.data.length > 0)
      return res.status(409).json({
        status: "Error",
        message: "Username has already been taken",
      });

    //  create a new user
    const modifiedPass = await hashPassword(password);

    const data = await create("Users", {
      username: username.toLowerCase(),
      password: modifiedPass,
      displayName,
      userIp: ip,
      userLatitude: parseFloat(latitude),
      userLongitude: parseFloat(longitude),
      userCountry: country,
      userCity: city,
      userTimezone: timezone,
    });

    return res.status(201).json({
      status: "Success",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

export default handler;
