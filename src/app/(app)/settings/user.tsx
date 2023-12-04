import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";

const UserSettings = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.userSettings}
			userControl
			languageControl
			modeControl
			back
		>
			<Text>{content.pages.userSettings}</Text>
		</ScreenWrapper>
	);
};

export default UserSettings;
