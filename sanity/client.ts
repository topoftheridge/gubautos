import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "y2zf7jkl",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
