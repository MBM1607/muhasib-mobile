import { z } from "zod";

export const PRAYER_PERFORM_METHODS = [
	"Not Performed",
	"Infradi",
	"Qadha",
	"Jamaat",
] as const;
export const PERFORMABLE_PRAYERS = [
	"fajr",
	"dhuhr",
	"asr",
	"maghrib",
	"isha",
] as const;
export const UNFILLED_PRAYER_DATA = PERFORMABLE_PRAYERS.reduce(
	(accumulatedObject, prayer) => ({
		...accumulatedObject,
		[prayer]: "Not Performed",
	}),
	{} as PerformablePrayer,
);

export const prayerPerformMethodSchema = z.enum(PRAYER_PERFORM_METHODS);
export const dailyPrayersSchema = z.strictObject({
	fajr: prayerPerformMethodSchema,
	dhuhr: prayerPerformMethodSchema,
	asr: prayerPerformMethodSchema,
	maghrib: prayerPerformMethodSchema,
	isha: prayerPerformMethodSchema,
});

export const prayersSchema = z.record(z.string(), dailyPrayersSchema);

export type PrayerPerformMethod = z.infer<typeof prayerPerformMethodSchema>;
export type PerformablePrayer = z.infer<typeof dailyPrayersSchema>;
export type PerformablePrayerName = keyof PerformablePrayer;
export type DailyPrayers = z.infer<typeof prayersSchema>;
export type Prayers = z.infer<typeof prayersSchema>;
