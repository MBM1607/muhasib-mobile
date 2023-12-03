import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../components/layout/screen-wrapper.component";
import { useI18n } from "../../contexts/i18n.context";

const IslamicCalendar = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.islamicCalendar}
			back
		>
			<Text>{content.pages.islamicCalendar}</Text>
		</ScreenWrapper>
	);
};

export default IslamicCalendar;