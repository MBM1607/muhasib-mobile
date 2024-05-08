import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component.tsx";
import { MetaAppOptions } from "../../../components/settings/meta-app-options";
import { useI18n } from "../../../contexts/i18n.context.tsx";

const DuasSettings = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.duasSettings}
			style={{
				paddingHorizontal: 16,
				gap: 8,
				paddingTop: 16,
				justifyContent: "space-between",
			}}
			back
		>
			<Text>{content.pages.duasSettings}</Text>
			<MetaAppOptions />
		</ScreenWrapper>
	);
};

export default DuasSettings;
