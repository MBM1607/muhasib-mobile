import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Surface, Text } from "react-native-paper";

import { PrayerTimesBar } from "./prayer-times-bar";

import { useLocationOrNull } from "../../contexts/location.context";
import { useTheme } from "../../hooks/theme.hook";
import { Button } from "../controls/button.component";

export const PrayerTimesCard = () => {
	const router = useRouter();
	const theme = useTheme();
	const location = useLocationOrNull();

	return (
		<Surface
			style={{
				flex: 1,
				backgroundColor: theme.colors.primaryContainer,
				borderRadius: 25,
				justifyContent: "center",
				alignItems: "center",
				padding: 15,
				gap: 10,
			}}
		>
			<Text
				style={{
					fontFamily: "RobotoSlabRegular",
					fontSize: 18,
					color: theme.colors.onPrimaryContainer,
				}}
			>
				Asr
			</Text>
			<Text
				style={{
					fontFamily: "RobotoSlabBold",
					fontSize: 18,
					color: theme.colors.onPrimaryContainer,
				}}
			>
				{dayjs().format("hh:mm A")}
			</Text>
			<Button
				icon="location"
				label={location?.geoData.city || "Set Location"}
				mode="contained"
				color="surface"
				onPress={() => {
					if (location) router.push("/location/update");
					else router.push("/location/set");
				}}
			/>
			<PrayerTimesBar />
		</Surface>
	);
};
