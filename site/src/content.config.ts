import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lectures = defineCollection({
  loader: glob({
    pattern: '**/lectures/lecture-*.md',
    base: '..',
  }),
  schema: z.object({}).passthrough(),
});

export const collections = { lectures };
