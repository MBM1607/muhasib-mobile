import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../components/layout/screen-wrapper.component";
import { useI18n } from "../../contexts/i18n.context";

const Duas = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.duas}
			back
		>
			<Text>{content.pages.duas}</Text>
		</ScreenWrapper>
	);
};

export default Duas;
