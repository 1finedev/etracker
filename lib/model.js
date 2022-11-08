import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_SECRET_KEY;

if (!supabaseUrl && !supabaseKey)
  throw new Error(
    "Please define the NEXT_PUBLIC_SUPABASE_URL & SUPABASE_SERVICE_SECRET_KEY environment variable inside .env.local"
  );

export const supabase = createClient(supabaseUrl, supabaseKey);

const getFields = (table) => {
  // post and comments share some foreign fields
  if (table === "Posts" || table === "Comments")
    return `*, author(id,verified,username,displayName,active)`;

  // we want all data for user
  if (table === "Users")
    return `id,createdAt,updatedAt,username,displayName,verified,active`;
};

export const create = async (table, body) => {
  if ((!table, !data)) throw new Error(`${table} data is required!`);
  const { data, error } = supabase.from(table).insert([body]);
  return { data, error };
};

export const find = async (table) => {
  if (!table) throw new Error("Db table is required!");
  const { data, error } = await supabase
    .from(table)
    .select(getFields(table))
    .order("id", { ascending: false });
  return { data, error };
};

export const findOne = async (table, query) => {
  if (!table || !query) throw new Error(`Please send the ${table} query!`);
  const { data, error } = await supabase
    .from(table)
    .select(getFields(table))
    .match(query)
    .limit(1);
  return { data, error };
};

export const findByIdAndDelete = async (table, id) => {
  if (!table || !id) throw new Error(`Please send the ${table} Id!`);
  const { data, error } = await supabase
    .from(table)
    .update({ deleted: true })
    .eq("id", id);
  return { data, error };
};

export const findByIdAndUpdate = async (table, id, update) => {
  if (!table || !id || update)
    throw new Error(`Table, Id and Update data are required!`);
  const { data, error } = await supabase
    .from(table)
    .update(update)
    .eq("id", id);
  return { data, error };
};

// export const aggregate = async (, aggregation) => {
//   if (! || !aggregation)
//     throw new Error("Please send the  and data argument!");
//   const response = await sendRequest({
//     type: "POST",
//     action: "aggregate",
//     ,
//     pipeline: aggregation,
//   });
//   return response;
// };
