import { useState } from "react";
import { Card, Menu } from "react-native-paper";

import {
	setAsrMethod,
	useCalculationSettings,
} from "../../contexts/calculation-settings.context.tsx";
import { useI18n } from "../../contexts/i18n.context.tsx";
import { useTheme } from "../../hooks/theme.hook.tsx";
import { ASR_JURISTIC_METHOD_NAMES } from "../../schemas/prayer-times.schemas.ts";
import { appIconMap } from "../app/icon.component.tsx";

import type { StyleProp, ViewStyle } from "react-native";

export type AsrMethodControlProps = {
	buttonStyle?: StyleProp<ViewStyle>;
};

export const AsrMethodControl = ({ buttonStyle }: AsrMethodControlProps) => {
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
				content.prayerTimesCalculationSettings.asrMethod.overlayLabel
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
						subtitle={calculationSettings.asrJuristicMethod}
						title={content.prayerTimesCalculationSettings.asrMethod.title}
					/>
				</Card>
			}
			onDismiss={() => {
				setVisible(false);
			}}
		>
			{ASR_JURISTIC_METHOD_NAMES.map((method) => (
				<Menu.Item
					key={method}
					title={method}
					titleStyle={{ textTransform: "capitalize" }}
					leadingIcon={
						appIconMap[
							method === calculationSettings.asrJuristicMethod
								? "checked"
								: "unchecked"
						]
					}
					style={{
						backgroundColor:
							method === calculationSettings.asrJuristicMethod
								? theme.getColor("primary", "container")
								: undefined,
						borderRadius: 6,
					}}
					onPress={() => {
						setAsrMethod(method);
						setVisible(false);
					}}
				/>
			))}
		</Menu>
	);
};
