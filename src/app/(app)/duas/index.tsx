import { useRouter } from "expo-router";
import { Surface, Text, TouchableRipple } from "react-native-paper";

import { Icon } from "../../../components/app/icon.component.tsx";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component.tsx";
import { useCategories } from "../../../contexts/duas.context.tsx";
import { useI18n } from "../../../contexts/i18n.context.tsx";
import { humanizeToken } from "../../../helpers/humanize-token.helpers.ts";
import { useTheme } from "../../../hooks/theme.hook.tsx";

const Duas = () => {
	const router = useRouter();
	const { content, rtl } = useI18n();
	const theme = useTheme();
	const categories = useCategories();

	return (
		<ScreenWrapper
			title={content.pages.duas}
			style={{
				gap: 16,
				padding: 16,
			}}
			scroll
			settingsControl
			back
		>
			{[...categories].map((category) => (
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
								{humanizeToken(category)}
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
