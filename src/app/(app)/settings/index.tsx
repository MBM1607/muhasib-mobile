import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";

const Settings = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.settings}
			userControl
			languageControl
			modeControl
			back
		>
			<Text>{content.pages.settings}</Text>
		</ScreenWrapper>
	);
};

export default Settings;
