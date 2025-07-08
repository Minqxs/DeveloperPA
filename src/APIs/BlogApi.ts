import axios from "axios";
import { z } from "zod";
import { BlogPostSchema } from "../types";
import { safeFetch } from "../helpers";

export async function getBlogPosts() {
  return await safeFetch(
    async () => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      return z.array(BlogPostSchema).parse(res.data);
    },
    [],
    "All blog posts"
  );
}

export async function getUserBlogPosts(userId: number) {
  return await safeFetch(
    async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      return z.array(BlogPostSchema).parse(res.data);
    },
    [],
    `User blog posts for userId '${userId}'`
  );
}
