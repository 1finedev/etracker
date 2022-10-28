import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { hashPassword } from "../../lib/authControllers";
import { create, find } from "../../lib/dbApi";

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log(session);
  if (!session)
    return res.status(400).json({
      status: "Error",
      message: "Invalid session",
    });
  const { method } = req;

  if (method !== "POST")
    return res.status(400).json({
      status: "Error",
      message: "Invalid req method!, route expects POST req",
    });

  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({
      status: "Error",
      message: "Incomplete credentials!",
    });

  try {
    // check if username has been taken
    const existingUser = await find("User", {
      username: username.toLowerCase(),
    });
    if (existingUser?.documents.length > 0)
      return res.status(409).json({
        status: "Error",
        message: "Username has already been taken",
      });

    // // create a new user
    const modifiedPass = await hashPassword(password);

    // get user IP from request
    const forwarded = req.headers["x-forwarded-for"];
    const ip = forwarded
      ? forwarded.split(/, /)[0]
      : req.connection.remoteAddress;

    const user = await create("User", {
      username: username.toLowerCase(),
      password: modifiedPass,
      userIp: ip,
      createdAt: new Date(Date.now()),
    });

    return res.status(201).json({
      status: "Success",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      message: error.message,
    });
  }
};

export default handler;
