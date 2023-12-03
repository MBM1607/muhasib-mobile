import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../components/layout/screen-wrapper.component";
import { useI18n } from "../../contexts/i18n.context";

const Fasting = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.fasting}
			settingsControl
			back
		>
			<Text>{content.pages.fasting}</Text>
		</ScreenWrapper>
	);
};

export default Fasting;
