import { useRouter } from "expo-router";

import { Button } from "../../../components/controls/button.component";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";

const PrayerTimesCalculation = () => {
	const { content } = useI18n();
	const router = useRouter();

	return (
		<ScreenWrapper
			title={content.pages.prayerTimesCalculationSettings}
			back
		>
			<Button
				label={content.prayerTimesCalculationSettings.card.title}
				onPress={() => {
					router.push("/settings");
				}}
			/>
		</ScreenWrapper>
	);
};

export default PrayerTimesCalculation;
