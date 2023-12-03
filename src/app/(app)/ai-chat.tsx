import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../components/layout/screen-wrapper.component";
import { useI18n } from "../../contexts/i18n.context";

const AiChat = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.aiChat}
			settingsControl
			back
		>
			<Text>{content.pages.aiChat}</Text>
		</ScreenWrapper>
	);
};

export default AiChat;
