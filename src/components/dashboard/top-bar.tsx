import { useRouter } from "expo-router";
import { View } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";

import { useCalendarSettings } from "../../contexts/calendar-settings.context.tsx";
import { dayjsExtended } from "../../helpers/date.helpers.ts";
import { useTheme } from "../../hooks/theme.hook.tsx";
import { IconButton } from "../controls/icon-button.component.tsx";

export const TopBar = () => {
	const router = useRouter();
	const theme = useTheme();
	const { hijriDateAdjustment } = useCalendarSettings();

	const today = dayjsExtended();

	return (
		<View
			style={{
				flexDirection: "row",
				gap: 25,
				justifyContent: "space-between",
				flex: 1,
			}}
		>
			<Surface
				style={{
					flex: 1,
					backgroundColor: theme.colors.primaryContainer,
					borderRadius: 25,
					overflow: "hidden",
				}}
			>
				<TouchableRipple
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={() => {
						router.push("/islamic-calendar");
					}}
				>
					<>
						<Text
							style={{
								fontFamily: "RobotoSlabBold",
								fontSize: 16,
								color: theme.colors.onPrimaryContainer,
							}}
						>
							{today
								.toCalendarSystem("islamic")
								.add(hijriDateAdjustment, "day")
								.format("Do MMMM YYYY")}
						</Text>
						<Text
							style={{
								fontFamily: "RobotoSlabRegular",
								fontSize: 16,
								color: theme.colors.onPrimaryContainer,
							}}
						>
							{today.toCalendarSystem("gregory").format("Do MMMM YYYY")}
						</Text>
					</>
				</TouchableRipple>
			</Surface>

			<Surface
				style={{
					backgroundColor: theme.colors.primaryContainer,
					borderRadius: 50,
				}}
			>
				<IconButton
					icon="settings"
					style={{
						backgroundColor: theme.colors.primaryContainer,
						flex: 1,
					}}
					onPress={() => {
						router.push("/settings");
					}}
				/>
			</Surface>
		</View>
	);
};
