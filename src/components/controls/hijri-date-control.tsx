import { useState } from "react";
import { Card, Menu } from "react-native-paper";

import {
	setHijriDateAdjustment,
	useCalendarSettings,
} from "../../contexts/calendar-settings.context";
import { useI18n } from "../../contexts/i18n.context";
import { useTheme } from "../../hooks/theme.hook";
import { appIconMap } from "../app/icon.component";

import type { StyleProp, ViewStyle } from "react-native";

export type HijriDateControlProps = {
	buttonStyle?: StyleProp<ViewStyle>;
};

export const HijriDateControl = ({ buttonStyle }: HijriDateControlProps) => {
	const { content } = useI18n();
	const theme = useTheme();
	const { hijriDateAdjustment } = useCalendarSettings();

	const [visible, setVisible] = useState(false);

	return (
		<Menu
			visible={visible}
			anchorPosition="bottom"
			style={{ width: "85%" }}
			contentStyle={{ padding: 8, borderRadius: 10 }}
			overlayAccessibilityLabel={
				content.calendarSettings.hijriAdjustment.overlayLabel
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
						subtitle={hijriDateAdjustment.toString()}
						title={content.calendarSettings.hijriAdjustment.title}
					/>
				</Card>
			}
			onDismiss={() => {
				setVisible(false);
			}}
		>
			{[-2, -1, 0, 1, 2].map((adjustment) => (
				<Menu.Item
					key={adjustment}
					title={adjustment}
					titleStyle={{ textTransform: "capitalize" }}
					leadingIcon={
						appIconMap[
							adjustment === hijriDateAdjustment ? "checked" : "unchecked"
						]
					}
					style={{
						backgroundColor:
							adjustment === hijriDateAdjustment
								? theme.getColor("primary", "container")
								: undefined,
						borderRadius: 6,
					}}
					onPress={() => {
						setHijriDateAdjustment(adjustment);
						setVisible(false);
					}}
				/>
			))}
		</Menu>
	);
};
