import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { Icon } from "../../components/app/icon.component";
import { PrayerMethod } from "../../components/app/prayer-method.component";
import { IconButton } from "../../components/controls/icon-button.component";
import { ScreenWrapper } from "../../components/layout/screen-wrapper.component";
import { useI18n } from "../../contexts/i18n.context";
import { usePrayers } from "../../contexts/prayers.context";
import { useTheme } from "../../hooks/theme.hook";
import {
	PERFORMABLE_PRAYERS,
	UNFILLED_PRAYER_DATA,
} from "../../schemas/prayers.schemas";

import type { PerformablePrayer } from "../../schemas/prayers.schemas";

type PerformedPercentage = "0%" | "20%" | "40%" | "60%" | "80%" | "100%";

const Prayers = () => {
	const { content } = useI18n();
	const theme = useTheme();
	const prayers = usePrayers();
	const [datePrayers, setDatePrayers] =
		useState<PerformablePrayer>(UNFILLED_PRAYER_DATA);
	const [performedPercentage, setPerformedPercentage] =
		useState<PerformedPercentage>("0%");
	const today = dayjs();
	const [date, setDate] = useState(today);

	useEffect(() => {
		const todaysPrayers = {
			...UNFILLED_PRAYER_DATA,
			...prayers[date.format("YYYY-MM-DD")],
		};
		setDatePrayers(todaysPrayers);
		const newPercentage = `${Math.round(
			(Object.values(todaysPrayers).filter(
				(prayerPerformMethod) => prayerPerformMethod !== "Not Performed",
			).length /
				PERFORMABLE_PRAYERS.length) *
				100,
		)}%` as PerformedPercentage;
		setPerformedPercentage(newPercentage);
	}, [date, prayers]);

	return (
		<ScreenWrapper
			title={content.pages.prayers}
			style={[
				theme.styles.view.centeredScreen,
				{
					paddingTop: 16,
				},
			]}
			settingsControl
			back
		>
			<View style={theme.styles.view.row}>
				<IconButton
					icon="arrow-back"
					mode="outlined"
					iconColor={theme.colors.primary}
					style={{
						borderColor: theme.colors.primary,
					}}
					onPress={() => {
						setDate(date.subtract(1, "day"));
					}}
				/>
				<Text
					variant="headlineSmall"
					style={{
						flexGrow: 1,
						textAlign: "center",
					}}
				>
					{date.format("YYYY-MM-DD")}
				</Text>
				<IconButton
					icon="arrow-next"
					mode="outlined"
					disabled={date.isSame(today, "day")}
					iconColor={theme.colors.primary}
					style={
						date.isSame(today, "day")
							? undefined
							: {
									borderColor: theme.colors.primary,
							  }
					}
					onPress={() => {
						setDate(date.add(1, "day"));
					}}
				/>
			</View>
			<View>
				<Text
					variant="headlineSmall"
					style={theme.styles.text.center}
				>
					{performedPercentage}
				</Text>
				<Icon
					size={124}
					name={performedPercentage}
					color={
						performedPercentage === "100%"
							? theme.colors.success
							: performedPercentage === "80%"
							  ? theme.colors.tertiary
							  : performedPercentage === "60%"
							    ? theme.colors.tertiary
							    : performedPercentage === "40%"
							      ? theme.colors.warning
							      : performedPercentage === "20%"
							        ? theme.colors.warning
							        : theme.colors.error
					}
				/>
			</View>
			<View
				style={{
					flexGrow: 1,
					marginTop: 16,
					width: "100%",
					gap: 8,
				}}
			>
				{PERFORMABLE_PRAYERS.map((prayer) => (
					<PrayerMethod
						key={prayer}
						date={date.format("YYYY-MM-DD")}
						prayer={prayer}
						prayerPerformMethod={datePrayers[prayer]}
					/>
				))}
			</View>
		</ScreenWrapper>
	);
};

export default Prayers;
