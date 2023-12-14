import { z } from "zod";

export const duaSchema = z.strictObject({
	id: z.number(),
	english: z.string(),
	urdu: z.string(),
	arabic: z.string(),
	reference: z.string(),
	category: z.string(),
});

export const duasSchema = z.array(duaSchema);

export type Dua = z.infer<typeof duaSchema>;
export type Duas = z.infer<typeof duasSchema>;
