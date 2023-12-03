import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../components/layout/screen-wrapper.component";
import { useI18n } from "../../contexts/i18n.context";

const Qibla = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.qibla}
			back
		>
			<Text>{content.pages.qibla}</Text>
		</ScreenWrapper>
	);
};

export default Qibla;
