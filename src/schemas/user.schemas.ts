import { z } from "zod";

import {
	createSchema,
	emailSchema,
	jwtSchema,
} from "../helpers/schema.helpers";

const passwordSchema = z
	.string()
	.min(4, "Password must be at least 8 characters long");

export const [userSansMetaSchema, userSchema] = createSchema({
	email: emailSchema,
	name: z.string(),
	password: passwordSchema,
});

export const userSansPasswordSchema = userSchema.omit({
	password: true,
});
export type UserSansMeta = z.infer<typeof userSansMetaSchema>;

export type User = z.infer<typeof userSchema>;
export type UserSansPassword = z.infer<typeof userSansPasswordSchema>;

export const loggedInUserSchema = userSchema
	.omit({ password: true })
	.extend({ token: jwtSchema });

export type LoggedInUser = z.infer<typeof loggedInUserSchema>;
