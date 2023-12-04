import { useLocalSearchParams, useRouter } from "expo-router";
import { Share, View } from "react-native";
import { Surface, Text } from "react-native-paper";

import { IconButton } from "../../../components/controls/icon-button.component";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";
import {
	DUA_CATEGORIES,
	DUA_CATEGORY_NAMES,
} from "../../../helpers/duas.helpers";
import { useTheme } from "../../../hooks/theme.hook";

import type { DuaCategoryName } from "../../../helpers/duas.helpers";

const DuasCategoryPage = () => {
	const router = useRouter();
	const { category } = useLocalSearchParams();
	const { content, rtl, language } = useI18n();
	const theme = useTheme();

	if (!category || !DUA_CATEGORY_NAMES.includes(category as DuaCategoryName)) {
		router.push("/404");
		return null;
	}

	const duas = DUA_CATEGORIES[category as DuaCategoryName];

	return (
		<ScreenWrapper
			title={`${content.pages.duas} / ${
				content.duas[category as DuaCategoryName]
			}`}
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
						style={{ fontSize: 16, textAlign: "right" }}
					>
						{dua.arabic}
					</Text>
					<Text
						variant="headlineSmall"
						style={{ fontSize: 16 }}
					>
						{dua[language]}
					</Text>
					<Text
						variant="headlineSmall"
						style={{ fontSize: 16 }}
					>
						{dua.reference}
					</Text>
					<View
						style={{
							flexDirection: rtl ? "row-reverse" : "row",
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
						<IconButton
							icon="favorite"
							onPress={() => {}}
						/>
					</View>
				</Surface>
			))}
		</ScreenWrapper>
	);
};

export default DuasCategoryPage;
