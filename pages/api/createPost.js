<<<<<<< HEAD
import { getSession } from "./../../lib/authControllers";
import { create } from "../../lib/dbApi";

const handler = async (req, res) => {
  const { method } = req;

  if (method !== "POST")
    return res.status(400).json({
      status: "Error",
      message: "Invalid req method!, route expects POST req",
    });

  const session = getSession(req, res);
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
      title,
      content,
      createdAt: new Date(Date.now()),
      author: session.user._id,
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
=======
import { getSession } from "../../lib/authControllers";

const handler = async (req, res) => {
  const session = await getSession(req, res);
  console.log(session);

  res.json({
    status: "ok",
  });
>>>>>>> a74e6e5 (main)
};

export default handler;
