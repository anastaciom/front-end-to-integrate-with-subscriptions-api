import { z } from "zod";

export type TSearchSchema = z.infer<typeof searchSchema>;

export const searchSchema = z.object({
  searchPhoto: z.string().optional(),
  imageType: z
    .union([
      z.literal("all"),
      z.literal("photo"),
      z.literal("illustration"),
      z.literal("vector"),
    ])
    .optional(),
  order: z.union([z.literal("popular"), z.literal("latest")]).optional(),
});
