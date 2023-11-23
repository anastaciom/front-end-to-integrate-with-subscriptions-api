import { z } from "zod";

export type TSearchSchema = z.infer<typeof searchSchema>;

export const searchSchema = z.object({
  searchPhoto: z.string().optional(),
  imageType: z.union([
    z.literal("all"),
    z.literal("photo"),
    z.literal("illustration"),
    z.literal("vector"),
  ]),
  order: z.union([z.literal("popular"), z.literal("latest")]),
  lang: z.union([
    z.literal("cs"),
    z.literal("da"),
    z.literal("de"),
    z.literal("en"),
    z.literal("es"),
    z.literal("fr"),
    z.literal("id"),
    z.literal("it"),
    z.literal("hu"),
    z.literal("nl"),
    z.literal("no"),
    z.literal("pt"),
    z.literal("pl"),
    z.literal("ro"),
    z.literal("sk"),
    z.literal("fi"),
    z.literal("sv"),
    z.literal("tr"),
    z.literal("vi"),
    z.literal("th"),
    z.literal("bg"),
    z.literal("ru"),
    z.literal("el"),
    z.literal("ja"),
    z.literal("ko"),
    z.literal("zh"),
  ]),
});
