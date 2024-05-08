import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component.tsx";
import { MetaAppOptions } from "../../../components/settings/meta-app-options";
import { useI18n } from "../../../contexts/i18n.context.tsx";

const UserSettings = () => {
	const { content } = useI18n();

	return (
		<ScreenWrapper
			title={content.pages.userSettings}
			style={{
				paddingHorizontal: 16,
				gap: 8,
				paddingTop: 16,
				justifyContent: "space-between",
			}}
			back
		>
			<Text>{content.pages.userSettings}</Text>
			<MetaAppOptions />
		</ScreenWrapper>
	);
};

export default UserSettings;
