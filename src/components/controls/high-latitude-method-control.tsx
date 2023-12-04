import { useState } from "react";
import { Card, Menu } from "react-native-paper";

import {
	setHighLatitudeMethod,
	useCalculationSettings,
} from "../../contexts/calculation-settings.context";
import { useI18n } from "../../contexts/i18n.context";
import { useTheme } from "../../hooks/theme.hook";
import { HIGH_LATITUDE_METHOD_NAMES } from "../../schemas/prayer-times.schemas";
import { appIconMap } from "../app/icon.component";

import type { StyleProp, ViewStyle } from "react-native";

export type HighLatitudeMethodControlProps = {
	buttonStyle?: StyleProp<ViewStyle>;
};

export const HighLatitudeMethodControl = ({
	buttonStyle,
}: HighLatitudeMethodControlProps) => {
	const { content } = useI18n();
	const theme = useTheme();
	const calculationSettings = useCalculationSettings();

	const [visible, setVisible] = useState(false);

	return (
		<Menu
			visible={visible}
			anchorPosition="bottom"
			style={{ width: "85%" }}
			contentStyle={{ padding: 8, borderRadius: 10 }}
			overlayAccessibilityLabel={
				content.prayerTimesCalculationSettings.highLatitudeMethod.overlayLabel
			}
			anchor={
				<Card
					mode="outlined"
					style={[
						{
							borderRadius: 10,
						},
						buttonStyle,
					]}
					onPress={() => {
						setVisible(true);
					}}
				>
					<Card.Title
						titleStyle={{ textTransform: "capitalize", fontSize: 16 }}
						titleVariant="headlineSmall"
						subtitleVariant="bodySmall"
						subtitle={calculationSettings.highLatitudeMethod}
						title={
							content.prayerTimesCalculationSettings.highLatitudeMethod.title
						}
					/>
				</Card>
			}
			onDismiss={() => {
				setVisible(false);
			}}
		>
			{HIGH_LATITUDE_METHOD_NAMES.map((method) => (
				<Menu.Item
					key={method}
					title={method}
					leadingIcon={
						appIconMap[
							method === calculationSettings.highLatitudeMethod
								? "checked"
								: "unchecked"
						]
					}
					style={{
						backgroundColor:
							method === calculationSettings.highLatitudeMethod
								? theme.getColor("primary", "container")
								: undefined,
						borderRadius: 6,
					}}
					onPress={() => {
						setHighLatitudeMethod(method);
						setVisible(false);
					}}
				/>
			))}
		</Menu>
	);
};
