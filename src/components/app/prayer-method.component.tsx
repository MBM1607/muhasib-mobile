import { useState } from "react";
import { Menu, Surface, Text, TouchableRipple } from "react-native-paper";

import { Icon, appIconMap } from "./icon.component";

import { useI18n } from "../../contexts/i18n.context";
import { performPrayer } from "../../contexts/prayers.context";
import { useTheme } from "../../hooks/theme.hook";
import { PRAYER_PERFORM_METHODS } from "../../schemas/prayers.schemas";

import type {
	PerformablePrayerName,
	PrayerPerformMethod,
} from "../../schemas/prayers.schemas";

export type PrayerMethodProps = {
	date: string;
	prayer: PerformablePrayerName;
	prayerPerformMethod: PrayerPerformMethod;
};

export const PrayerMethod = ({
	date,
	prayer,
	prayerPerformMethod,
}: PrayerMethodProps) => {
	const { content, rtl } = useI18n();
	const theme = useTheme();
	const [visible, setVisible] = useState<boolean>(false);

	return (
		<Menu
			visible={visible}
			anchorPosition="bottom"
			style={{ width: "90%" }}
			contentStyle={{ padding: 8, borderRadius: 10 }}
			overlayAccessibilityLabel={"Select"}
			anchor={
				<Surface
					mode="elevated"
					style={{
						borderRadius: 8,
						overflow: "hidden",
					}}
				>
					<TouchableRipple
						style={{
							gap: 8,
							padding: 8,
							paddingHorizontal: 16,
							flexDirection: rtl ? "row-reverse" : "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
						onPress={() => {
							setVisible(true);
						}}
					>
						<>
							<Text
								variant="headlineSmall"
								style={{
									flexGrow: 1,
									fontSize: 16,
								}}
							>
								{content.prayer[prayer]}
							</Text>
							<Icon
								size={28}
								name={prayerPerformMethod}
								color={
									prayerPerformMethod === "Not Performed"
										? theme.colors.error
										: prayerPerformMethod === "Qadha"
										  ? theme.colors.warning
										  : prayerPerformMethod === "Infradi"
										    ? theme.colors.tertiary
										    : theme.colors.success
								}
							/>
							<Text
								variant="headlineSmall"
								style={{
									fontSize: 16,
								}}
							>
								{content.prayerPerformMethod[prayerPerformMethod]}
							</Text>
						</>
					</TouchableRipple>
				</Surface>
			}
			onDismiss={() => {
				setVisible(false);
			}}
		>
			{PRAYER_PERFORM_METHODS.map((method) => (
				<Menu.Item
					key={`${prayer}-${method}`}
					title={content.prayerPerformMethod[method]}
					titleStyle={{ textTransform: "capitalize" }}
					leadingIcon={
						appIconMap[method === prayerPerformMethod ? "checked" : "unchecked"]
					}
					style={{
						backgroundColor:
							method === prayerPerformMethod
								? theme.getColor("primary", "container")
								: undefined,
						borderRadius: 6,
					}}
					onPress={() => {
						performPrayer(date, prayer, method);
						setVisible(false);
					}}
				/>
			))}
		</Menu>
	);
};
