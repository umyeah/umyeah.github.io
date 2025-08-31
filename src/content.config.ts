import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";
const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    description: z.string(),
    author: z.string().optional(),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    tags: z.array(z.string()),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/now" }),
  schema: z.object({
    updatedDate: z.date(),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = { blog, now };
