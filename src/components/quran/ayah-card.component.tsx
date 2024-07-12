import { View } from "react-native";
import { Divider, Surface, Text, TouchableRipple } from "react-native-paper";

import { useTheme } from "../../hooks/theme.hook.tsx";
import { IconButton } from "../controls/icon-button.component.tsx";

import type { StyleProp, ViewStyle } from "react-native";
import type { QuranAyahWithAudio } from "../../schemas/alquran.schemas";

export type AyahCardProps = {
	ayah: QuranAyahWithAudio;
	isFocused: boolean;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
};

export const AyahCard = ({
	ayah,
	isFocused,
	style,
	onPress,
}: AyahCardProps) => {
	const theme = useTheme();

	return (
		<Surface
			style={[
				{
					borderRadius: 8,
				},
				style,
			]}
		>
			<TouchableRipple
				style={{
					borderRadius: 8,
					padding: 8,
					flexDirection: "row",
					gap: 8,
					justifyContent: "space-between",
					alignItems: "center",
					borderWidth: isFocused ? 2 : 0,
					borderColor: theme.colors.primary,
				}}
				onPress={onPress}
			>
				<View style={{ gap: 8, flex: 1 }}>
					<View
						style={{
							gap: 8,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							flex: 1,
						}}
					>
						<Text
							variant="headlineSmall"
							style={{ fontSize: 14, lineHeight: 16 }}
						>
							{ayah.numberInSurah}
						</Text>
						<Text
							variant="headlineSmall"
							style={{ fontSize: 18, lineHeight: 21, textAlign: "right" }}
						>
							{ayah.text}
						</Text>
					</View>
					<Divider bold />
					<IconButton
						icon="play"
						size={24}
					/>
				</View>
			</TouchableRipple>
		</Surface>
	);
};
