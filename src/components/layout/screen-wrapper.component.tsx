import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";

import { toggleMode, useMode } from "../../contexts/mode.context.tsx";
import { useTheme } from "../../hooks/theme.hook.tsx";
import { LanguageControl } from "../app/language-control.component.tsx";
import { UserControl } from "../app/user-control.component.tsx";
import { IconButton } from "../controls/icon-button.component.tsx";

import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { App } from "../../types/app.types";
import type { Utils } from "../../types/utils.types";

export type ScreenWrapperProps = App.propsWithStyle<{
	/** the title to show on the page header */
	title?: string;

	/** should a back button be shown on the page header */
	back?: boolean;

	/** should the user control be shown on the page header */
	userControl?: boolean;

	/** should the language control be shown on the page header */
	languageControl?: boolean;

	/** should the mode control be shown on the page header */
	modeControl?: boolean;

	/** should the settings control be shown on the page header */
	settingsControl?: boolean;

	children: ReactNode;
}> &
	Utils.allOrNone<{
		/** should the content be wrapped in a `ScrollView` */
		scroll?: boolean;

		/** the styles to apply to the wrapping `ScrollView` */
		scrollStyle?: StyleProp<ViewStyle>;
	}>;

export const ScreenWrapper = ({
	children,
	style,
	title,
	scroll,
	scrollStyle,
	back,
	userControl,
	languageControl,
	modeControl,
	settingsControl,
}: ScreenWrapperProps) => {
	const router = useRouter();
	const theme = useTheme();
	const mode = useMode();

	const iconMargin = { marginLeft: 0 };

	return (
		<SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
			<Surface style={{ flex: 1, position: "relative", padding: 10 }}>
				<View
					style={{
						flexDirection: "row",
						height: 50,
						flexShrink: 1,
						flexWrap: "nowrap",
						alignItems: "center",
						justifyContent: "flex-end",
					}}
				>
					<View style={[theme.styles.view.row, { flexShrink: 1, padding: 7 }]}>
						{back && (
							<IconButton
								icon={"arrow-back"}
								style={iconMargin}
								onPress={() => {
									router.back();
								}}
							/>
						)}

						{Boolean(title) && (
							<Text
								variant="titleSmall"
								style={{
									color: theme.colors.primary,
									textTransform: "capitalize",
									textAlign: "left",
									flexGrow: 1,
								}}
							>
								{title}
							</Text>
						)}
					</View>

					{settingsControl && (
						<IconButton
							icon="settings"
							style={iconMargin}
							onPress={() => {
								router.push("/settings");
							}}
						/>
					)}

					{userControl && <UserControl buttonStyle={iconMargin} />}

					{languageControl && <LanguageControl buttonStyle={iconMargin} />}

					{modeControl && (
						<IconButton
							icon={`${mode.setting}-mode`}
							style={iconMargin}
							onPress={toggleMode}
						/>
					)}
				</View>

				{scroll ? (
					<Animated.ScrollView
						entering={SlideInLeft.springify()}
						exiting={SlideOutRight.springify()}
						contentContainerStyle={scrollStyle}
					>
						<View style={[{ padding: 5 }, style]}>{children}</View>
					</Animated.ScrollView>
				) : (
					<Animated.View
						entering={SlideInLeft.springify()}
						exiting={SlideOutRight.springify()}
						style={[{ flex: 1, padding: 5 }, style]}
					>
						{children}
					</Animated.View>
				)}
			</Surface>
		</SafeAreaView>
	);
};
