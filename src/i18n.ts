/* cSpell: disable */

import { Platform } from "react-native";
import { z } from "zod";

const isAndroid = Platform.OS === "android";

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
		calendarSettings: "calendar settings",
		duasSettings: "duas settings",
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
	},
	duasSettings: {
		card: {
			title: "Duas",
			description: "Which Duas to Show",
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
	prayerTimesCalculationSettings: {
		card: {
			title: "حساب",
			description: "طریقہ ، اصلاحات ، ترتیبات",
		},
		calculationMethod: {
			title: "حساب کا طریقہ",
			overlayLabel: "حساب کا طریقہ منتخب کریں",
		},
		asrMethod: {
			title: "عصر کا طریقہ",
			overlayLabel: "عصر کا طریقہ منتخب کریں",
		},
		highLatitudeMethod: {
			title: "اعلیٰ طول و عرض کا طریقہ",
			overlayLabel: "اعلیٰ طول و عرض کا طریقہ منتخب کریں",
		},
		timeFormat: {
			title: "وقت کی شکل",
			overlayLabel: "وقت کی شکل منتخب کریں",
		},
	},
	calendarSettings: {
		card: {
			title: "کیلنڈر",
			description: "ہجری تاریخ کی ترمیم",
		},
	},
	duasSettings: {
		card: {
			title: "دعائیں",
			description: "کون سی دعائیں دکھائیں",
		},
	},
	userSettings: {
		card: {
			title: "صارف",
			description: "داخل ہوں ، خارج ہوں ، اندراج",
		},
	},
	settings: {
		rateCard: {
			title: "درجہ بندی",
			description: `محاسب کو ${
				isAndroid ? "پلے" : "ایپ"
			} سٹور پر درجہ بندی کریں`,
		},
		shareCard: {
			title: "شیئر",
			description: "محاسب کو اپنے دوستوں کے ساتھ شیئر کریں",
		},
		contactCard: {
			title: "رابطہ",
			description: "ڈیویلپر سے رابطہ کریں",
		},
	},
	share: {
		title: "محاسب کو شیئر کریں",
		message: "محاسب کو دیکھیں ، ایک مسلمان اکاؤنٹیبلٹی ایپ",
	},
	fasting: {
		enableNotification: {
			title: "روزے کی اطلاعات کو فعال کریں",
			caption: "اطلاعات کو فعال کریں جب روزے کا وقت ہو",
		},
		suhoorNotification: {
			title: "سحری کا وقت",
			body: "اب سحری کا وقت ہے!",
		},
		iftarNotification: {
			title: "افطار کا وقت",
			body: "اب افطار کا وقت ہے!",
		},
		fastingInputLabel: "کیا آپ آج روزہ رکھ رہے ہیں؟",
		timeTable: "روزے کا وقت کا جدول",
	},
	prayer: {
		imsak: "اِمساک / سحری",
		fajr: "فجر",
		sunrise: "طلوع آفتاب",
		dhuhr: "ظہر",
		asr: "عصر",
		sunset: "غروب آفتاب / افطار",
		maghrib: "مغرب",
		isha: "عشاء",
		midnight: "نصف شب",
	},
	prayerPerformMethod: {
		"Not Performed": "نہیں پڑھی",
		Qadha: "قضا",
		Infradi: "انفرادی",
		Jamaat: "جماعت",
	},
};

export const content: Record<Language, Content> = { english, urdu };
