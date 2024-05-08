import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Surface, Text } from "react-native-paper";

import { PrayerTimesBar } from "./prayer-times-bar";

import { useI18n } from "../../contexts/i18n.context.tsx";
import { useLocationOrNull } from "../../contexts/location.context.tsx";
import { usePrayerTimes } from "../../contexts/prayer-times.context.tsx";
import { useTheme } from "../../hooks/theme.hook.tsx";
import { Button } from "../controls/button.component.tsx";

import type { PrayerTimeName } from "../../schemas/prayer-times.schemas.ts";

export const PrayerTimesCard = () => {
	const { content } = useI18n();
	const router = useRouter();
	const theme = useTheme();
	const location = useLocationOrNull();
	const prayerTimes = usePrayerTimes();

	const [nextPrayer, setNextPrayer] = useState<PrayerTimeName | null>(null);

	useEffect(() => {
		// Update next prayer every minute
		const timer = setInterval(() => {
			const now = dayjs();

			const prayerTimesArray = Object.values(prayerTimes).map((prayerTime) => {
				const parts = prayerTime.split(":");

				if (!parts[0] || !parts[1]) throw new Error("Invalid prayer time");

				let hour = parseInt(parts[0]);
				const minute = parseInt(parts[1]);

				// 12-hour time
				const lastParts = parts[1].split(" ");
				if (lastParts.length > 1) {
					if (lastParts[1] === "AM" && hour === 12) hour = 0;
					else if (lastParts[1] === "PM" && hour !== 12) hour += 12;
				}

				return now.hour(hour).minute(minute);
			});

			const nextPrayerTime = prayerTimesArray.find((prayerTime) =>
				prayerTime.isAfter(now),
			);

			if (nextPrayerTime) {
				const nextPrayerTimeIndex = prayerTimesArray.indexOf(nextPrayerTime);
				const nextPrayerName = Object.keys(prayerTimes)[
					nextPrayerTimeIndex
				] as PrayerTimeName;
				setNextPrayer(nextPrayerName);
			} else {
				setNextPrayer(null);
			}
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [prayerTimes]);

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
					textTransform: "capitalize",
				}}
			>
				{nextPrayer ? content.prayer[nextPrayer] : ""}
			</Text>
			<Text
				style={{
					fontFamily: "RobotoSlabBold",
					fontSize: 18,
					color: theme.colors.onPrimaryContainer,
				}}
			>
				{nextPrayer ? prayerTimes[nextPrayer] : "--:--"}
			</Text>
			<Button
				icon="location"
				label={location?.geoData.city || "Set Location"}
				mode="elevated"
				color="primary"
				onPress={() => {
					if (location) router.push("/location/update");
					else router.push("/location/set");
				}}
			/>
			<PrayerTimesBar />
		</Surface>
	);
};
