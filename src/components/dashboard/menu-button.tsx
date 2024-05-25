import { Surface, Text, TouchableRipple } from "react-native-paper";

import { useTheme } from "../../hooks/theme.hook.tsx";
import { IconButton } from "../controls/icon-button.component.tsx";

type MenuIcon =
	| "prayers"
	| "qibla"
	| "fasting"
	| "dua"
	| "islamic-calendar"
	| "muhasib-ai"
	| "quran";

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
					gap: 5,
					padding: 15,
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
						style={{
							backgroundColor: "transparent",
						}}
					/>
					<Text
						variant="titleMedium"
						style={{
							fontFamily: "RobotoSlabBold",
							color: theme.colors.primary,
							textTransform: "capitalize",
							textAlign: theme.rtl ? "right" : "left",
						}}
					>
						{label}
					</Text>
				</>
			</TouchableRipple>
		</Surface>
	);
};
