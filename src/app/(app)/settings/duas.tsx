import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";

const DuasSettings = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.duasSettings}
			userControl
			languageControl
			modeControl
			back
		>
			<Text>{content.pages.duasSettings}</Text>
		</ScreenWrapper>
	);
};

export default DuasSettings;
