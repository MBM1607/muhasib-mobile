import { AsrMethodControl } from "../../../components/controls/asr-method-control";
import { HighLatitudeMethodControl } from "../../../components/controls/high-latitude-method-control";
import { PrayerCalculationMethodControl } from "../../../components/controls/prayer-calculation-method-control.component";
import { TimeFormatControl } from "../../../components/controls/time-format-control";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";

// TODO - Add button to reset all values to default
// TODO - Add imsak, and fajr options
// TODO - Add midnight mode option
// TODO - Add option to give a custom method
// TODO - Add jummah time option
// TODO - Add manual time adjustments option
const PrayerTimesCalculation = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.prayerTimesCalculationSettings}
			style={{ paddingHorizontal: 16, gap: 8 }}
			back
		>
			<PrayerCalculationMethodControl />
			<AsrMethodControl />
			<HighLatitudeMethodControl />
			<TimeFormatControl />
		</ScreenWrapper>
	);
};

export default PrayerTimesCalculation;
