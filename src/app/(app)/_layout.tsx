import { Slot } from "expo-router";

import { AuthProvider, authStore } from "../../contexts/auth.context.tsx";
import { CalculationSettingsProvider } from "../../contexts/calculation-settings.context.tsx";
import {
	CalendarSettingsProvider,
	DEFAULT_CALENDAR_SETTINGS,
	calendarSettingsStore,
} from "../../contexts/calendar-settings.context.tsx";
import { DuasProvider } from "../../contexts/duas.context.tsx";
import {
	FastingRecordProvider,
	fastingRecordStore,
} from "../../contexts/fasting-record.context.tsx";
import {
	LocationProvider,
	locationStore,
} from "../../contexts/location.context.tsx";
import {
	DEFAULT_NOTIFICATION_SETTINGS,
	NotificationsSettingsProvider,
	notificationsSettingsStore,
} from "../../contexts/notification-settings.context.tsx";
import { PrayerTimesProvider } from "../../contexts/prayer-times.context.tsx";
import {
	PrayersProvider,
	prayersStore,
} from "../../contexts/prayers.context.tsx";
import { QuranProvider } from "../../contexts/quran.context.tsx";
import { useStorage } from "../../hooks/storage.hook.tsx";

const RootLayout = () => {
	const [[isLoadingUser, user]] = useStorage(authStore);
	const [[isLoadingLocation, location]] = useStorage(locationStore);
	const [[isLoadingPrayers, prayers]] = useStorage(prayersStore);
	const [[isLoadingFastingRecord, fastingRecord]] =
		useStorage(fastingRecordStore);
	const [[isLoadingNotificationsSettings, notificationsSettings]] = useStorage(
		notificationsSettingsStore,
	);
	const [[isLoadingCalendarSettings, calendarSettings]] = useStorage(
		calendarSettingsStore,
	);

	if (
		isLoadingUser ||
		isLoadingLocation ||
		isLoadingPrayers ||
		isLoadingFastingRecord ||
		isLoadingNotificationsSettings ||
		isLoadingCalendarSettings
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
							<CalendarSettingsProvider
								defaultCalendarSettings={
									calendarSettings || DEFAULT_CALENDAR_SETTINGS
								}
							>
								<CalculationSettingsProvider>
									<PrayerTimesProvider>
										<DuasProvider>
											<QuranProvider>
												<Slot />
											</QuranProvider>
										</DuasProvider>
									</PrayerTimesProvider>
								</CalculationSettingsProvider>
							</CalendarSettingsProvider>
						</NotificationsSettingsProvider>
					</FastingRecordProvider>
				</PrayersProvider>
			</LocationProvider>
		</AuthProvider>
	);
};

export default RootLayout;
