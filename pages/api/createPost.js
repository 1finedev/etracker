import { getServerSession, requestData } from "./../../lib/authControllers";
import { create } from "../../lib/model";
const slugify = require("slugify");

const handler = async (req, res) => {
  const { method } = req;

  if (method !== "POST")
    return res.status(400).json({
      status: "Error",
      message: "Invalid req method!, route expects POST req",
    });
  const { city, country, latitude, longitude } = requestData(req);

  const session = await getServerSession(req, res);
  console.log(session); // check if session is working...

  if (!session)
    return res.status(400).json({
      status: "Error",
      message: "Please login to create a post!",
    });

  // create a new post...
  try {
    const { title, content } = req.body;

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
      slug: slugify(title, { lower: true }),
      title,
      content,
      author: session.user._id,
      city,
      country,
      latitude,
      longitude,
    });

    res.status(201).json({
      status: "Success",
      newPost,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: error.message,
    });
  }
};

export default handler;
