import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { View } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";

import { AyahCard } from "./ayah-card.component.tsx";

import { useI18n } from "../../contexts/i18n.context.tsx";
import { useTheme } from "../../hooks/theme.hook.tsx";
import { Icon } from "../app/icon.component.tsx";
import { Collapse } from "../layout/collapse.component.tsx";

import type { StyleProp, ViewStyle } from "react-native";
import type { QuranSurah } from "../../schemas/alquran.schemas";

export type SurahCardProps = {
	surah: QuranSurah;
	surahIndex: number;
	style?: StyleProp<ViewStyle>;
};

export const SurahCard = ({ surah, surahIndex, style }: SurahCardProps) => {
	const { content } = useI18n();
	const theme = useTheme();

	const [isExpanded, setIsExpanded] = useState(false);
	const [focusedAyah, setFocusedAyah] = useState(0);

	return (
		<View style={[style]}>
			<TouchableRipple
				style={{}}
				onPress={() => {
					setIsExpanded((prev) => !prev);
				}}
			>
				<>
					<Surface
						style={{
							borderRadius: 8,

							flexDirection: "row",
							gap: 8,
							justifyContent: "space-between",
							alignItems: "center",
							padding: 8,
							marginBottom: isExpanded ? 8 : 0,
						}}
					>
						<View
							style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
						>
							<Icon
								name="play"
								size={36}
								color={theme.colors.primary}
							/>
							<View style={{ gap: 4 }}>
								<Text
									variant="headlineSmall"
									style={{ fontSize: 16, lineHeight: 21 }}
								>
									{surah.number}. {surah.englishName}
								</Text>
								<Text
									variant="headlineSmall"
									style={{ fontSize: 12, lineHeight: 16 }}
								>
									{surah.ayahs.length} {content.quran.ayahs}
								</Text>
							</View>
						</View>
						<View
							style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
						>
							<Text
								variant="headlineSmall"
								style={{ fontSize: 16, lineHeight: 21 }}
							>
								{surah.name}
							</Text>
						</View>
					</Surface>
					<Collapse
						open={isExpanded}
						content={
							<FlashList
								data={surah.ayahs}
								estimatedItemSize={108}
								renderItem={({ item, index }) => (
									<AyahCard
										ayah={item}
										isFocused={focusedAyah === index}
										style={{
											marginBottom: index === surah.ayahs.length - 1 ? 0 : 16,
										}}
										onPress={() => {
											setFocusedAyah(index);
										}}
									/>
								)}
							/>
						}
					/>
				</>
			</TouchableRipple>
		</View>
	);
};
