import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: "http://localhost:4001/graphql", token: "77c18d4bea9f1a3e5553bc63897b57e9cc37b3dd", queries,  });
export default client;
  