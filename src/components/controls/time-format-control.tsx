import { useState } from "react";
import { Card, Menu } from "react-native-paper";

import { useI18n } from "../../contexts/i18n.context";
import { useTheme } from "../../hooks/theme.hook";
import { TIME_FORMATS } from "../../schemas/prayer-times.schemas";
import { appIconMap } from "../app/icon.component";

import type { StyleProp, ViewStyle } from "react-native";
import type { TimeFormat } from "../../schemas/prayer-times.schemas";

export type TimeFormatControlProps = {
	buttonStyle?: StyleProp<ViewStyle>;
};

export const TimeFormatControl = ({ buttonStyle }: TimeFormatControlProps) => {
	const { content } = useI18n();
	const theme = useTheme();

	const [selectedFormat, setSelectedFormat] = useState<TimeFormat>("12h");
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
						subtitle={selectedFormat}
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
						appIconMap[method === selectedFormat ? "checked" : "unchecked"]
					}
					style={{
						backgroundColor:
							method === selectedFormat
								? theme.getColor("primary", "container")
								: undefined,
						borderRadius: 6,
					}}
					onPress={() => {
						setSelectedFormat(method);
						setVisible(false);
					}}
				/>
			))}
		</Menu>
	);
};
