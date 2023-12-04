import calendarSystems from "@calidy/dayjs-calendarsystems";
import IslamicCalendarSystem from "@calidy/dayjs-calendarsystems/calendarSystems/HijriCalendarSystem";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(calendarSystems);
dayjs.extend(advancedFormat);
dayjs.registerCalendarSystem("islamic", new IslamicCalendarSystem());

export const dayjsExtended = dayjs;

dayjs.extend(utc);
export const dayjsUtcExtended = dayjs;

export const isDate = (value: unknown): value is string | Date => {
	if (
		typeof value !== "string" &&
		typeof value !== "number" &&
		!(value instanceof Date)
	)
		return false;

	const date = value instanceof Date ? value : new Date(value);
	return !isNaN(date.getTime());
};

export const getDateOrNull = (value: unknown): null | Date => {
	if (
		typeof value !== "string" &&
		typeof value !== "number" &&
		!(value instanceof Date)
	)
		return null;

	const date = value instanceof Date ? value : new Date(value);
	if (isNaN(date.getTime())) return null;

	return date;
};

export const compareDate = (
	first: string | Date,
	second: string | Date,
): number => new Date(first).getTime() - new Date(second).getTime();

export const dayjsFormatPatterns = {
	date: "YYYY-MM-DD",
	time: "h:mm:ss A",
	datetime: "YYYY-MM-DD h:mm A",
};

// Convert Gregorian date to Julian day
// Ref: Astronomical Algorithms by Jean Meeus
export const gregorianToJulian = (date: dayjs.Dayjs): number => {
	let year = date.year();
	let month = date.month() + 1; // Convert to 1-based month
	const day = date.date() as number; // ! Dayjs typings are wrong after including extended plugin

	if (month <= 2) {
		year -= 1;
		month += 12;
	}

	const a = Math.floor(year / 100);
	const b = 2 - a + Math.floor(a / 4);
	const julianDate =
		Math.floor(365.25 * (year + 4716)) +
		Math.floor(30.6001 * (month + 1)) +
		day +
		b -
		1524.5;

	return julianDate;
};
