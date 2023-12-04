import { useState } from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";

import { FormSwitch } from "../../components/controls/form-switch.component";
import { ScreenWrapper } from "../../components/layout/screen-wrapper.component";
import { useI18n } from "../../contexts/i18n.context";
import { usePrayerTimes } from "../../contexts/prayer-times.context";

const Fasting = () => {
	const { content } = useI18n();
	const prayerTimes = usePrayerTimes();
	const [value, setValue] = useState<boolean>(false);

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
					value={value}
					onChange={setValue}
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
				value={value}
				hasIcon={true}
				icon="notifications"
				onChange={setValue}
			/>
		</ScreenWrapper>
	);
};

export default Fasting;
