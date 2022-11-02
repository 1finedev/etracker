import { getServerSession, requestData } from "./../../lib/authControllers";
import { create } from "../../lib/dbApi";
import ip2location from "ip-to-location";

const handler = async (req, res) => {
  const { method } = req;

  if (method !== "POST")
    return res.status(400).json({
      status: "Error",
      message: "Invalid req method!, route expects POST req",
    });
  const { ip, timezone, city, country, latitude, longitude } = requestData();

  const session = getServerSession(req, res);
  console.log(session); // check if session is working...

  if (!session)
    return res.status(400).json({
      status: "Error",
      message: "Please login to create a post!",
    });

  // create a new post...
  try {
    const { title, content, verified } = req.body;

    if (!title || !content)
      return res.status(400).json({
        status: "Error",
        message: "Please provide title and content",
      });

    if (typeof title !== "string" && typeof content !== "string")
      return res.status(400).json({
        status: "Error",
        message: "Invalid post data",
      });

    const newPost = await create("Post", {
      title,
      content,
      createdAt: new Date(Date.now()),
      author: session.user._id,
      // verifiedAuthor: session.user.verified ? true : false,
      verifiedAuthor: verified ? true : false,
      city,
      country,
      latitude,
      longitude,
    });

    res.status(201).json({
      status: "Success",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: error.message,
    });
  }
};

export default handler;
