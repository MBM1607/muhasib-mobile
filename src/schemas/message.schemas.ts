import { z } from "zod";

export const messageSchema = z.strictObject({
	message: z.string(),
	sentAt: z.date(),
	type: z.enum(["question", "answer"]),
});

export const messagesSchema = z.array(messageSchema);

export type Message = z.infer<typeof messageSchema>;
export type Messages = Message[];
