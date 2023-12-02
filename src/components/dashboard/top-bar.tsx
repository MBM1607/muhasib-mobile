import { useRouter } from "expo-router";
import { View } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";

import { useTheme } from "../../hooks/theme.hook";
import { IconButton } from "../controls/icon-button.component";

export const TopBar = () => {
	const router = useRouter();
	const theme = useTheme();

	return (
		<View
			style={{
				flexDirection: "row",
				gap: 25,
				justifyContent: "space-between",
				flex: 1,
			}}
		>
			<Surface
				style={{
					backgroundColor: theme.colors.primaryContainer,
					borderRadius: 50,
				}}
			>
				<IconButton
					icon="settings"
					style={{
						backgroundColor: theme.colors.primaryContainer,
						flex: 1,
					}}
					onPress={() => {
						router.push("/menu");
					}}
				/>
			</Surface>

			<TouchableRipple
				style={{
					flex: 1,
				}}
				onPress={() => {
					router.push("/islamic-calendar");
				}}
			>
				<Surface
					style={{
						flex: 1,
						backgroundColor: theme.colors.primaryContainer,
						borderRadius: 25,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontFamily: "RobotoSlabBold",
							fontSize: 16,
							color: theme.colors.onPrimaryContainer,
						}}
					>
						18th Jamaada al-Awwal 1442
					</Text>
					<Text
						style={{
							fontFamily: "RobotoSlabRegular",
							fontSize: 16,
							color: theme.colors.onPrimaryContainer,
						}}
					>
						2nd December 2023
					</Text>
				</Surface>
			</TouchableRipple>
		</View>
	);
};
