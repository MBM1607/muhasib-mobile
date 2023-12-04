import { z } from "zod";

export const fastingRecordSchema = z.record(z.string(), z.boolean());

export type FastingRecord = z.infer<typeof fastingRecordSchema>;
