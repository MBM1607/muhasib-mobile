import { Linking, Share, View } from "react-native";
import { Card } from "react-native-paper";

import { STORE_URL } from "../../constants";
import { useI18n } from "../../contexts/i18n.context.tsx";
import { useTheme } from "../../hooks/theme.hook.tsx";
import { Icon } from "../app/icon.component.tsx";

export const MetaAppOptions = () => {
	const { content } = useI18n();
	const theme = useTheme();

	return (
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
	);
};
