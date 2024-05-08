import { createContext, useContext, useEffect, useState } from "react";

import { events } from "../helpers/events.helpers.ts";
import { createStore } from "../helpers/store.helpers.ts";
import { fastingRecordSchema } from "../schemas/fasting.schemas.ts";

import type { PropsWithChildren } from "react";
import type { FastingRecord } from "../schemas/fasting.schemas.ts";

export const fastingRecordStore = createStore({
	key: "fasting",
	schema: fastingRecordSchema,
	secureStore: false,
});

const FastingRecordContext = createContext<FastingRecord>({});

type FastingRecordProviderProps = PropsWithChildren<{
	defaultFastingRecord: FastingRecord;
}>;

export const FastingRecordProvider = ({
	children,
	defaultFastingRecord,
}: FastingRecordProviderProps) => {
	const [fastingRecord, setFastingRecord] = useState(defaultFastingRecord);

	useEffect(() => {
		const toggleFastingRecordListener = events.listen(
			"toggleFastingRecord",
			(date) => {
				setFastingRecord((oldFastingRecord) => {
					const newFastingRecord = {
						...oldFastingRecord,
						[date]: !oldFastingRecord[date],
					};

					fastingRecordStore.set(newFastingRecord);

					return newFastingRecord;
				});
			},
		);

		(async () => {
			setFastingRecord((await fastingRecordStore.get()) || {});
		})();

		return () => {
			toggleFastingRecordListener.remove();
		};
	}, []);

	return (
		<FastingRecordContext.Provider value={fastingRecord}>
			{children}
		</FastingRecordContext.Provider>
	);
};

/** Fires the toggleFastingRecord event */
export const toggleFastingRecord = (date: string) => {
	events.emit("toggleFastingRecord", date);
};

export const useFastingRecord = (): FastingRecord => {
	const fastingRecord = useContext(FastingRecordContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (fastingRecord === undefined) {
		throw new Error(
			"useFastingRecord must be used within a FastingRecordProvider",
		);
	}

	return fastingRecord;
};
