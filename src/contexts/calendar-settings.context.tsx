import { createContext, useContext, useEffect, useState } from "react";

import { events } from "../helpers/events.helpers.ts";
import { createStore } from "../helpers/store.helpers.ts";
import { calendarSettingsSchema } from "../schemas/calendar-settings.schemas.ts";

import type { PropsWithChildren } from "react";
import type { CalendarSettings } from "../schemas/calendar-settings.schemas.ts";

export const DEFAULT_CALENDAR_SETTINGS: CalendarSettings = {
	hijriDateAdjustment: 0,
};

export const calendarSettingsStore = createStore({
	key: "notification-settings",
	schema: calendarSettingsSchema,
	secureStore: true,
});

const CalendarSettingsContext = createContext(DEFAULT_CALENDAR_SETTINGS);

type CalendarSettingsProviderProps = PropsWithChildren<{
	defaultCalendarSettings: CalendarSettings;
}>;

export const CalendarSettingsProvider = ({
	children,
	defaultCalendarSettings,
}: CalendarSettingsProviderProps) => {
	const [calendarSettings, setCalendarSettings] = useState(
		defaultCalendarSettings,
	);

	useEffect(() => {
		const setHijriDateAdjustmentListener = events.listen(
			"setHijriDateAdjustment",
			(hijriDateAdjustment: number) => {
				setCalendarSettings((oldCalendarSettings) => {
					const newCalendarSettings = {
						...oldCalendarSettings,
						hijriDateAdjustment,
					};

					calendarSettingsStore.set(newCalendarSettings);
					return newCalendarSettings;
				});
			},
		);

		(async () => {
			setCalendarSettings(
				(await calendarSettingsStore.get()) || DEFAULT_CALENDAR_SETTINGS,
			);
		})();

		return () => {
			setHijriDateAdjustmentListener.remove();
		};
	}, []);

	return (
		<CalendarSettingsContext.Provider value={calendarSettings}>
			{children}
		</CalendarSettingsContext.Provider>
	);
};

/** Fires the setHijriDateAdjustment event */
export const setHijriDateAdjustment = (hijriDateAdjustment: number) => {
	events.emit("setHijriDateAdjustment", hijriDateAdjustment);
};

export const useCalendarSettings = (): CalendarSettings => {
	const calendarSettings = useContext(CalendarSettingsContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (calendarSettings === undefined) {
		throw new Error(
			"useCalendarSettings must be used within a CalendarSettingsProvider",
		);
	}

	return calendarSettings;
};
