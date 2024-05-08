import { DeviceEventEmitter } from "react-native";

import type { SetStateAction } from "react";
import type { AlertModalProps } from "../components/feedback/alert-modal.component.tsx";
import type { Language } from "../i18n";
import type { Location } from "../schemas/location.schemas.ts";
import type {
	AsrJuristicMethodName,
	CalculationMethodName,
	HighLatitudeMethod,
	TimeFormat,
} from "../schemas/prayer-times.schemas.ts";
import type {
	PerformablePrayerName,
	PrayerPerformMethod,
} from "../schemas/prayers.schemas.ts";
import type { LoggedInUser } from "../schemas/user.schemas.ts";

export type EventMap = {
	login: LoggedInUser;
	logout: undefined;
	setLocation: Location;
	toggleMode: undefined;
	addAlert: string | Error | AlertModalProps;
	removeAlert: undefined;
	setIsLoading: SetStateAction<boolean> | Promise<unknown>;
	updateLanguage: SetStateAction<Language>;
	calculatePrayerTimes: undefined;
	setCalculationMethod: CalculationMethodName;
	setAsrMethod: AsrJuristicMethodName;
	setHighLatitudeMethod: HighLatitudeMethod;
	setTimeFormat: TimeFormat;
	performPrayer: {
		date: string;
		prayer: PerformablePrayerName;
		prayerPerformMethod: PrayerPerformMethod;
	};
	toggleFastingRecord: string;
	toggleFastingReminder: undefined;
	togglePrayerReminder: undefined;
	toggleAnnouncements: undefined;
	setHijriDateAdjustment: number;
};

export const events = {
	emit: <T extends keyof EventMap>(
		...args: EventMap[T] extends undefined
			? [event: T]
			: [event: T, data: EventMap[T]]
	) => {
		DeviceEventEmitter.emit(args[0], args[1]);
	},
	listen: <T extends keyof EventMap>(
		event: T,
		listener: (
			...args: EventMap[T] extends undefined ? [] : [data: EventMap[T]]
		) => void,
	) => {
		const subscription = DeviceEventEmitter.addListener(
			event,
			listener as never,
		);
		return {
			remove: () => {
				subscription.remove();
			},
		};
	},
};
