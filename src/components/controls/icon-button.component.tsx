import { IconButton as Component } from "react-native-paper";

import { appIconMap } from "../app/icon.component";

import type { IconButtonProps as Props } from "react-native-paper";
import type { IconName } from "../app/icon.component";

export type IconButtonProps = Omit<Props, "icon"> & {
	icon: IconName;
};

export const IconButton = ({
	icon: iconName,
	mode = "contained",
	...props
}: IconButtonProps) => {
	return (
		<Component
			icon={appIconMap[iconName]}
			mode={mode}
			{...props}
		/>
	);
};
