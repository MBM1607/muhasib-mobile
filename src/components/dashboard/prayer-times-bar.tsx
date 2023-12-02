import { View } from "react-native";
import { Text, Tooltip } from "react-native-paper";

import { useTheme } from "../../hooks/theme.hook";
import { IconButton } from "../controls/icon-button.component";

type PrayerName = "Fajr" | "Sunrise" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
type PrayerIcon = "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha";

type Prayer = {
	name: PrayerName;
	icon: PrayerIcon;
	time: string;
};

export const PrayerTimesBar = () => {
	const theme = useTheme();
	const prayers: Prayer[] = [
		{
			name: "Fajr",
			icon: "fajr",
			time: "5:30 AM",
		},
		{
			name: "Sunrise",
			icon: "sunrise",
			time: "6:30 AM",
		},
		{
			name: "Dhuhr",
			icon: "dhuhr",
			time: "1:30 PM",
		},
		{
			name: "Asr",
			icon: "asr",
			time: "5:30 PM",
		},
		{
			name: "Maghrib",
			icon: "maghrib",
			time: "6:30 PM",
		},
		{
			name: "Isha",
			icon: "isha",
			time: "7:30 PM",
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
							{prayer.time}
						</Text>
					</View>
				</Tooltip>
			))}
		</View>
	);
};
