import { useLocalSearchParams, useRouter } from "expo-router";
import { Share, View } from "react-native";
import { Divider, Surface, Text } from "react-native-paper";

import { IconButton } from "../../../components/controls/icon-button.component.tsx";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component.tsx";
import {
	useCategories,
	useDuasByCategory,
} from "../../../contexts/duas.context.tsx";
import { useI18n } from "../../../contexts/i18n.context.tsx";
import { humanizeToken } from "../../../helpers/humanize-token.helpers.ts";
import { useTheme } from "../../../hooks/theme.hook.tsx";

const DuasCategoryPage = () => {
	const router = useRouter();
	const theme = useTheme();
	const { category } = useLocalSearchParams();
	const { content, language } = useI18n();
	const categories = useCategories();
	const duas = useDuasByCategory(category as string);

	if (!category || !categories.includes(category as string)) {
		router.push("/404");
		return null;
	}

	return (
		<ScreenWrapper
			title={`${content.pages.duas} / ${humanizeToken(category as string)}`}
			style={{
				gap: 16,
				padding: 16,
			}}
			settingsControl
			back
		>
			{duas.map((dua, index) => (
				<Surface
					key={index}
					style={{
						borderRadius: 16,
						padding: 8,
						gap: 8,
						alignItems: "stretch",
					}}
				>
					<Text
						variant="headlineSmall"
						style={{
							fontSize: 18,
							textAlign: "right",
							color: theme.colors.tertiary,
						}}
					>
						{dua.arabic}
					</Text>
					<Text
						variant="headlineSmall"
						style={{
							fontSize: 14,
							lineHeight: 21,
							color: theme.colors.secondary,
						}}
					>
						{dua[language]}
					</Text>
					<Divider
						theme={{
							colors: {
								outlineVariant: theme.colors.tertiary,
							},
						}}
						bold
					/>
					<Text
						variant="headlineSmall"
						style={{
							fontSize: 10,
							lineHeight: 12,
						}}
					>
						{dua.reference}
					</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-end",
							alignItems: "center",
						}}
					>
						<IconButton
							icon="share"
							onPress={() => {
								Share.share({
									message: `${dua.arabic}\n\n${dua[language]}\n\n${dua.reference}\n\n${content.duas.shareMessage}`,
								});
							}}
						/>
					</View>
				</Surface>
			))}
		</ScreenWrapper>
	);
};

export default DuasCategoryPage;
