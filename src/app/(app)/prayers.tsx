import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Surface, Text } from "react-native-paper";

import { Icon } from "../../components/app/icon.component.tsx";
import { PrayerMethod } from "../../components/app/prayer-method.component.tsx";
import { FormSwitch } from "../../components/controls/form-switch.component.tsx";
import { IconButton } from "../../components/controls/icon-button.component.tsx";
import { ScreenWrapper } from "../../components/layout/screen-wrapper.component.tsx";
import { useCalendarSettings } from "../../contexts/calendar-settings.context.tsx";
import { useI18n } from "../../contexts/i18n.context.tsx";
import {
	togglePrayerReminder,
	useNotificationsSettings,
} from "../../contexts/notification-settings.context.tsx";
import { usePrayers } from "../../contexts/prayers.context.tsx";
import { useTheme } from "../../hooks/theme.hook.tsx";
import {
	PERFORMABLE_PRAYERS,
	UNFILLED_PRAYER_DATA,
} from "../../schemas/prayers.schemas.ts";

import type { PerformablePrayer } from "../../schemas/prayers.schemas.ts";

type PerformedPercentage = "0%" | "20%" | "40%" | "60%" | "80%" | "100%";

const Prayers = () => {
	const { content } = useI18n();
	const theme = useTheme();
	const prayers = usePrayers();
	const notificationsSettings = useNotificationsSettings();
	const { hijriDateAdjustment } = useCalendarSettings();

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
			<Surface
				style={[
					theme.styles.view.row,
					{
						borderRadius: 16,
						paddingVertical: 8,
					},
				]}
			>
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
				<View
					style={{
						flexGrow: 1,
					}}
				>
					<Text
						variant="headlineSmall"
						style={{
							textAlign: "center",
							fontSize: 18,
						}}
					>
						{date
							.toCalendarSystem("islamic")
							.add(hijriDateAdjustment, "day")
							.format("Do MMMM YYYY")}
					</Text>
					<Text
						variant="bodyMedium"
						style={{
							textAlign: "center",
							fontSize: 14,
						}}
					>
						{date.toCalendarSystem("gregory").format("Do MMMM YYYY")}
					</Text>
				</View>
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
			</Surface>
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
			<FormSwitch
				label={content.prayers.enableNotification.title}
				caption={content.prayers.enableNotification.caption}
				value={notificationsSettings.prayerReminders}
				hasIcon={true}
				icon="notifications"
				onChange={() => {
					togglePrayerReminder();
				}}
			/>
		</ScreenWrapper>
	);
};

export default Prayers;
