import { Button as Component } from "react-native-paper";

import { useTheme } from "../../hooks/theme.hook.tsx";
import { appIconMap } from "../app/icon.component.tsx";

import type { ReactNode } from "react";
import type { ButtonProps as Props } from "react-native-paper";
import type { ThemeColor } from "../../theme";
import type { IconName } from "../app/icon.component.tsx";

export type ButtonProps = Omit<Props, "icon" | "children"> & {
	/** the label to show on the button */
	label: ReactNode;

	/** the icon to show to the left of the button label */
	icon?: IconName;

	/** the theme color of the button */
	color?: ThemeColor;
};

export const Button = ({
	style,
	color = "primary",
	label,
	mode = "contained",
	disabled,
	icon: iconName,
	...restProps
}: ButtonProps) => {
	const { getColor } = useTheme();

	const icon: Props["icon"] | undefined = iconName
		? appIconMap[iconName]
		: undefined;

	return (
		<Component
			{...restProps}
			mode={mode}
			disabled={disabled || restProps.loading}
			labelStyle={{ textTransform: "capitalize" }}
			icon={icon}
			contentStyle={{ flexDirection: "row" }}
			style={[
				{ borderRadius: 25, borderColor: getColor(color, "normal") },
				style,
			]}
			theme={{
				colors: {
					primary: getColor(color, "normal"),
					onPrimary: getColor(color, "on-normal"),
					primaryContainer: getColor(color, "container"),
					onPrimaryContainer: getColor(color, "on-container"),
					secondary: getColor(color, "normal"),
					onSecondary: getColor(color, "on-normal"),
					secondaryContainer: getColor(color, "container"),
					onSecondaryContainer: getColor(color, "on-container"),
				},
			}}
		>
			{label}
		</Component>
	);
};
