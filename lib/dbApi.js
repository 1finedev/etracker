import axios from "axios";

// getting db credentials
const DB_URI = process.env.MONGODB_URI;
const DB_API_KEY = process.env.DB_API_KEY;
const DB_NAME = process.env.DB_NAME;
console.log(DB_API_KEY, DB_NAME, DB_URI);

if (!DB_API_KEY && !DB_URI)
throw new Error(
    "Please define the MONGODBURI & DBAPIKEY environment variable inside .env.local"
  );

//   set axios global headers
axios.defaults.timeout = 60000;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["api-key"] = DB_API_KEY;
axios.defaults.headers.common["Access-Control-Request-Headers"] = "*";

const sendRequest = async ({
  type,
  action,
  collection,
  projection,
  filter,
  data,
  sort,
  update,
}) => {
  const config = JSON.stringify({
    collection: collection,
    database: DB_NAME,
    dataSource: DB_NAME,
    ...(data && { document: data }),
    ...(filter && { filter: filter }),
    ...(projection && { projection: projection }),
    ...(sort && { sort: sort }),
    ...(update && { update: { $set: { ...update } } }),
  });

  //   formulate endpoint uri
  const uri = `${DB_URI}/action/${action}`;

  try {
    const data =
      type === "GET"
        ? await axios.get(uri, config)
        : await axios.post(uri, config);
    return data.data;
  } catch (error) {
    console.log(error);
    // send to logger
    throw new Error(error);
  }
};

export const create = async (collection, data) => {
  if (!collection || !data)
    throw new Error("Please send the collection and data argument!");

  const response = await sendRequest({
    type: "POST",
    action: "insertOne",
    collection,
    data,
  });
  return response;
};

export const find = async (collection, filter, sort) => {
  if (!collection) throw new Error("Please send the collection argument!");

  const response = await sendRequest({
    type: "POST",
    action: "find",
    collection,
    filter,
    ...(sort && { sort }),
  });
  return response;
};

export const findById = async (collection, id) => {
  if (!collection || !id)
    throw new Error("Please send the collection and id argument!");

  const response = await sendRequest({
    type: "POST",
    action: "findOne",
    collection,
    filter: { _id: { $oid: id } },
  });
  return response;
};

export const findByIdAndDelete = async (collection, id) => {
  if (!collection || !id)
    throw new Error("Please send the collection and data argument!");
  const response = await sendRequest({
    type: "POST",
    action: "deleteOne",
    collection,
    filter: { _id: { $oid: id } },
  });
  return response;
};

export const findByIdAndUpdate = async (collection, id, update) => {
  if (!collection || !id || update)
    throw new Error("Please send the collection and data argument!");
  const response = await sendRequest({
    type: "POST",
    action: "updateOne",
    collection,
    filter: { _id: { $oid: id } },
    update: { $set: { ...update } },
    upsert: true,
  });
  return response;
};

export const aggregate = async (collection, aggregation) => {
  if (!collection || !aggregation)
    throw new Error("Please send the collection and data argument!");
  const response = await sendRequest({
    type: "POST",
    action: "aggregate",
    collection,
    pipeline: aggregation,
  });
  return response;
};
