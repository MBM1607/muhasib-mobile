import { useRouter } from "expo-router";
import { Surface, Text, TouchableRipple } from "react-native-paper";

import { Icon } from "../../../components/app/icon.component";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";
import { DUA_CATEGORIES } from "../../../helpers/duas.helpers";
import { useTheme } from "../../../hooks/theme.hook";

import type { DuaCategoryName } from "../../../helpers/duas.helpers";

const Duas = () => {
	const router = useRouter();
	const { content, rtl } = useI18n();
	const theme = useTheme();

	return (
		<ScreenWrapper
			title={content.pages.duas}
			style={{
				gap: 16,
				padding: 16,
			}}
			settingsControl
			back
		>
			{Object.keys(DUA_CATEGORIES).map((category, index) => (
				<Surface
					key={category}
					style={{
						borderRadius: 16,
					}}
				>
					<TouchableRipple
						style={[
							theme.styles.view.row,
							{
								padding: 8,
								justifyContent: "space-between",
								alignItems: "center",
							},
						]}
						onPress={() => {
							router.push(`/duas/${category}`);
						}}
					>
						<>
							<Text
								variant="headlineSmall"
								style={{ fontSize: 16 }}
							>
								{content.duas[category as DuaCategoryName]}
							</Text>
							<Icon
								name={rtl ? "arrow-back" : "arrow-next"}
								size={28}
								color={theme.colors.primary}
							/>
						</>
					</TouchableRipple>
				</Surface>
			))}
		</ScreenWrapper>
	);
};

export default Duas;
