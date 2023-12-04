import { z } from "zod";

export const notificationsSettingsSchema = z.strictObject({
	fastingReminders: z.boolean(),
	prayerReminders: z.boolean(),
	announcements: z.boolean(),
});

export type NotificationsSettings = z.infer<typeof notificationsSettingsSchema>;
