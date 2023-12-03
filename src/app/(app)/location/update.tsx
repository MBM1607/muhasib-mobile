import { Text } from "react-native-paper";

import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";
import { useLocation } from "../../../contexts/location.context";

const UpdateLocation = () => {
	const { content } = useI18n();
	const location = useLocation();

	return (
		<ScreenWrapper
			title={content.pages.updateLocation}
			back
		>
			<Text>{content.pages.updateLocation}</Text>
		</ScreenWrapper>
	);
};

export default UpdateLocation;
