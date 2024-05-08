import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../components/layout/screen-wrapper.component.tsx";
import { useI18n } from "../../contexts/i18n.context.tsx";

const PrayerStatistics = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.prayerStatistics}
			settingsControl
			back
		>
			<Text>{content.pages.prayerStatistics}</Text>
		</ScreenWrapper>
	);
};

export default PrayerStatistics;
