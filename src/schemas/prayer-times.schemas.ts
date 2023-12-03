export const CALCULATION_METHOD_NAMES = [
	"Muslim World League",
	"Islamic Society of North America (ISNA)",
	"Egyptian General Authority of Survey",
	"Umm Al-Qura University, Makkah",
	"University of Islamic Sciences, Karachi",
	"Gulf Region",
	"Kuwait",
	"Qatar",
	"Majlis Ugama Islam Singapura, Singapore",
	"Union Organization Islamic de France",
	"Diyanet İşleri Başkanlığı, Turkey",
	"Spiritual Administration of Muslims of Russia",
	"Institute of Geophysics, University of Tehran",
	"Shia Ithna-Ashari, Leva Institute, Qum",
] as const;

export type CalculationMethodName = (typeof CALCULATION_METHOD_NAMES)[number];

export type CalculationParam = {
	type: "angle" | "minutes";
	value: number;
};
export type CalculationMethodParams = {
	fajr: CalculationParam;
	isha: CalculationParam;
	maghrib: CalculationParam;
	midnight: "Standard" | "Jafari";
};

export const CALCULATION_DEFAULT_PARAMS: CalculationMethodParams = {
	fajr: {
		type: "angle",
		value: 18,
	},
	isha: {
		type: "angle",
		value: 17,
	},
	maghrib: {
		type: "minutes",
		value: 0,
	},
	midnight: "Standard",
};

export const CALCULATION_METHODS: Record<
	CalculationMethodName,
	CalculationMethodParams
> = {
	"Muslim World League": CALCULATION_DEFAULT_PARAMS,
	"Islamic Society of North America (ISNA)": {
		...CALCULATION_DEFAULT_PARAMS,
		fajr: {
			type: "angle",
			value: 15,
		},
		isha: {
			type: "angle",
			value: 15,
		},
	},
	"Egyptian General Authority of Survey": {
		...CALCULATION_DEFAULT_PARAMS,
		fajr: {
			type: "angle",
			value: 19.5,
		},
		isha: {
			type: "angle",
			value: 17.5,
		},
	},
	"Umm Al-Qura University, Makkah": {
		...CALCULATION_DEFAULT_PARAMS,
		fajr: {
			type: "angle",
			value: 18.5,
		},
		isha: {
			type: "minutes",
			value: 90,
		},
	},
	"University of Islamic Sciences, Karachi": {
		...CALCULATION_DEFAULT_PARAMS,
		fajr: {
			type: "angle",
			value: 18,
		},
		isha: {
			type: "angle",
			value: 18,
		},
	},
	"Gulf Region": {
		...CALCULATION_DEFAULT_PARAMS,
		fajr: {
			type: "angle",
			value: 19.5,
		},
		isha: {
			type: "minutes",
			value: 90,
		},
	},
	Kuwait: {
		...CALCULATION_DEFAULT_PARAMS,
		fajr: {
			type: "angle",
			value: 18,
		},
		isha: {
			type: "angle",
			value: 17.5,
		},
	},
	Qatar: {
		...CALCULATION_DEFAULT_PARAMS,
		fajr: {
			type: "angle",
			value: 18,
		},
		isha: {
			type: "minutes",
			value: 90,
		},
	},
	"Majlis Ugama Islam Singapura, Singapore": {
		...CALCULATION_DEFAULT_PARAMS,
		fajr: {
			type: "angle",
			value: 20,
		},
		isha: {
			type: "angle",
			value: 18,
		},
	},
	"Union Organization Islamic de France": {
		...CALCULATION_DEFAULT_PARAMS,
		fajr: {
			type: "angle",
			value: 12,
		},
		isha: {
			type: "angle",
			value: 12,
		},
	},
	"Diyanet İşleri Başkanlığı, Turkey": {
		...CALCULATION_DEFAULT_PARAMS,
		fajr: {
			type: "angle",
			value: 18,
		},
		isha: {
			type: "angle",
			value: 17,
		},
	},
	"Spiritual Administration of Muslims of Russia": {
		...CALCULATION_DEFAULT_PARAMS,
		fajr: {
			type: "angle",
			value: 16,
		},
		isha: {
			type: "angle",
			value: 15,
		},
	},
	"Institute of Geophysics, University of Tehran": {
		fajr: {
			type: "angle",
			value: 17.7,
		},
		isha: {
			type: "angle",
			value: 14,
		},
		maghrib: {
			type: "angle",
			value: 4.5,
		},
		midnight: "Jafari",
	},
	"Shia Ithna-Ashari, Leva Institute, Qum": {
		fajr: {
			type: "angle",
			value: 16,
		},
		isha: {
			type: "angle",
			value: 14,
		},
		maghrib: {
			type: "angle",
			value: 4,
		},
		midnight: "Jafari",
	},
};

export const PRAYER_TIME_NAMES = [
	"imsak",
	"fajr",
	"sunrise",
	"dhuhr",
	"asr",
	"sunset",
	"maghrib",
	"isha",
	"midnight",
] as const;
export type PrayerTimeName = (typeof PRAYER_TIME_NAMES)[number];

export const TIME_FORMATS = ["24h", "12h"] as const;
export type TimeFormat = (typeof TIME_FORMATS)[number];

export const ASR_JURISTIC_METHOD_NAMES = [
	"Standard", // Shafi`i, Maliki, Ja`fari, Hanbali
	"Hanafi",
] as const;

export type AsrJuristicMethodName = (typeof ASR_JURISTIC_METHOD_NAMES)[number];

export const MIDNIGHT_MODE_NAMES = [
	"Standard", // Mid Sunset to Sunrise
	"Jafari", // Mid Sunset to Fajr
] as const;
export type MidnightModeName = (typeof MIDNIGHT_MODE_NAMES)[number];

export const HIGH_LATITUDE_METHOD_NAMES = [
	"NightMiddle", // middle of night
	"AngleBased", // angle/60th of night
	"OneSeventh", // 1/7th of night
	"None", // No adjustment
] as const;
export type HighLatitudeMethod = (typeof HIGH_LATITUDE_METHOD_NAMES)[number];
export type HighLatitudeMethodSansNone = Exclude<HighLatitudeMethod, "None">;

export type PrayerTimes = Record<PrayerTimeName, string>;
export type PrayerTimesRaw = Record<PrayerTimeName, number>;

export type PrayerTimesOptions = {
	calculationMethod: CalculationMethodName;
	asrJuristicMethod: AsrJuristicMethodName;
	midnightMode: MidnightModeName;
	highLatitudeMethod: HighLatitudeMethod;
	timeFormat: TimeFormat;
	imsakAdjustment: CalculationParam;
	dhuhrAdjustment: CalculationParam;
};
