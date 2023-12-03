import { z } from "zod";

export const locationSchema = z.strictObject({
	latitude: z.number(),
	longitude: z.number(),
	city: z.string(),
});

export type Location = z.infer<typeof locationSchema>;
