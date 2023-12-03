import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

import { events } from "../helpers/events.helpers";
import { createStore } from "../helpers/store.helpers";
import { locationSchema } from "../schemas/location.schemas";

import type { PropsWithChildren } from "react";
import type { Location } from "../schemas/location.schemas";

export const locationStore = createStore({
	key: "location",
	schema: locationSchema,
	secureStore: true,
});

const LocationContext = createContext<null | Location>(null);

type LocationProviderProps = PropsWithChildren<{
	defaultLocation: null | Location;
}>;

export const LocationProvider = ({
	defaultLocation,
	children,
}: LocationProviderProps) => {
	const rootSegment = useSegments()[1];
	const router = useRouter();

	const [location, setLocation] = useState(defaultLocation);

	useEffect(() => {
		const setLocationListener = events.listen(
			"setLocation",
			async (newLocation) => {
				const added = await locationStore.set(newLocation);
				if (!added) return;
				setLocation(newLocation);
			},
		);

		return () => {
			setLocationListener.remove();
		};
	}, []);

	useEffect(() => {
		if (!location && rootSegment !== "location") router.push("/location");
	}, [router, location, rootSegment]);

	return (
		<LocationContext.Provider value={location}>
			{children}
		</LocationContext.Provider>
	);
};

/** fires the login event to set the new user on login */
export const setLocation = (location: Location) => {
	events.emit("setLocation", location);
};

export const useLocationOrNull = (): Location | null => {
	const location = useContext(LocationContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (location === undefined)
		throw new Error("useLocation must be used within a LocationProvider");
	return location;
};

export const useLocation = (): Location => {
	const location = useContext(LocationContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (location === undefined)
		throw new Error("useLocation must be used within a LocationProvider");
	if (!location)
		throw new Error("useLocation must be after user has provided location");
	return location;
};
