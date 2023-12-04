import { useRef } from "react";
import { View } from "react-native";
import { Switch, Text, TouchableRipple } from "react-native-paper";

import { FormControlWrapper } from "./form-control-wrapper.component";

import { useTheme } from "../../hooks/theme.hook";
import { Icon } from "../app/icon.component";

import type { Switch as RefType, StyleProp, ViewStyle } from "react-native";
import type { SwitchProps } from "react-native-paper";
import type { IconName } from "../app/icon.component";

type styles = {
	container?: StyleProp<ViewStyle>;
	icon?: StyleProp<ViewStyle>;
	button?: StyleProp<ViewStyle>;
	control?: StyleProp<ViewStyle>;
};

type BaseFormSwitchProps = Pick<SwitchProps, "disabled"> & {
	/** the current value of the input field */
	value: boolean;

	/** the function to call when the input changes */
	onChange: (value: boolean) => void;

	/** the styles to apply the control */
	styles?: styles;

	/** the label to show on the field */
	label: string;

	/** the error message to show beneath the input */
	error?: string;

	/** the caption to show beneath the input */
	caption?: string;
};
export type FormSwitchProps =
	| (BaseFormSwitchProps & {
			/** should the input have an icon to the left side */
			hasIcon?: false;
	  })
	| (BaseFormSwitchProps & {
			/** should the input have an icon to the left side */
			hasIcon: true;

			/** the icon to show to the left of the input */
			icon?: IconName;
	  });

export const FormSwitch = ({
	value,
	onChange,
	styles,
	label,
	error,
	caption,
	disabled,
	...props
}: FormSwitchProps) => {
	const theme = useTheme();
	const switchRef = useRef<RefType>(null);

	const color = value ? theme.colors.primary : theme.colors.inverseSurface;

	return (
		<FormControlWrapper
			style={styles?.container}
			caption={caption}
			error={error}
			disabled={disabled}
		>
			<TouchableRipple
				onPress={() => {
					onChange(!value);
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						flexWrap: "nowrap",
						alignContent: "center",
						paddingVertical: 0,
						paddingHorizontal: 15,
						gap: 15,
						borderWidth: 1.5,
						borderColor: color,
						borderRadius: 5,
						backgroundColor: value
							? theme.colors.primaryContainer
							: theme.colors.surface,
					}}
				>
					{props.hasIcon ? (
						<Icon
							style={styles?.icon}
							name={props.icon || "check"}
							size={20}
							color={theme.colors.onPrimaryContainer}
						/>
					) : undefined}
					<Text
						variant="bodyMedium"
						style={{
							fontWeight: "300",
							color: theme.colors.onPrimaryContainer,
							flexGrow: 1,
						}}
					>
						{label}
					</Text>
					<Switch
						ref={switchRef}
						value={value}
						disabled={disabled}
						style={{
							padding: 0,
							margin: 0,
							height: 40,
						}}
						onValueChange={onChange}
					/>
				</View>
			</TouchableRipple>
		</FormControlWrapper>
	);
};
