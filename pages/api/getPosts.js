import { getServerSession } from "../../lib/authControllers";
import { aggregate } from "../../lib/dbApi";

const handler = async (req, res) => {
  const { method } = req;

  if (method !== "POST")
    return res.status(400).json({
      status: "Error",
      message: "Invalid req method!, route expects POST request!",
    });

  const session = getServerSession;
  //   aggregate posts

  /* TODO:
1. get recent post by geo location
2. get recent post of user if logged in
3. get recent post from verified news outlet 
4. get recent post that has the most engagements 
5. get recent post that have similar keywords 
6. get recent posts that have similar hashtags and tags
7. get posts with media 
 */

  const response = await aggregate("Post", [
    {
      $match: {},
      $group: {
        _id: { $and: { $verifiedAuthor: true } },
      },
      $sort: { createdAt: -1 },
    },
  ]);
};
export default handler;
