import { Slot } from "expo-router";

import { AuthProvider, authStore } from "../../contexts/auth.context";
import { CalculationSettingsProvider } from "../../contexts/calculation-settings.context";
import {
	FastingRecordProvider,
	fastingRecordStore,
} from "../../contexts/fasting-record.context";
import {
	LocationProvider,
	locationStore,
} from "../../contexts/location.context";
import {
	DEFAULT_NOTIFICATION_SETTINGS,
	NotificationsSettingsProvider,
	notificationsSettingsStore,
} from "../../contexts/notification-settings.context";
import { PrayerTimesProvider } from "../../contexts/prayer-times.context";
import { PrayersProvider, prayersStore } from "../../contexts/prayers.context";
import { useStorage } from "../../hooks/storage.hook";

const RootLayout = () => {
	const [[isLoadingUser, user]] = useStorage(authStore);
	const [[isLoadingLocation, location]] = useStorage(locationStore);
	const [[isLoadingPrayers, prayers]] = useStorage(prayersStore);
	const [[isLoadingFastingRecord, fastingRecord]] =
		useStorage(fastingRecordStore);
	const [[isLoadingNotificationsSettings, notificationsSettings]] = useStorage(
		notificationsSettingsStore,
	);

	if (
		isLoadingUser ||
		isLoadingLocation ||
		isLoadingPrayers ||
		isLoadingFastingRecord ||
		isLoadingNotificationsSettings
	)
		return null;

	return (
		<AuthProvider defaultUser={user}>
			<LocationProvider defaultLocation={location}>
				<PrayersProvider defaultPrayers={prayers || {}}>
					<FastingRecordProvider defaultFastingRecord={fastingRecord || {}}>
						<NotificationsSettingsProvider
							defaultNotificationsSettings={
								notificationsSettings || DEFAULT_NOTIFICATION_SETTINGS
							}
						>
							<CalculationSettingsProvider>
								<PrayerTimesProvider>
									<Slot />
								</PrayerTimesProvider>
							</CalculationSettingsProvider>
						</NotificationsSettingsProvider>
					</FastingRecordProvider>
				</PrayersProvider>
			</LocationProvider>
		</AuthProvider>
	);
};

export default RootLayout;
