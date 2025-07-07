import axios from "axios";
import { z } from "zod";
import { BlogPostSchema } from "../types";

export async function getBlogPosts() {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  return z.array(BlogPostSchema).parse(res.data);
}

export async function getUserBlogPosts(userId: number) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${userId}}`
  );
  return z.array(BlogPostSchema).parse(res.data);
}
