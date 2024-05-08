import { createContext, useContext, useEffect, useState } from "react";

import { events } from "../helpers/events.helpers.ts";

import type { PropsWithChildren } from "react";
import type {
	AsrJuristicMethodName,
	CalculationMethodName,
	CalculationSettings,
	HighLatitudeMethod,
	TimeFormat,
} from "../schemas/prayer-times.schemas.ts";

const DEFAULT_CALCULATION_SETTINGS: CalculationSettings = {
	calculationMethod: "Muslim World League",
	asrJuristicMethod: "Standard",
	midnightMode: "Standard",
	highLatitudeMethod: "NightMiddle",
	timeFormat: "12h",
	imsakAdjustment: {
		type: "minutes",
		value: 10,
	},
	dhuhrAdjustment: {
		type: "minutes",
		value: 0,
	},
};
const CalculationSettingsContext = createContext<CalculationSettings>(
	DEFAULT_CALCULATION_SETTINGS,
);

type CalculationSettingsProviderProps = PropsWithChildren;

export const CalculationSettingsProvider = ({
	children,
}: CalculationSettingsProviderProps) => {
	const [calculationSettings, setCalculationSettings] =
		useState<CalculationSettings>(DEFAULT_CALCULATION_SETTINGS);

	useEffect(() => {
		const setCalculationMethodListener = events.listen(
			"setCalculationMethod",
			(method: CalculationMethodName) => {
				setCalculationSettings((settings) => ({
					...settings,
					calculationMethod: method,
				}));
			},
		);

		const setAsrMethodListener = events.listen(
			"setAsrMethod",
			(method: AsrJuristicMethodName) => {
				setCalculationSettings((settings) => ({
					...settings,
					asrJuristicMethod: method,
				}));
			},
		);

		const setHighLatitudeMethodListener = events.listen(
			"setHighLatitudeMethod",
			(method: HighLatitudeMethod) => {
				setCalculationSettings((settings) => ({
					...settings,
					highLatitudeMethod: method,
				}));
			},
		);

		const setTimeFormatListener = events.listen(
			"setTimeFormat",
			(format: TimeFormat) => {
				setCalculationSettings((settings) => ({
					...settings,
					timeFormat: format,
				}));
			},
		);

		return () => {
			setCalculationMethodListener.remove();
			setAsrMethodListener.remove();
			setHighLatitudeMethodListener.remove();
			setTimeFormatListener.remove();
		};
	}, []);

	return (
		<CalculationSettingsContext.Provider value={calculationSettings}>
			{children}
		</CalculationSettingsContext.Provider>
	);
};

/** fires the setCalculationMethod event **/
export const setCalculationMethod = (method: CalculationMethodName) => {
	events.emit("setCalculationMethod", method);
};

/** fires the setAsrMethod event **/
export const setAsrMethod = (method: AsrJuristicMethodName) => {
	events.emit("setAsrMethod", method);
};

/** fires the setHighLatitudeMethod event **/
export const setHighLatitudeMethod = (method: HighLatitudeMethod) => {
	events.emit("setHighLatitudeMethod", method);
};

/** fires the setTimeFormat event **/
export const setTimeFormat = (format: TimeFormat) => {
	events.emit("setTimeFormat", format);
};

export const useCalculationSettings = (): CalculationSettings => {
	const calculationsettings = useContext(CalculationSettingsContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (calculationsettings === undefined) {
		throw new Error(
			"useCalculationSettings must be used within a CalculationSettingsProvider",
		);
	}
	return calculationsettings;
};
