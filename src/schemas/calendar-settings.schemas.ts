import { z } from "zod";

export const calendarSettingsSchema = z.strictObject({
	hijriDateAdjustment: z.number().int().min(-2).max(2),
});

export type CalendarSettings = z.infer<typeof calendarSettingsSchema>;
