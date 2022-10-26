import { create } from "../../lib/dbApi";

const handler = async (req, res) => {
  const response = await create("User", { name: "Alfred", role: "Admin" });
  console.log(response);

  res.status(201).json({
    status: "success",
    data: response,
  });
};

export default handler;
