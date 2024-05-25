/* cSpell: disable */

import { Platform } from "react-native";
import { z } from "zod";

import type { PerformablePrayerName } from "./schemas/prayers.schemas";

const isAndroid = Platform.OS === "android";

export const languages = ["english"] as const;

export const languageSchema = z.enum(languages);

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "english";

const english = {
	title: "Muhasib",
	headings: {
		setLocation: "Allow Location",
		updateLocation: "Update Location",
	},
	location: {
		explanation:
			"Location access allows Muhasib to calculate prayer times. The location is not stored anywhere except your device. You can change the location later in the settings.",
		button: {
			allow: "Allow",
			detect: "Set to Current Location",
		},
	},
	action: {
		login: "login",
		logout: "logout",
		register: "register",
		close: "close",
		back: "back",
		forgotPassword: "forgot password?",
		resetPassword: "reset password",
		code: {
			normal: "send code",
			error: "resend code",
			success: "code sent!",
		},
		verify: {
			normal: "verify",
			error: "retry",
			success: "verified!",
		},
	},
	error: "error",
	oops: "oops",
	genericError: "something went wrong",
	resetDescription: "enter the email to get the reset code",
	resetSent: "a reset code has been sent to your email",
	pathNotFound: (pathname: string) => `path ${pathname} does not exist`,
	pages: {
		setLocation: "Set Location",
		updateLocation: "Update Location",
		prayers: "prayers",
		prayerStatistics: "prayer statistics",
		qibla: "qibla",
		islamicCalendar: "calendar",
		fasting: "fasting",
		duas: "duas",
		quran: "quran",
		muhasibAi: "muhasib AI",
		settings: "settings",
		prayerTimesCalculationSettings: "prayer times calculation settings",
		calendarSettings: "calendar settings",
		duasSettings: "duas settings",
		notificationsSettings: "notification settings",
		userSettings: "user settings",
		notFound: "not found",
		login: "login",
		register: "register",
		resetPassword: "reset password",
	},
	prayerTimesCalculationSettings: {
		card: {
			title: "Calculation",
			description: "Method, Corrections, Adjustments",
		},
		calculationMethod: {
			title: "Calculation Method",
			overlayLabel: "Select Calculation Method",
		},
		asrMethod: {
			title: "Asr Method",
			overlayLabel: "Select Asr Method",
		},
		highLatitudeMethod: {
			title: "High Latitude Method",
			overlayLabel: "Select High Latitude Method",
		},
		timeFormat: {
			title: "Time Format",
			overlayLabel: "Select Time Format",
		},
	},
	calendarSettings: {
		card: {
			title: "Calendar",
			description: "Hijri Date Adjustment",
		},
		hijriAdjustment: {
			title: "Hijri Date Adjustment",
			overlayLabel: "Select Hijri Date Adjustment",
		},
	},
	duasSettings: {
		card: {
			title: "Duas",
			description: "Which Duas to Show",
		},
	},
	notificationsSettings: {
		card: {
			title: "Notifications",
			description: "Which Notifications to Show",
		},
		enableAnnouncements: {
			title: "Enable Announcements",
			caption: "Get notified about new features and updates",
		},
	},
	userSettings: {
		card: {
			title: "User",
			description: "Login, Logout, Register",
		},
	},
	settings: {
		rateCard: {
			title: "Rate",
			description: `Rate Muhasib on the ${isAndroid ? "Play" : "App"} Store`,
		},
		shareCard: {
			title: "Share",
			description: "Share Muhasib with your friends",
		},
		contactCard: {
			title: "Contact",
			description: "Contact the developer",
		},
	},
	notifications: {
		prayerStart: (prayerName: PerformablePrayerName) =>
			`It's time for ${english.prayer[prayerName]}!`,
	},
	share: {
		title: "Share Muhasib",
		message: "Check out Muhasib, a Muslim Accountabilty App",
	},
	qibla: {
		trueNorth: "True North",
		magneticField: "Magnetic Field",
		kaaba: "Ka'aba",
		fromTrueNorth: "from True North",
	},
	fasting: {
		fastingInputLabel: "Are you fasting today?",
		timeTable: "Fasting Time Table",
		enableNotification: {
			title: "Enable Fasting Notifications",
			caption: "Get notified when it's time to start and break your fast",
		},
		suhoorNotification: {
			title: "Suhoor Time",
			body: "It's time to eat suhoor!",
		},
		iftarNotification: {
			title: "Iftar Time",
			body: "It's time to break your fast!",
		},
	},
	prayer: {
		imsak: "Imsak/Suhoor",
		fajr: "Fajr",
		sunrise: "Sunrise",
		dhuhr: "Dhuhr",
		asr: "Asr",
		sunset: "Sunset/Iftar",
		maghrib: "Maghrib",
		isha: "Isha",
		midnight: "Midnight",
	},
	prayerPerformMethod: {
		"Not Performed": "Not Performed",
		Qadha: "Qadha",
		Infradi: "Infradi",
		Jamaat: "Jamaat",
	},
	prayers: {
		enableNotification: {
			title: "Enable Prayer Notifications",
			caption: "Get notified when it's time to pray",
		},
	},
	duas: {
		shareMessage: "Provided by Muhasib",
	},
	0: "0",
	1: "1",
	2: "2",
	3: "3",
	4: "4",
	5: "5",
	6: "6",
	7: "7",
	8: "8",
	9: "9",
	10: "10",
	11: "11",
	12: "12",
	13: "13",
	14: "14",
	15: "15",
};

export type Content = typeof english;

export const content: Record<Language, Content> = { english };
