import { useRouter } from "expo-router";
import { Linking, Share, View } from "react-native";
import { Card } from "react-native-paper";

import { Icon } from "../../../components/app/icon.component";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { STORE_URL } from "../../../constants";
import { useI18n } from "../../../contexts/i18n.context";
import { useTheme } from "../../../hooks/theme.hook";

const Settings = () => {
	const { content } = useI18n();
	const theme = useTheme();
	const router = useRouter();

	return (
		<ScreenWrapper
			title={content.pages.settings}
			style={{
				justifyContent: "space-between",
				gap: 48,
				paddingHorizontal: 8,
			}}
			userControl
			languageControl
			modeControl
			scroll
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
						router.push("/settings/duas");
					}}
				>
					<Card.Title
						title={content.duasSettings.card.title}
						titleStyle={{ textTransform: "capitalize", fontSize: 16 }}
						titleVariant="headlineSmall"
						subtitleVariant="bodySmall"
						subtitle={content.duasSettings.card.description}
						left={(props) => (
							<Icon
								{...props}
								name="duas-settings"
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
			<View style={{ gap: 8 }}>
				<Card
					onPress={() => {
						Linking.openURL(STORE_URL);
					}}
				>
					<Card.Title
						title={content.settings.rateCard.title}
						titleStyle={{ textTransform: "capitalize", fontSize: 16 }}
						titleVariant="headlineSmall"
						subtitleVariant="bodySmall"
						subtitle={content.settings.rateCard.description}
						left={(props) => (
							<Icon
								{...props}
								name="rate"
								color={theme.colors.primary}
							/>
						)}
					/>
				</Card>
				<Card
					onPress={() => {
						Share.share(
							{
								title: content.share.title,
								message: content.share.message,
								url: STORE_URL,
							},
							{
								dialogTitle: content.share.title,
							},
						);
					}}
				>
					<Card.Title
						title={content.settings.shareCard.title}
						titleStyle={{ textTransform: "capitalize", fontSize: 16 }}
						titleVariant="headlineSmall"
						subtitleVariant="bodySmall"
						subtitle={content.settings.shareCard.description}
						left={(props) => (
							<Icon
								{...props}
								name="share"
								color={theme.colors.primary}
							/>
						)}
					/>
				</Card>
				<Card
					onPress={() => {
						Linking.openURL("mailto:me@muhammadkhan.dev");
					}}
				>
					<Card.Title
						title={content.settings.contactCard.title}
						titleStyle={{ textTransform: "capitalize", fontSize: 16 }}
						titleVariant="headlineSmall"
						subtitleVariant="bodySmall"
						subtitle={content.settings.contactCard.description}
						left={(props) => (
							<Icon
								{...props}
								name="contact"
								color={theme.colors.primary}
							/>
						)}
					/>
				</Card>
			</View>
		</ScreenWrapper>
	);
};

export default Settings;
