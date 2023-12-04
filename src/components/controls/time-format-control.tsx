import { useState } from "react";
import { Card, Menu } from "react-native-paper";

import {
	setTimeFormat,
	useCalculationSettings,
} from "../../contexts/calculation-settings.context";
import { useI18n } from "../../contexts/i18n.context";
import { useTheme } from "../../hooks/theme.hook";
import { TIME_FORMATS } from "../../schemas/prayer-times.schemas";
import { appIconMap } from "../app/icon.component";

import type { StyleProp, ViewStyle } from "react-native";

export type TimeFormatControlProps = {
	buttonStyle?: StyleProp<ViewStyle>;
};

export const TimeFormatControl = ({ buttonStyle }: TimeFormatControlProps) => {
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
				content.prayerTimesCalculationSettings.timeFormat.overlayLabel
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
						subtitle={calculationSettings.timeFormat}
						title={content.prayerTimesCalculationSettings.timeFormat.title}
					/>
				</Card>
			}
			onDismiss={() => {
				setVisible(false);
			}}
		>
			{TIME_FORMATS.map((method) => (
				<Menu.Item
					key={method}
					title={method}
					titleStyle={{ textTransform: "capitalize" }}
					leadingIcon={
						appIconMap[
							method === calculationSettings.timeFormat
								? "checked"
								: "unchecked"
						]
					}
					style={{
						backgroundColor:
							method === calculationSettings.timeFormat
								? theme.getColor("primary", "container")
								: undefined,
						borderRadius: 6,
					}}
					onPress={() => {
						setTimeFormat(method);
						setVisible(false);
					}}
				/>
			))}
		</Menu>
	);
};
