import * as Notifications from "expo-notifications";

export const schedulePrayerStartTimeNotification = (
	title: string,
	startTime: string,
) => {
	console.info(`"${title}" notification scheduled for ${startTime}`);
	let hour = Number(startTime.split(":")[0] as string);
	if (startTime.includes("PM")) {
		hour += 12;
	}
	const minute = Number(
		startTime.replace(/(AM|PM)/gu, "").split(":")[1] as string,
	);

	Notifications.scheduleNotificationAsync({
		content: {
			title,
			sound: "azan.mp3",
		},
		trigger: {
			date: new Date().setHours(hour, minute, 0, 0),
		},
	});
};

export const cancelAllNotifications = () => {
	Notifications.cancelAllScheduledNotificationsAsync();
};
