import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../components/layout/screen-wrapper.component";
import { useI18n } from "../../contexts/i18n.context";

const Menu = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.menu}
			back
		>
			<Text>{content.pages.menu}</Text>
		</ScreenWrapper>
	);
};

export default Menu;
