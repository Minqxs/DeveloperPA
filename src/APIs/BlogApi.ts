// src/apis/blog.ts
import axios from "axios";
import { z } from "zod";
import { BlogPostSchema } from "../types";

export async function getBlogPosts(limit: number = 3) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
  );
  return z.array(BlogPostSchema).parse(res.data);
}
