import Component from "@expo/vector-icons/MaterialCommunityIcons";
import { z } from "zod";

import type {
	IconProps as Props,
	Icon as Type,
} from "@expo/vector-icons/build/createIconSet";

type map = typeof Component extends Type<infer T, string> ? T : never;

export const appIconMap = {
	rate: "star",
	share: "share-variant",
	contact: "email-outline",
	logout: "power",
	"user-account": "account-circle-outline",
	"light-mode": "white-balance-sunny",
	"dark-mode": "weather-night",
	"system-mode": "theme-light-dark",
	"arrow-back": "arrow-left-circle-outline",
	"arrow-next": "arrow-right-circle-outline",
	"arrow-up": "arrow-up-circle-outline",
	"arrow-down": "arrow-down-circle-outline",
	visible: "eye-outline",
	hidden: "eye-off-outline",
	notifications: "bell-ring-outline",
	error: "alert-circle-outline",
	success: "check-circle-outline",
	info: "information-outline",
	warning: "alert-circle-outline",
	email: "email-outline",
	"email-at": "at",
	phone: "phone",
	number: "numeric",
	password: "form-textbox-password",
	text: "format-text-variant",
	search: "magnify",
	date: "calendar-month",
	time: "clock-time-four-outline",
	close: "close-circle-outline",
	submit: "arrow-up-circle-outline",
	check: "check-all",
	restore: "history",
	language: "translate",
	unchecked: "check-circle-outline",
	checked: "check-circle",
	settings: "cog-outline",
	location: "map-marker-outline",
	fajr: "weather-night-partly-cloudy",
	sunrise: "weather-sunset-up",
	dhuhr: "weather-sunny",
	asr: "weather-sunset-down",
	maghrib: "weather-sunset",
	isha: "weather-night",
	dua: "hands-pray",
	"islamic-calendar": "calendar-text",
	prayers: "hands-pray",
	qibla: "compass",
	quran: "book-open-variant",
	fasting: "food-apple-outline",
	"prayer-times-calculation-settings": "abacus",
	"calendar-settings": "calendar-edit",
	"fasting-settings": "food-apple-outline",
	"duas-settings": "hands-pray",
	"user-settings": "account-settings",
	Jamaat: "checkbox-marked-circle",
	Infradi: "checkbox-marked-circle-plus-outline",
	Qadha: "checkbox-marked-circle-outline",
	"Not Performed": "checkbox-blank-circle-outline",
	"0%": "checkbox-blank-circle-outline",
	"20%": "circle-slice-1",
	"40%": "circle-slice-3",
	"60%": "circle-slice-5",
	"80%": "circle-slice-7",
	"100%": "circle-slice-8",
} as const;

type _ =
	//   ^?
	keyof {
		[k in keyof typeof appIconMap as (typeof appIconMap)[k] extends map
			? never
			: k]: true;
	};

z.util.assertEqual<_, never>(true);

export type IconName = keyof typeof appIconMap;

export type IconProps = Omit<Props<string>, "name"> & {
	name: IconName;
};

export const Icon = ({ name: mapName, ...props }: IconProps) => {
	const name = appIconMap[mapName];
	return (
		<Component
			name={name as never}
			{...props}
		/>
	);
};
