import { View } from "react-native";
import { Text, Tooltip } from "react-native-paper";

import { usePrayerTimes } from "../../contexts/prayer-times.context";
import { useTheme } from "../../hooks/theme.hook";
import { IconButton } from "../controls/icon-button.component";

type PrayerName = "Fajr" | "Sunrise" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
type PrayerIcon = "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha";

type Prayer = {
	name: PrayerName;
	icon: PrayerIcon;
};

export const PrayerTimesBar = () => {
	const theme = useTheme();
	const prayerTimes = usePrayerTimes();
	const prayers: Prayer[] = [
		{
			name: "Fajr",
			icon: "fajr",
		},
		{
			name: "Sunrise",
			icon: "sunrise",
		},
		{
			name: "Dhuhr",
			icon: "dhuhr",
		},
		{
			name: "Asr",
			icon: "asr",
		},
		{
			name: "Maghrib",
			icon: "maghrib",
		},
		{
			name: "Isha",
			icon: "isha",
		},
	];

	return (
		<View
			style={{
				flexDirection: "row",
				gap: 5,
			}}
		>
			{prayers.map((prayer) => (
				<Tooltip
					key={prayer.name}
					title={prayer.name}
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
							icon={prayer.icon}
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
							{prayerTimes?.[prayer.icon] || "--:--"}
						</Text>
					</View>
				</Tooltip>
			))}
		</View>
	);
};
