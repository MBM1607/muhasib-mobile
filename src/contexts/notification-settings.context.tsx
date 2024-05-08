import { createContext, useContext, useEffect, useState } from "react";

import { events } from "../helpers/events.helpers.ts";
import { createStore } from "../helpers/store.helpers.ts";
import { notificationsSettingsSchema } from "../schemas/notification-settings.schemas.ts";

import type { PropsWithChildren } from "react";
import type { NotificationsSettings } from "../schemas/notification-settings.schemas.ts";

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationsSettings = {
	fastingReminders: true,
	prayerReminders: true,
	announcements: true,
};

export const notificationsSettingsStore = createStore({
	key: "notification-settings",
	schema: notificationsSettingsSchema,
	secureStore: true,
});

const NotificationsSettingsContext = createContext(
	DEFAULT_NOTIFICATION_SETTINGS,
);

type NotificationsSettingsProviderProps = PropsWithChildren<{
	defaultNotificationsSettings: NotificationsSettings;
}>;

export const NotificationsSettingsProvider = ({
	children,
	defaultNotificationsSettings,
}: NotificationsSettingsProviderProps) => {
	const [notificationsSettings, setNotificationsSettings] = useState(
		defaultNotificationsSettings,
	);

	useEffect(() => {
		const toggleFastingReminder = events.listen("toggleFastingReminder", () => {
			setNotificationsSettings((oldNotificationsSettings) => {
				const newNotificationsSettings = {
					...oldNotificationsSettings,
					fastingReminders: !oldNotificationsSettings.fastingReminders,
				};

				notificationsSettingsStore.set(newNotificationsSettings);
				return newNotificationsSettings;
			});
		});

		const togglePrayerReminder = events.listen("togglePrayerReminder", () => {
			setNotificationsSettings((oldNotificationsSettings) => {
				const newNotificationsSettings = {
					...oldNotificationsSettings,
					prayerReminders: !oldNotificationsSettings.prayerReminders,
				};

				notificationsSettingsStore.set(newNotificationsSettings);
				return newNotificationsSettings;
			});
		});

		const toggleAnnouncements = events.listen("toggleAnnouncements", () => {
			setNotificationsSettings((oldNotificationsSettings) => {
				const newNotificationsSettings = {
					...oldNotificationsSettings,
					announcements: !oldNotificationsSettings.announcements,
				};

				notificationsSettingsStore.set(newNotificationsSettings);
				return newNotificationsSettings;
			});
		});

		(async () => {
			setNotificationsSettings(
				(await notificationsSettingsStore.get()) ||
					DEFAULT_NOTIFICATION_SETTINGS,
			);
		})();

		return () => {
			toggleFastingReminder.remove();
			togglePrayerReminder.remove();
			toggleAnnouncements.remove();
		};
	}, []);

	return (
		<NotificationsSettingsContext.Provider value={notificationsSettings}>
			{children}
		</NotificationsSettingsContext.Provider>
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

/** Fires the toggleAnnouncements event */
export const toggleAnnouncements = () => {
	events.emit("toggleAnnouncements");
};

export const useNotificationsSettings = (): NotificationsSettings => {
	const notificationsSettings = useContext(NotificationsSettingsContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (notificationsSettings === undefined) {
		throw new Error(
			"useNotificationsSettings must be used within a NotificationsSettingsProvider",
		);
	}

	return notificationsSettings;
};
