import { View } from "react-native";
import { Text, Tooltip } from "react-native-paper";

import { useI18n } from "../../contexts/i18n.context.tsx";
import { usePrayerTimes } from "../../contexts/prayer-times.context.tsx";
import { useTheme } from "../../hooks/theme.hook.tsx";
import { IconButton } from "../controls/icon-button.component.tsx";

export const PrayerTimesBar = () => {
	const { content } = useI18n();
	const theme = useTheme();
	const prayerTimes = usePrayerTimes();
	const prayers = [
		"fajr",
		"sunrise",
		"dhuhr",
		"asr",
		"maghrib",
		"isha",
	] as const;

	return (
		<View
			style={{
				flexDirection: "row",
				gap: 5,
			}}
		>
			{prayers.map((prayer) => (
				<Tooltip
					key={prayer}
					title={content.prayer[prayer]}
					enterTouchDelay={0}
					leaveTouchDelay={1500}
				>
					<View
						style={{
							flexDirection: "column",
							gap: 5,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<IconButton
							icon={prayer}
							size={16}
							style={{
								backgroundColor: theme.colors.onPrimary,
							}}
						/>
						<Text
							style={{
								fontFamily: "RobotoSlabBold",
								fontSize: 10,
								color: theme.colors.onPrimaryContainer,
							}}
						>
							{prayerTimes[prayer] || "--:--"}
						</Text>
					</View>
				</Tooltip>
			))}
		</View>
	);
};
