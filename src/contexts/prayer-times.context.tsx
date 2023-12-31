import dayjs from "dayjs";
import { createContext, useContext, useEffect, useState } from "react";

import { useCalculationSettings } from "./calculation-settings.context";
import { useLocationOrNull } from "./location.context";

import { events } from "../helpers/events.helpers";
import { getPrayerTimes } from "../helpers/prayer-times.helpers";

import type { PropsWithChildren } from "react";
import type { PrayerTimes } from "../schemas/prayer-times.schemas";

const PrayerTimesContext = createContext<null | PrayerTimes>(null);

type PrayerTimesProviderProps = PropsWithChildren;

/** fires the calculatePrayerTimes event **/
export const calculatePrayerTimes = () => {
	events.emit("calculatePrayerTimes");
};

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
