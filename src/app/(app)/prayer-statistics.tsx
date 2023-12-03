import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../components/layout/screen-wrapper.component";
import { useI18n } from "../../contexts/i18n.context";

const PrayerStatistics = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.prayerStatistics}
			back
		>
			<Text>{content.pages.prayerStatistics}</Text>
		</ScreenWrapper>
	);
};

export default PrayerStatistics;
