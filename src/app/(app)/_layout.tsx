import { Slot } from "expo-router";

import { AuthProvider, authStore } from "../../contexts/auth.context";
import { CalculationSettingsProvider } from "../../contexts/calculation-settings.context";
import {
	LocationProvider,
	locationStore,
} from "../../contexts/location.context";
import { PrayerTimesProvider } from "../../contexts/prayer-times.context";
import { PrayersProvider, prayersStore } from "../../contexts/prayers.context";
import { useStorage } from "../../hooks/storage.hook";

const RootLayout = () => {
	const [[isLoadingUser, user]] = useStorage(authStore);
	const [[isLoadingLocation, location]] = useStorage(locationStore);
	const [[isLoadingPrayers, prayers]] = useStorage(prayersStore);

	if (isLoadingUser || isLoadingLocation || isLoadingPrayers) return null;

	return (
		<AuthProvider defaultUser={user}>
			<LocationProvider defaultLocation={location}>
				<PrayersProvider defaultPrayers={prayers || {}}>
					<CalculationSettingsProvider>
						<PrayerTimesProvider>
							<Slot />
						</PrayerTimesProvider>
					</CalculationSettingsProvider>
				</PrayersProvider>
			</LocationProvider>
		</AuthProvider>
	);
};

export default RootLayout;
