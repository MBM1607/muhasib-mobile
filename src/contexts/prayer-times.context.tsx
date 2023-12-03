import dayjs from "dayjs";
import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

import { useLocationOrNull } from "./location.context";

import { events } from "../helpers/events.helpers";
import { getPrayerTimes } from "../helpers/prayer-times.helpers";

import type { PropsWithChildren } from "react";
import type { PrayerTimes } from "../schemas/prayer-times.schemas";

const PrayerTimesContext = createContext<null | PrayerTimes>(null);

type PrayerTimesProviderProps = PropsWithChildren;
export const PrayerTimesProvider = ({ children }: PrayerTimesProviderProps) => {
	const rootSegment = useSegments()[1];
	const router = useRouter();
	const location = useLocationOrNull();

	const [prayertimes, setPrayerTimes] = useState<PrayerTimes | null>(null);

	useEffect(() => {
		const calculatePrayerTimesListener = events.listen(
			"calculatePrayerTimes",
			() => {
				if (!location) return;

				console.log("calculating prayer times");
				const today = dayjs();
				const prayerTimes = getPrayerTimes(today, location.coords);
				setPrayerTimes(prayerTimes);
			},
		);

		return () => {
			calculatePrayerTimesListener.remove();
		};
	}, [router, location]);

	useEffect(() => {
		if (!prayertimes && rootSegment !== "prayertimes")
			router.push("/prayertimes/set");
		else if (prayertimes && rootSegment === "prayertimes/set")
			router.push("/prayertimes/update");
	}, [prayertimes, rootSegment, router]);

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

export const usePrayerTimesOrNull = (): PrayerTimes | null => {
	const prayertimes = useContext(PrayerTimesContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (prayertimes === undefined)
		throw new Error("usePrayerTimes must be used within a PrayerTimesProvider");
	return prayertimes;
};
