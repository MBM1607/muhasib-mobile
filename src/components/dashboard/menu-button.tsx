import { Surface, Text, TouchableRipple, useTheme } from "react-native-paper";

import { IconButton } from "../controls/icon-button.component";

type MenuIcon =
	| "prayers"
	| "qibla"
	| "quran"
	| "fasting"
	| "dua"
	| "islamic-calendar"
	| "ai-chat";

export type MenuButtonProps = {
	icon: MenuIcon;
	label: string;
	onPress: () => void;
};

export const MenuButton = ({ icon, label, onPress }: MenuButtonProps) => {
	const theme = useTheme();

	return (
		<Surface
			style={{
				flex: 1,
				backgroundColor: theme.colors.primaryContainer,
				borderRadius: 25,
				overflow: "hidden",
			}}
		>
			<TouchableRipple
				style={{
					flex: 1,
					gap: 10,
					padding: 25,
					justifyContent: "center",
					alignItems: "center",
				}}
				onPress={onPress}
			>
				<>
					<IconButton
						icon={icon}
						mode="contained"
						size={36}
					/>
					<Text
						style={{
							fontSize: 21,
							fontFamily: "RobotoSlabBold",
						}}
					>
						{label}
					</Text>
				</>
			</TouchableRipple>
		</Surface>
	);
};
