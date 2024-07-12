import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

import type { ReactElement } from "react";
import type { App } from "../../types/app.types.ts";

type CollapsePropsType = App.propsWithStyle<{
	/** open state for the collapse */
	open: boolean;

	/** child items to be displayed in the collapse */
	content: ReactElement;
}>;

export const Collapse = ({ open, style, content }: CollapsePropsType) => {
	return (
		open && (
			<Animated.View
				entering={FadeInDown}
				exiting={FadeOutUp}
				style={style}
			>
				{content}
			</Animated.View>
		)
	);
};
