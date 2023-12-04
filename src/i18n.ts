/* cSpell: disable */

import { z } from "zod";

export const languages = ["english", "urdu"] as const;

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
		quran: "quran",
		islamicCalendar: "calendar",
		fasting: "fasting",
		aiChat: "ai chat",
		duas: "duas",
		settings: "settings",
		prayerTimesCalculationSettings: "prayer times calculation settings",
		fastingSettings: "fasting settings",
		calendarSettings: "calendar settings",
		duasSettings: "duas settings",
		userSettings: "user settings",
		notFound: "not found",
		login: "login",
		register: "register",
		resetPassword: "reset password",
	},
	qibla: {
		trueNorth: "True North",
		magneticField: "Magnetic Field",
		kaaba: "Ka'aba",
		fromTrueNorth: "from True North",
	},
};

export type Content = typeof english;

const urdu: Content = {
	title: "محاسب",
	headings: {
		setLocation: "برائے مہربانی مقام کی اجازت دیں",
		updateLocation: "مقام تبدیل کریں",
	},
	location: {
		explanation:
			"مقام کی اجازت نماز کے اوقات کا حساب کرنے کی اجازت دیتی ہے ، مقام کو آپ کے آلے کے علاوہ کہیں بھی ذخیرہ نہیں کیا جاتا ہے۔ آپ بعد میں ترتیبات میں مقام تبدیل کرسکتے ہیں۔",
		button: {
			allow: "اجازت دیں",
			detect: "موجودہ مقام پر ترتیب دیں",
		},
	},
	action: {
		login: "داخل ہوں",
		logout: "خارج ہوں",
		register: "اندراج",
		close: "بند کریں",
		back: "واپس",
		forgotPassword: "پاسورڈ بھول گئے؟",
		resetPassword: "پاسورڈ بدلیں",
		code: {
			normal: "کوڈ بھیجیں",
			error: "دوبارہ بھیجیں",
			success: "بھیج دیا",
		},
		verify: {
			normal: "تصدیق کریں",
			error: "دوبارہ کریں",
			success: "تصدیق شدہ!",
		},
	},
	error: "غلطی",
	oops: "اوہو",
	genericError: "نامعلوم مسئلہ درپیش آیا",
	resetDescription: "تبدیلی کے کوڈ کیلئے ای میل درج کریں",
	resetSent: "تبدیلی کا کوڈ آپ کو بھیج دیا گیا ہے",
	pathNotFound: (pathname: string) => `نامعلوم صفحہ: ${pathname}`,
	pages: {
		setLocation: "مقام تعین کریں",
		updateLocation: "مقام تبدیل کریں",
		prayers: "نمازیں",
		prayerStatistics: "نمازیں کی شماریات",
		qibla: "قبلہ",
		quran: "قرآن",
		islamicCalendar: "اسلامی کیلنڈر",
		fasting: "روزے",
		aiChat: "چیٹ بوٹ",
		duas: "دعائیں",
		settings: "ترتیبات",
		prayerTimesCalculationSettings: "نمازیں کی ترتیبات",
		fastingSettings: "روزوں کی ترتیبات",
		calendarSettings: "کیلنڈر کی ترتیبات",
		duasSettings: "دعائیں کی ترتیبات",
		userSettings: "صارف کی ترتیبات",
		notFound: "نامعلوم صفحہ",
		login: "داخلہ",
		register: "اندراج",
		resetPassword: "پاسورڈ تبدیلی",
	},
	qibla: {
		trueNorth: "سچا شمال",
		magneticField: "مقناطیسی میدان",
		kaaba: "کعبہ",
		fromTrueNorth: "سچا شمال سے",
	},
};

export const content: Record<Language, Content> = { english, urdu };
