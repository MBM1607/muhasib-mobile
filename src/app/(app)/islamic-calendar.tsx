import { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Surface, Text } from "react-native-paper";

import { PrayerMethod } from "../../components/app/prayer-method.component.tsx";
import { FormSwitch } from "../../components/controls/form-switch.component.tsx";
import { ScreenWrapper } from "../../components/layout/screen-wrapper.component.tsx";
import { useCalendarSettings } from "../../contexts/calendar-settings.context.tsx";
import {
	toggleFastingRecord,
	useFastingRecord,
} from "../../contexts/fasting-record.context.tsx";
import { useI18n } from "../../contexts/i18n.context.tsx";
import { usePrayers } from "../../contexts/prayers.context.tsx";
import {
	getMuslimHolidays,
	skipPrayerMarker,
} from "../../helpers/calendar.helpers.ts";
import { dayjsExtended } from "../../helpers/date.helpers.ts";
import { useTheme } from "../../hooks/theme.hook.tsx";
import {
	PERFORMABLE_PRAYERS,
	UNFILLED_PRAYER_DATA,
} from "../../schemas/prayers.schemas.ts";

import type { MarkedDates } from "react-native-calendars/src/types";
import type { PerformablePrayer } from "../../schemas/prayers.schemas.ts";

const IslamicCalendar = () => {
	const { content } = useI18n();
	const theme = useTheme();

	const fastingRecord = useFastingRecord();
	const prayers = usePrayers();
	const { hijriDateAdjustment } = useCalendarSettings();

	const [selected, setSelected] = useState(dayjsExtended());
	const [selectedFormatted, setSelectedFormatted] = useState(
		selected.format("YYYY-MM-DD"),
	);
	const [selectedInHijri, setSelectedInHijri] = useState(
		dayjsExtended().toCalendarSystem("islamic").add(hijriDateAdjustment, "day"),
	);
	const [muslimHolidays, setMuslimHolidays] = useState(
		getMuslimHolidays(selectedInHijri.year()),
	);

	const setDate = (date: string) => {
		const newDayJs = dayjsExtended(date);
		setSelected(newDayJs);
		setSelectedFormatted(date);
		const newHijri = newDayJs
			.toCalendarSystem("islamic")
			.add(hijriDateAdjustment, "day");
		setSelectedInHijri(newHijri);
		setMuslimHolidays(getMuslimHolidays(newHijri.year()));
	};

	const getMarkedDates = (): MarkedDates => {
		const markedDates: MarkedDates = {};

		const muslimHolidayStyle = {
			color: theme.colors.warning,
		};
		muslimHolidays.forEach((date) => {
			const dateInGregorian = date.gregorianDate
				.add(hijriDateAdjustment, "days")
				.format("YYYY-MM-DD");

			if (markedDates[dateInGregorian]) {
				markedDates[dateInGregorian]?.dots?.push(muslimHolidayStyle);
			} else {
				markedDates[dateInGregorian] = {
					dots: [muslimHolidayStyle],
				};
			}
		});

		const fastingStyle = {
			color: theme.colors.success,
		};
		Object.keys(fastingRecord).forEach((date) => {
			if (!fastingRecord[date]) return;

			if (markedDates[date]) {
				markedDates[date]?.dots?.push(fastingStyle);
			} else {
				markedDates[date] = {
					dots: [fastingStyle],
				};
			}
		});

		const prayerStyle = {
			color: theme.colors.primary,
		};
		Object.keys(prayers).forEach((date) => {
			if (skipPrayerMarker(prayers[date] as PerformablePrayer)) return;

			if (markedDates[date]) {
				markedDates[date]?.dots?.push(prayerStyle);
			} else {
				markedDates[date] = {
					dots: [prayerStyle],
				};
			}
		});

		return markedDates;
	};

	return (
		<ScreenWrapper
			title={content.pages.islamicCalendar}
			settingsControl
			scroll
			back
		>
			<Surface style={{ padding: 16, borderRadius: 16, marginBottom: 16 }}>
				<Text
					variant="headlineSmall"
					style={[theme.styles.text.center, { width: "100%", fontSize: 18 }]}
				>
					{selectedInHijri.toCalendarSystem("islamic").format("Do MMMM YYYY")}
				</Text>
				{muslimHolidays
					.filter((holiday) => holiday.gregorianDate.isSame(selected, "day"))
					.map((holiday) => (
						<Text
							key={holiday.name}
							variant="bodySmall"
							style={[
								theme.styles.text.center,
								{ width: "100%", fontSize: 14 },
							]}
						>
							{holiday.name}
						</Text>
					))}
			</Surface>
			<Calendar
				enableSwipeMonths={true}
				markingType="multi-dot"
				style={{
					borderRadius: 16,
					overflow: "hidden",
					elevation: 2,
					marginBottom: 16,
				}}
				theme={{
					arrowColor: theme.colors.primary,
					calendarBackground: theme.colors.surface,
					backgroundColor: theme.colors.background,
					textSectionTitleColor: theme.colors.primary,
					textDayFontFamily: theme.fonts.bodyMedium.fontFamily,
					textMonthFontFamily: theme.fonts.headlineLarge.fontFamily,
					todayButtonFontFamily: theme.fonts.headlineLarge.fontFamily,
					textDayHeaderFontFamily: theme.fonts.headlineLarge.fontFamily,
					selectedDayBackgroundColor: theme.colors.primary,
					selectedDayTextColor: theme.colors.onPrimary,
					todayTextColor: theme.colors.primary,
					dayTextColor: theme.colors.onSurfaceVariant,
					textDisabledColor: theme.colors.onSurfaceDisabled,
					monthTextColor: theme.colors.primary,
					textMonthFontSize: 21,
				}}
				headerStyle={{
					borderBottomWidth: 2,
					borderColor: theme.colors.tertiary,
				}}
				markedDates={{
					...getMarkedDates(),
					[selectedFormatted]: {
						selected: true,
						disableTouchEvent: true,
					},
				}}
				onDayPress={(day) => {
					setDate(day.dateString);
				}}
			/>
			<FormSwitch
				label={content.fasting.fastingInputLabel}
				value={fastingRecord[selectedFormatted] ?? false}
				onChange={() => {
					toggleFastingRecord(selectedFormatted);
				}}
			/>
			<View
				style={{
					gap: 8,
				}}
			>
				{PERFORMABLE_PRAYERS.map((prayer) => (
					<PrayerMethod
						key={prayer}
						date={selectedFormatted}
						prayer={prayer}
						prayerPerformMethod={
							(prayers[selectedFormatted] || UNFILLED_PRAYER_DATA)[prayer]
						}
					/>
				))}
			</View>
		</ScreenWrapper>
	);
};

export default IslamicCalendar;
