import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";

const SetLocation = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper title={content.pages.setLocation}>
			<Text>{content.pages.setLocation}</Text>
		</ScreenWrapper>
	);
};

export default SetLocation;
