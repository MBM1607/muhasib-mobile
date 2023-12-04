import { createContext, useContext, useEffect, useState } from "react";

import { events } from "../helpers/events.helpers";
import { createStore } from "../helpers/store.helpers";
import {
	UNFILLED_PRAYER_DATA,
	prayersSchema,
} from "../schemas/prayers.schemas";

import type { PropsWithChildren } from "react";
import type {
	PerformablePrayerName,
	PrayerPerformMethod,
	Prayers,
} from "../schemas/prayers.schemas";

export const prayersStore = createStore({
	key: "prayers",
	schema: prayersSchema,
	secureStore: false,
});

const PrayersContext = createContext<Prayers>({});

type PrayersProviderProps = PropsWithChildren<{
	defaultPrayers: Prayers;
}>;

export const PrayersProvider = ({
	children,
	defaultPrayers,
}: PrayersProviderProps) => {
	const [prayers, setPrayers] = useState(defaultPrayers);

	useEffect(() => {
		const performPrayerListener = events.listen(
			"performPrayer",
			({ date, prayer, prayerPerformMethod }) => {
				setPrayers((oldPrayers) => {
					const datePrayers = {
						// Add all prayers to today's prayers if they don't exist
						...UNFILLED_PRAYER_DATA,
						...oldPrayers[date],
						[prayer]: prayerPerformMethod,
					};

					const newPrayers = {
						...oldPrayers,
						[date]: datePrayers,
					};
					prayersStore.set(newPrayers);
					return newPrayers;
				});
			},
		);

		(async () => {
			setPrayers((await prayersStore.get()) || {});
		})();

		return () => {
			performPrayerListener.remove();
		};
	}, []);

	return (
		<PrayersContext.Provider value={prayers}>
			{children}
		</PrayersContext.Provider>
	);
};

/** Fires the performPrayer event **/
export const performPrayer = (
	date: string,
	prayer: PerformablePrayerName,
	prayerPerformMethod: PrayerPerformMethod,
) => {
	events.emit("performPrayer", {
		date,
		prayer,
		prayerPerformMethod,
	});
};

export const usePrayers = (): Prayers => {
	const prayers = useContext(PrayersContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (prayers === undefined)
		throw new Error("usePrayers must be used within a PrayersProvider");

	return prayers;
};
