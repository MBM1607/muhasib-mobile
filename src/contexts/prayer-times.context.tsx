import dayjs from "dayjs";
import { createContext, useContext, useEffect, useState } from "react";

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

export const usePrayerTimesOrNull = (): PrayerTimes | null => {
	const prayertimes = useContext(PrayerTimesContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (prayertimes === undefined)
		throw new Error("usePrayerTimes must be used within a PrayerTimesProvider");
	return prayertimes;
};

export const PrayerTimesProvider = ({ children }: PrayerTimesProviderProps) => {
	const location = useLocationOrNull();

	const [prayertimes, setPrayerTimes] = useState<PrayerTimes | null>(null);

	useEffect(() => {
		const calculatePrayerTimesListener = events.listen(
			"calculatePrayerTimes",
			() => {
				if (!location) return;

				const today = dayjs();
				const prayerTimes = getPrayerTimes(today, location.coords);
				setPrayerTimes(prayerTimes);
			},
		);

		// calculate prayer times on mount & when location changes
		calculatePrayerTimes();

		return () => {
			calculatePrayerTimesListener.remove();
		};
	}, [location]);

	return (
		<PrayerTimesContext.Provider value={prayertimes}>
			{children}
		</PrayerTimesContext.Provider>
	);
};
