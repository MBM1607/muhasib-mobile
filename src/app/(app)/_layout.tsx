import { Slot } from "expo-router";

import { AuthProvider, authStore } from "../../contexts/auth.context";
import {
	LocationProvider,
	locationStore,
} from "../../contexts/location.context";
import { PrayerTimesProvider } from "../../contexts/prayer-times.context";
import { useStorage } from "../../hooks/storage.hook";

const RootLayout = () => {
	const [[isLoadingUser, user]] = useStorage(authStore);
	const [[isLoadingLocation, location]] = useStorage(locationStore);

	if (isLoadingUser || isLoadingLocation) return null;

	return (
		<AuthProvider defaultUser={user}>
			<LocationProvider defaultLocation={location}>
				<PrayerTimesProvider>
					<Slot />
				</PrayerTimesProvider>
			</LocationProvider>
		</AuthProvider>
	);
};

export default RootLayout;
