import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";

const FastingSettings = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.fastingSettings}
			userControl
			languageControl
			modeControl
			back
		>
			<Text>{content.pages.fastingSettings}</Text>
		</ScreenWrapper>
	);
};

export default FastingSettings;
