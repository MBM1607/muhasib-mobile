import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";

const PrayerTimesCalculation = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.prayerTimesCalculationSettings}
			userControl
			languageControl
			modeControl
			back
		>
			<Text>{content.pages.prayerTimesCalculationSettings}</Text>
		</ScreenWrapper>
	);
};

export default PrayerTimesCalculation;
