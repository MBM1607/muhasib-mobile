/*
--------------------- Copyright Block ----------------------
PrayTimes.js: Prayer Times Calculator (ver 2.3)
Copyright (C) 2007-2011 PrayTimes.org

Developer: Hamid Zarrabi-Zadeh
License: GNU LGPL v3.0

TERMS OF USE:
	Permission is granted to use this code, with or
	without modification, in any website or application
	provided that credit is given to the original work
	with a link back to PrayTimes.org.

This program is distributed in the hope that it will
be useful, but WITHOUT ANY WARRANTY.

PLEASE DO NOT REMOVE THIS COPYRIGHT BLOCK.

--------------------- Modification Notice ----------------------

The base code has been heavily modified to modern JS standards and customized for the needs of
this project by me (Muhammad Khan). The copyright block is included as a courtesy.

- TypeScript support is added
- The code is now fully modularized, and functions based instead of object based
- Manual offsets are removed in favor of calculation methods
  - TODO See if manual offsets are needed and add them back in if so
*/

import { gregorianToJulian } from "./date.helpers";
import {
	arccot,
	fixHour,
	getMidDay,
	getRiseSetAngle,
	getSunAngleTime,
	getSunPosition,
	getTimeDifference,
	tan,
} from "./math.helpers";

import { CALCULATION_METHODS } from "../schemas/prayer-times.schemas";

import type { Dayjs } from "dayjs";
import type { Coords } from "../schemas/location.schemas";
import type {
	AsrJuristicMethodName,
	HighLatitudeMethodSansNone,
	PrayerTimeName,
	PrayerTimes,
	PrayerTimesOptions,
	PrayerTimesRaw,
	TimeFormat,
} from "../schemas/prayer-times.schemas";

// Convert Hours to Day Portions
const hoursToDayPortions = (hours: number): number => {
	return hours / 24;
};

// Convert all prayer times from hours to day portions
const convertTimesToDayPortions = (times: PrayerTimesRaw): PrayerTimesRaw => ({
	imsak: hoursToDayPortions(times.imsak),
	fajr: hoursToDayPortions(times.fajr),
	sunrise: hoursToDayPortions(times.sunrise),
	dhuhr: hoursToDayPortions(times.dhuhr),
	asr: hoursToDayPortions(times.asr),
	sunset: hoursToDayPortions(times.sunset),
	maghrib: hoursToDayPortions(times.maghrib),
	isha: hoursToDayPortions(times.isha),
	midnight: hoursToDayPortions(times.midnight),
});

export const getAsrFactor = (juristicMethod: AsrJuristicMethodName) =>
	juristicMethod === "Hanafi" ? 2 : 1;

export const getAsrTime = (
	julianDate: number,
	juristicMethod: AsrJuristicMethodName,
	dayPortion: number,
	latitude: number,
): number => {
	const sunDeclination = getSunPosition(julianDate).declination;
	const asrFactor = getAsrFactor(juristicMethod);
	const angle = -arccot(asrFactor + tan(Math.abs(latitude - sunDeclination)));
	return getSunAngleTime(julianDate, angle, dayPortion, latitude, "cw");
};

const getNightPortion = (
	highLatitudeMethod: HighLatitudeMethodSansNone,
	angle: number,
	nightTime: number,
): number => {
	const portion =
		highLatitudeMethod === "NightMiddle"
			? 1 / 2
			: highLatitudeMethod === "OneSeventh"
			  ? 1 / 7
			  : (1 / 60) * angle;

	return portion * nightTime;
};

// Adjust given time for location in higher latitudes
const getAdjustedHighLatitudeTime = (
	highLatitudeMethod: HighLatitudeMethodSansNone,
	time: number,
	base: number,
	angle: number,
	nightTime: number,
	direction: "cw" | "ccw",
): number => {
	const portion = getNightPortion(highLatitudeMethod, angle, nightTime);
	const timeDifference =
		direction === "ccw"
			? getTimeDifference(time, base)
			: getTimeDifference(base, time);

	if (isNaN(time) || timeDifference > portion)
		return base + (direction === "ccw" ? -portion : portion);

	return time;
};

export const getFormattedTime = (
	time: number,
	timeFormat: TimeFormat,
): string => {
	const fixedTime = fixHour(time + 0.5 / 60); // add 0.5 minutes to round
	const hours = Math.floor(fixedTime);
	const minutes = Math.floor((fixedTime - hours) * 60);
	const suffix = timeFormat === "24h" ? "" : hours >= 12 ? "PM" : "AM";
	const formattedHours =
		timeFormat === "24h" ? hours : ((hours + 12 - 1) % 12) + 1;

	return `${formattedHours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}${suffix}`;
};

export const getFormattedTimes = (
	times: PrayerTimesRaw,
	timeFormat: TimeFormat,
): PrayerTimes => ({
	imsak: getFormattedTime(times.imsak, timeFormat),
	fajr: getFormattedTime(times.fajr, timeFormat),
	sunrise: getFormattedTime(times.sunrise, timeFormat),
	dhuhr: getFormattedTime(times.dhuhr, timeFormat),
	asr: getFormattedTime(times.asr, timeFormat),
	sunset: getFormattedTime(times.sunset, timeFormat),
	maghrib: getFormattedTime(times.maghrib, timeFormat),
	isha: getFormattedTime(times.isha, timeFormat),
	midnight: getFormattedTime(times.midnight, timeFormat),
});

/*
	@description
	Get prayer times for a given date and coordinates. This is the main helper function and is the
	face of the prayer times calculation module.
	@param date the date to get prayer times for
	@param coords the coordinates to get prayer times for
	@param options the options to use for calculation
	@returns the prayer times for the given date and coordinates
*/
export const getPrayerTimes = (
	date: Dayjs,
	coords: Coords,
	options: PrayerTimesOptions = {
		calculationMethod: "Muslim World League",
		asrJuristicMethod: "Standard",
		midnightMode: "Standard",
		highLatitudeMethod: "NightMiddle",
		timeFormat: "12h",
		imsakAdjustment: {
			type: "minutes",
			value: 10,
		},
		dhuhrAdjustment: {
			type: "minutes",
			value: 0,
		},
	},
): PrayerTimes => {
	const calculationParams = CALCULATION_METHODS[options.calculationMethod];
	const julianDate = gregorianToJulian(date);
	// Default times
	const times: PrayerTimesRaw = {
		imsak: 5,
		fajr: 5,
		sunrise: 6,
		dhuhr: 12,
		asr: 13,
		sunset: 18,
		maghrib: 18,
		isha: 18,
		midnight: 0,
	};

	// Fixed constants
	const NUMBER_OF_ITERATIONS = 1;

	const computeTimes = (computableTimes: PrayerTimesRaw) => {
		const dayPortions = convertTimesToDayPortions(computableTimes);

		computableTimes.imsak = getSunAngleTime(
			julianDate,
			options.imsakAdjustment.value,
			dayPortions.imsak,
			coords.latitude,
			"ccw",
		);
		computableTimes.fajr = getSunAngleTime(
			julianDate,
			calculationParams.fajr.value,
			dayPortions.fajr,
			coords.latitude,
			"ccw",
		);
		computableTimes.sunrise = getSunAngleTime(
			julianDate,
			getRiseSetAngle(coords.altitude || 0),
			dayPortions.sunrise,
			coords.latitude,
			"ccw",
		);
		computableTimes.dhuhr = getMidDay(julianDate, dayPortions.dhuhr);
		computableTimes.asr = getAsrTime(
			julianDate,
			options.asrJuristicMethod,
			dayPortions.asr,
			coords.latitude,
		);
		computableTimes.sunset = getSunAngleTime(
			julianDate,
			getRiseSetAngle(coords.altitude || 0),
			dayPortions.sunset,
			coords.latitude,
			"cw",
		);
		computableTimes.maghrib = getSunAngleTime(
			julianDate,
			calculationParams.maghrib.value,
			dayPortions.maghrib,
			coords.latitude,
			"cw",
		);
		computableTimes.isha = getSunAngleTime(
			julianDate,
			calculationParams.isha.value,
			dayPortions.isha,
			coords.latitude,
			"cw",
		);
	};

	// Main iterations
	for (let i = 1; i <= NUMBER_OF_ITERATIONS; i++) computeTimes(times);

	// Adjust times with timezone offset
	const timezoneAdjustment = date.utcOffset() / 60 - coords.longitude / 15;
	Object.keys(times).forEach((key) => {
		times[key as PrayerTimeName] += timezoneAdjustment;
	});

	// Apply any high latitude adjustments
	if (options.highLatitudeMethod !== "None") {
		const nightTime = getTimeDifference(times.sunset, times.sunrise);

		times.imsak = getAdjustedHighLatitudeTime(
			options.highLatitudeMethod,
			times.imsak,
			times.sunrise,
			options.imsakAdjustment.value,
			nightTime,
			"ccw",
		);
		times.fajr = getAdjustedHighLatitudeTime(
			options.highLatitudeMethod,
			times.fajr,
			times.sunrise,
			calculationParams.fajr.value,
			nightTime,
			"ccw",
		);
		times.isha = getAdjustedHighLatitudeTime(
			options.highLatitudeMethod,
			times.isha,
			times.sunset,
			calculationParams.isha.value,
			nightTime,
			"cw",
		);
		times.maghrib = getAdjustedHighLatitudeTime(
			options.highLatitudeMethod,
			times.maghrib,
			times.sunset,
			calculationParams.maghrib.value,
			nightTime,
			"cw",
		);
	}

	// Adjust Imsak
	times.imsak += options.imsakAdjustment.value / 60;
	// Adjust maghrib if it's in minutes
	if (calculationParams.maghrib.type === "minutes")
		times.maghrib += calculationParams.maghrib.value / 60;
	//Adjust isha if it's in minutes
	if (calculationParams.isha.type === "minutes")
		times.isha += calculationParams.isha.value / 60;
	// Adjust dhuhr
	times.dhuhr += options.dhuhrAdjustment.value / 60;

	// Add midnight time
	times.midnight =
		options.midnightMode === "Standard"
			? times.sunset + getTimeDifference(times.sunset, times.sunrise) / 2
			: times.sunset + getTimeDifference(times.sunset, times.fajr) / 2;

	return getFormattedTimes(times, options.timeFormat);
};
