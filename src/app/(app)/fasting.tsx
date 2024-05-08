import { View } from "react-native";
import { Card } from "react-native-paper";

import { FormSwitch } from "../../components/controls/form-switch.component.tsx";
import { ScreenWrapper } from "../../components/layout/screen-wrapper.component.tsx";
import {
	toggleFastingRecord,
	useFastingRecord,
} from "../../contexts/fasting-record.context.tsx";
import { useI18n } from "../../contexts/i18n.context.tsx";
import {
	toggleFastingReminder,
	useNotificationsSettings,
} from "../../contexts/notification-settings.context.tsx";
import { usePrayerTimes } from "../../contexts/prayer-times.context.tsx";
import { dayjsExtended } from "../../helpers/date.helpers.ts";

const Fasting = () => {
	const { content } = useI18n();
	const prayerTimes = usePrayerTimes();
	const today = dayjsExtended().format("YYYY-MM-DD");
	const fastingRecord = useFastingRecord();
	const notificationsSettings = useNotificationsSettings();

	return (
		<ScreenWrapper
			title={content.pages.fasting}
			style={{ justifyContent: "space-between" }}
			settingsControl
			back
		>
			<View>
				<FormSwitch
					label={content.fasting.fastingInputLabel}
					value={fastingRecord[today] ?? false}
					onChange={() => {
						toggleFastingRecord(today);
					}}
				/>
				<Card>
					<Card.Title
						title={content.fasting.timeTable}
						titleVariant="headlineSmall"
					/>
					<Card.Content>
						<Card.Title
							title={content.prayer.imsak}
							subtitle={prayerTimes.imsak}
							titleVariant="headlineSmall"
							titleStyle={{ fontSize: 16 }}
							subtitleVariant="bodySmall"
							subtitleStyle={{ fontSize: 14 }}
						/>
						<Card.Title
							title={content.prayer.fajr}
							subtitle={prayerTimes.fajr}
							titleVariant="headlineSmall"
							titleStyle={{ fontSize: 16 }}
							subtitleVariant="bodySmall"
							subtitleStyle={{ fontSize: 14 }}
						/>
						<Card.Title
							title={content.prayer.sunset}
							subtitle={prayerTimes.sunset}
							titleVariant="headlineSmall"
							titleStyle={{ fontSize: 16 }}
							subtitleVariant="bodySmall"
							subtitleStyle={{ fontSize: 14 }}
						/>
						<Card.Title
							title={content.prayer.maghrib}
							subtitle={prayerTimes.maghrib}
							titleVariant="headlineSmall"
							titleStyle={{ fontSize: 16 }}
							subtitleVariant="bodySmall"
							subtitleStyle={{ fontSize: 14 }}
						/>
					</Card.Content>
				</Card>
			</View>
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
		</ScreenWrapper>
	);
};

export default Fasting;
