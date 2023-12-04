import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";

const CalendarSettings = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.calendarSettings}
			userControl
			languageControl
			modeControl
			back
		>
			<Text>{content.pages.calendarSettings}</Text>
		</ScreenWrapper>
	);
};

export default CalendarSettings;
