import { createContext, useContext, useEffect, useState } from "react";

import { events } from "../helpers/events.helpers";
import { createStore } from "../helpers/store.helpers";
import { notificationSettingsSchema } from "../schemas/notification-settings.schemas";

import type { PropsWithChildren } from "react";
import type { NotificationSettings } from "../schemas/notification-settings.schemas";

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
	fastingReminders: true,
	prayerReminders: true,
};

export const notificationSettingsStore = createStore({
	key: "notification-settings",
	schema: notificationSettingsSchema,
	secureStore: true,
});

const NotificationSettingsContext = createContext(
	DEFAULT_NOTIFICATION_SETTINGS,
);

type NotificationSettingsProviderProps = PropsWithChildren<{
	defaultNotificationSettings: NotificationSettings;
}>;

export const NotificationSettingsProvider = ({
	children,
	defaultNotificationSettings,
}: NotificationSettingsProviderProps) => {
	const [notificationSettings, setNotificationSettings] = useState(
		defaultNotificationSettings,
	);

	useEffect(() => {
		const toggleFastingReminder = events.listen("toggleFastingReminder", () => {
			setNotificationSettings((oldNotificationSettings) => {
				const newNotificationSettings = {
					...oldNotificationSettings,
					fastingReminders: !oldNotificationSettings.fastingReminders,
				};

				notificationSettingsStore.set(newNotificationSettings);
				return newNotificationSettings;
			});
		});

		const togglePrayerReminder = events.listen("togglePrayerReminder", () => {
			setNotificationSettings((oldNotificationSettings) => {
				const newNotificationSettings = {
					...oldNotificationSettings,
					prayerReminders: !oldNotificationSettings.prayerReminders,
				};

				notificationSettingsStore.set(newNotificationSettings);
				return newNotificationSettings;
			});
		});

		(async () => {
			setNotificationSettings(
				(await notificationSettingsStore.get()) ||
					DEFAULT_NOTIFICATION_SETTINGS,
			);
		})();

		return () => {
			toggleFastingReminder.remove();
			togglePrayerReminder.remove();
		};
	}, []);

	return (
		<NotificationSettingsContext.Provider value={notificationSettings}>
			{children}
		</NotificationSettingsContext.Provider>
	);
};

/** Fires the toggleFastingReminder event */
export const toggleFastingReminder = () => {
	events.emit("toggleFastingReminder");
};

/** Fires the togglePrayerReminder event */
export const togglePrayerReminder = () => {
	events.emit("togglePrayerReminder");
};

export const useNotificationSettings = (): NotificationSettings => {
	const notificationSettings = useContext(NotificationSettingsContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (notificationSettings === undefined) {
		throw new Error(
			"useNotificationSettings must be used within a NotificationSettingsProvider",
		);
	}

	return notificationSettings;
};
