import dayjs from "dayjs";
import { createContext, useContext, useEffect, useState } from "react";

import { useCalculationSettings } from "./calculation-settings.context.tsx";
import { useI18n } from "./i18n.context.tsx";
import { useLocationOrNull } from "./location.context.tsx";

import { events } from "../helpers/events.helpers.ts";
import {
	cancelAllNotifications,
	schedulePrayerStartTimeNotification,
} from "../helpers/notification.helpers.ts";
import { getPrayerTimes } from "../helpers/prayer-times.helpers.ts";
import { PERFORMABLE_PRAYERS } from "../schemas/prayers.schemas.ts";

import type { PropsWithChildren } from "react";
import type { PrayerTimes } from "../schemas/prayer-times.schemas.ts";

const PrayerTimesContext = createContext<null | PrayerTimes>(null);

type PrayerTimesProviderProps = PropsWithChildren;

export const usePrayerTimes = (): PrayerTimes => {
	const prayertimes = useContext(PrayerTimesContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (prayertimes === undefined)
		throw new Error("usePrayerTimes must be used within a PrayerTimesProvider");
	return prayertimes === null
		? {
				imsak: "--:--",
				fajr: "--:--",
				sunrise: "--:--",
				dhuhr: "--:--",
				asr: "--:--",
				sunset: "--:--",
				maghrib: "--:--",
				isha: "--:--",
				midnight: "--:--",
			}
		: prayertimes;
};

export const PrayerTimesProvider = ({ children }: PrayerTimesProviderProps) => {
	const location = useLocationOrNull();
	const calculationSettings = useCalculationSettings();
	const { content } = useI18n();

	const [prayertimes, setPrayerTimes] = useState<PrayerTimes | null>(null);

	useEffect(() => {
		const calculatePrayerTimesListener = events.listen(
			"calculatePrayerTimes",
			() => {
				if (!location) return;

				const today = dayjs();
				const prayerTimes = getPrayerTimes(
					today,
					location.coords,
					calculationSettings,
				);
				setPrayerTimes(prayerTimes);

				cancelAllNotifications();
				PERFORMABLE_PRAYERS.forEach((prayer) => {
					const notificationTitle = content.notifications.prayerStart(prayer);
					const startTime = prayerTimes[prayer];
					schedulePrayerStartTimeNotification(notificationTitle, startTime);
				});
			},
		);

		// calculate prayer times on mount & when location changes
		calculatePrayerTimes();

		return () => {
			calculatePrayerTimesListener.remove();
		};
	}, [location, calculationSettings]);

	return (
		<PrayerTimesContext.Provider value={prayertimes}>
			{children}
		</PrayerTimesContext.Provider>
	);
};

/** fires the calculatePrayerTimes event **/
export const calculatePrayerTimes = () => {
	events.emit("calculatePrayerTimes");
};
