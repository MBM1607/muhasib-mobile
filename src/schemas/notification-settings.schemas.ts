import { z } from "zod";

export const notificationSettingsSchema = z.strictObject({
	fastingReminders: z.boolean(),
	prayerReminders: z.boolean(),
});

export type NotificationSettings = z.infer<typeof notificationSettingsSchema>;
