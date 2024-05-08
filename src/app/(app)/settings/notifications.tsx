import { View } from "react-native";

import { FormSwitch } from "../../../components/controls/form-switch.component.tsx";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component.tsx";
import { MetaAppOptions } from "../../../components/settings/meta-app-options";
import { useI18n } from "../../../contexts/i18n.context.tsx";
import {
	toggleAnnouncements,
	toggleFastingReminder,
	togglePrayerReminder,
	useNotificationsSettings,
} from "../../../contexts/notification-settings.context.tsx";

const NotificationsSettings = () => {
	const { content } = useI18n();
	const notificationsSettings = useNotificationsSettings();

	return (
		<ScreenWrapper
			title={content.pages.notificationsSettings}
			style={{
				paddingHorizontal: 16,
				gap: 8,
				paddingTop: 16,
				justifyContent: "space-between",
			}}
			back
		>
			<View style={{ gap: 8 }}>
				<FormSwitch
					label={content.prayers.enableNotification.title}
					caption={content.prayers.enableNotification.caption}
					value={notificationsSettings.prayerReminders}
					hasIcon={true}
					icon="notifications"
					onChange={() => {
						togglePrayerReminder();
					}}
				/>
				<FormSwitch
					label={content.fasting.enableNotification.title}
					caption={content.fasting.enableNotification.caption}
					value={notificationsSettings.fastingReminders}
					hasIcon={true}
					icon="notifications"
					onChange={() => {
						toggleFastingReminder();
					}}
				/>
				<FormSwitch
					label={content.notificationsSettings.enableAnnouncements.title}
					caption={content.notificationsSettings.enableAnnouncements.caption}
					value={notificationsSettings.announcements}
					hasIcon={true}
					icon="notifications"
					onChange={() => {
						toggleAnnouncements();
					}}
				/>
			</View>
			<MetaAppOptions />
		</ScreenWrapper>
	);
};

export default NotificationsSettings;
