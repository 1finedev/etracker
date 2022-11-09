import { findById, find, findOne } from "../../lib/model";

const handler = async (req, res) => {
  const data = await findOne("Users", { id: 1 });
  console.log(data.data[0]);
  res.status(200).json(data);
};
export default handler;
