import { useState } from "react";
import { Card, Menu } from "react-native-paper";

import {
	setCalculationMethod,
	useCalculationSettings,
} from "../../contexts/calculation-settings.context.tsx";
import { useI18n } from "../../contexts/i18n.context.tsx";
import { useTheme } from "../../hooks/theme.hook.tsx";
import { CALCULATION_METHOD_NAMES } from "../../schemas/prayer-times.schemas.ts";
import { appIconMap } from "../app/icon.component.tsx";

import type { StyleProp, ViewStyle } from "react-native";

export type PrayerCalculationMethodControlProps = {
	buttonStyle?: StyleProp<ViewStyle>;
};

export const PrayerCalculationMethodControl = ({
	buttonStyle,
}: PrayerCalculationMethodControlProps) => {
	const { content } = useI18n();
	const theme = useTheme();
	const calculationSettings = useCalculationSettings();

	const [visible, setVisible] = useState(false);

	// TODO - Find a way to fix the issue of menu text overflowing, at the moment
	// it is being truncated with ellipsis. Which isn't ideal, ideally it should be horizontally
	// scrollable.
	// TODO - Add option to give a custom method
	return (
		<Menu
			visible={visible}
			anchorPosition="bottom"
			style={{ width: "85%" }}
			contentStyle={{ padding: 8, borderRadius: 10 }}
			overlayAccessibilityLabel={
				content.prayerTimesCalculationSettings.calculationMethod.overlayLabel
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
						subtitle={calculationSettings.calculationMethod}
						title={
							content.prayerTimesCalculationSettings.calculationMethod.title
						}
					/>
				</Card>
			}
			onDismiss={() => {
				setVisible(false);
			}}
		>
			{CALCULATION_METHOD_NAMES.map((method) => (
				<Menu.Item
					key={method}
					title={method}
					titleStyle={{ textTransform: "capitalize" }}
					leadingIcon={
						appIconMap[
							method === calculationSettings.calculationMethod
								? "checked"
								: "unchecked"
						]
					}
					style={{
						backgroundColor:
							method === calculationSettings.calculationMethod
								? theme.getColor("primary", "container")
								: undefined,
						borderRadius: 6,
					}}
					onPress={() => {
						setCalculationMethod(method);
						setVisible(false);
					}}
				/>
			))}
		</Menu>
	);
};
