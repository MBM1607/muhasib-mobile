import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../components/layout/screen-wrapper.component";
import { useI18n } from "../../contexts/i18n.context";

const Prayers = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.prayers}
			back
		>
			<Text>{content.pages.prayers}</Text>
		</ScreenWrapper>
	);
};

export default Prayers;
