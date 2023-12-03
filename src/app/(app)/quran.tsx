import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../components/layout/screen-wrapper.component";
import { useI18n } from "../../contexts/i18n.context";

const Quran = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.quran}
			settingsControl
			back
		>
			<Text>{content.pages.quran}</Text>
		</ScreenWrapper>
	);
};

export default Quran;
