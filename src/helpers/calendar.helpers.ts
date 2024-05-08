/** List of Muslim Holidays as DayJS dates */

import { dayjsExtended } from "./date.helpers.ts";

import type { Dayjs } from "dayjs";
import type { PerformablePrayer } from "../schemas/prayers.schemas.ts";

export const MUSLIM_HOLIDAYS = {
	"Start of Ramadan": {
		hijriMonth: 9,
		hijriDay: 1,
	},
	"Eid al-Adha": {
		hijriMonth: 12,
		hijriDay: 10,
	},
	"Eid al-Fitr": {
		hijriMonth: 10,
		hijriDay: 1,
	},
	"Start of Muharram": {
		hijriMonth: 1,
		hijriDay: 1,
	},
	Ashura: {
		hijriMonth: 1,
		hijriDay: 10,
	},
	"Eid Milad un Nabi": {
		hijriMonth: 3,
		hijriDay: 12,
	},
	"Lailat al Miraj": {
		hijriMonth: 7,
		hijriDay: 27,
	},
};

export type MuslimHolidayName = keyof typeof MUSLIM_HOLIDAYS;
export type MuslimHoliday = {
	name: MuslimHolidayName;
	hijriDate: Dayjs;
	gregorianDate: Dayjs;
};

export const getMuslimHolidays = (hijriYear: number) => {
	const holidays = Object.entries(MUSLIM_HOLIDAYS).map(
		([name, { hijriMonth, hijriDay }]) => {
			const hijriDate = dayjsExtended.fromCalendarSystem(
				"islamic",
				hijriYear,
				hijriMonth,
				hijriDay,
			);
			const gregorianDate = hijriDate.toCalendarSystem("gregory");
			return {
				name,
				hijriDate,
				gregorianDate,
			} as MuslimHoliday;
		},
	);

	return holidays;
};

export const skipPrayerMarker = (prayers: PerformablePrayer) => {
	return Object.values(prayers).every((prayer) => prayer === "Not Performed");
};
