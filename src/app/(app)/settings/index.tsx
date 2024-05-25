import { useRouter } from "expo-router";
import { View } from "react-native";
import { Card } from "react-native-paper";

import { Icon } from "../../../components/app/icon.component.tsx";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component.tsx";
import { MetaAppOptions } from "../../../components/settings/meta-app-options.tsx";
import { useI18n } from "../../../contexts/i18n.context.tsx";
import { useTheme } from "../../../hooks/theme.hook.tsx";

const Settings = () => {
	const { content } = useI18n();
	const theme = useTheme();
	const router = useRouter();

	return (
		<ScreenWrapper
			title={content.pages.settings}
			style={{
				justifyContent: "space-evenly",
				gap: 48,
				paddingHorizontal: 8,
			}}
			userControl
			languageControl
			modeControl
			back
		>
			<View style={{ gap: 8 }}>
				<Card
					onPress={() => {
						router.push("/settings/prayer-times-calculation");
					}}
				>
					<Card.Title
						title={content.prayerTimesCalculationSettings.card.title}
						titleStyle={{ textTransform: "capitalize", fontSize: 16 }}
						titleVariant="headlineSmall"
						subtitleVariant="bodySmall"
						subtitle={content.prayerTimesCalculationSettings.card.description}
						left={(props) => (
							<Icon
								{...props}
								name="prayer-times-calculation-settings"
								color={theme.colors.primary}
							/>
						)}
					/>
				</Card>
				<Card
					onPress={() => {
						router.push("/settings/calendar");
					}}
				>
					<Card.Title
						title={content.calendarSettings.card.title}
						titleStyle={{ textTransform: "capitalize", fontSize: 16 }}
						titleVariant="headlineSmall"
						subtitleVariant="bodySmall"
						subtitle={content.calendarSettings.card.description}
						left={(props) => (
							<Icon
								{...props}
								name="calendar-settings"
								color={theme.colors.primary}
							/>
						)}
					/>
				</Card>
				<Card
					onPress={() => {
						router.push("/settings/notifications");
					}}
				>
					<Card.Title
						title={content.notificationsSettings.card.title}
						titleStyle={{ textTransform: "capitalize", fontSize: 16 }}
						titleVariant="headlineSmall"
						subtitleVariant="bodySmall"
						subtitle={content.notificationsSettings.card.description}
						left={(props) => (
							<Icon
								{...props}
								name="notification-settings"
								color={theme.colors.primary}
							/>
						)}
					/>
				</Card>
				<Card
					onPress={() => {
						router.push("/settings/user");
					}}
				>
					<Card.Title
						title={content.userSettings.card.title}
						titleStyle={{ textTransform: "capitalize", fontSize: 16 }}
						titleVariant="headlineSmall"
						subtitleVariant="bodySmall"
						subtitle={content.userSettings.card.description}
						left={(props) => (
							<Icon
								{...props}
								name="user-settings"
								color={theme.colors.primary}
							/>
						)}
					/>
				</Card>
			</View>
			<MetaAppOptions />
		</ScreenWrapper>
	);
};

export default Settings;
