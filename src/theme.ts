import {
	MD3DarkTheme,
	MD3LightTheme,
	configureFonts,
} from "react-native-paper";

import type { MD3Theme } from "react-native-paper";
import type { Utils } from "./types/utils.types";

type ColorObj<T extends string> = {
	[k in
		| `${T}`
		| `on${Capitalize<T>}`
		| `${T}Container`
		| `on${Capitalize<T>}Container`]: string;
};

export type AppTheme = Utils.prettify<
	MD3Theme & {
		colors: Utils.prettify<
			MD3Theme["colors"] & ColorObj<"error" | "info" | "success" | "warning">
		>;
	}
>;

const fonts = configureFonts({
	config: {
		displaySmall: { fontFamily: "RobotoSlabRegular" },
		displayMedium: { fontFamily: "RobotoSlabRegular" },
		displayLarge: { fontFamily: "RobotoSlabRegular" },
		headlineSmall: { fontFamily: "RobotoSlabBold" },
		headlineMedium: { fontFamily: "RobotoSlabBold" },
		headlineLarge: { fontFamily: "RobotoSlabBold" },
		titleSmall: { fontFamily: "RobotoSlabBold" },
		titleMedium: { fontFamily: "RobotoSlabBold" },
		titleLarge: { fontFamily: "RobotoSlabBold" },
		labelSmall: { fontFamily: "RobotoSlabRegular" },
		labelMedium: { fontFamily: "RobotoSlabRegular" },
		labelLarge: { fontFamily: "RobotoSlabBold" },
		bodySmall: { fontFamily: "RobotoSlabRegular" },
		bodyMedium: { fontFamily: "RobotoSlabRegular" },
		bodyLarge: { fontFamily: "RobotoSlabRegular" },
	},
});

export const lightTheme: AppTheme = {
	...MD3LightTheme,
	colors: {
		primary: "rgb(0, 109, 65)",
		onPrimary: "rgb(255, 255, 255)",
		primaryContainer: "rgb(179, 237, 215)",
		onPrimaryContainer: "rgb(0, 109, 65)",
		secondary: "rgb(0, 108, 79)",
		onSecondary: "rgb(255, 255, 255)",
		secondaryContainer: "rgb(134, 248, 202)",
		onSecondaryContainer: "rgb(0, 33, 22)",
		tertiary: "rgb(59, 100, 112)",
		onTertiary: "rgb(255, 255, 255)",
		tertiaryContainer: "rgb(191, 233, 248)",
		onTertiaryContainer: "rgb(0, 31, 39)",
		error: "rgb(186, 26, 26)",
		onError: "rgb(255, 255, 255)",
		errorContainer: "rgb(255, 218, 214)",
		onErrorContainer: "rgb(65, 0, 2)",
		background: "rgb(251, 253, 248)",
		onBackground: "rgb(25, 28, 26)",
		surface: "rgb(251, 253, 248)",
		onSurface: "rgb(0, 109, 65)",
		surfaceVariant: "rgba(104, 219, 175, 0.5)",
		onSurfaceVariant: "rgb(65, 73, 66)",
		outline: "rgb(113, 121, 114)",
		outlineVariant: "rgb(192, 201, 192)",
		shadow: "rgb(0, 0, 0)",
		scrim: "rgb(0, 0, 0)",
		inverseSurface: "rgb(46, 49, 46)",
		inverseOnSurface: "rgb(240, 241, 237)",
		inversePrimary: "rgb(120, 218, 160)",
		elevation: {
			level0: "transparent",
			level1: "rgb(238, 246, 239)",
			level2: "rgb(231, 242, 233)",
			level3: "rgb(223, 237, 228)",
			level4: "rgb(221, 236, 226)",
			level5: "rgb(216, 233, 222)",
		},
		surfaceDisabled: "rgba(25, 28, 26, 0.12)",
		onSurfaceDisabled: "rgba(25, 28, 26, 0.38)",
		backdrop: "rgba(42, 50, 44, 0.4)",
		success: "rgb(16, 109, 32)",
		onSuccess: "rgb(255, 255, 255)",
		successContainer: "rgb(157, 248, 152)",
		onSuccessContainer: "rgb(0, 34, 4)",
		info: "rgb(0, 99, 154)",
		onInfo: "rgb(255, 255, 255)",
		infoContainer: "rgb(206, 229, 255)",
		onInfoContainer: "rgb(0, 29, 50)",
		warning: "rgb(150, 73, 0)",
		onWarning: "rgb(255, 255, 255)",
		warningContainer: "rgb(255, 220, 198)",
		onWarningContainer: "rgb(49, 19, 0)",
	},
	fonts,
};

export const darkTheme: AppTheme = {
	...MD3DarkTheme,
	colors: {
		primary: "rgb(120, 218, 160)",
		onPrimary: "rgb(0, 57, 31)",
		primaryContainer: "rgb(0, 82, 48)",
		onPrimaryContainer: "rgb(148, 247, 186)",
		secondary: "rgb(104, 219, 175)",
		onSecondary: "rgb(0, 56, 39)",
		secondaryContainer: "rgb(0, 81, 59)",
		onSecondaryContainer: "rgb(134, 248, 202)",
		tertiary: "rgb(163, 205, 219)",
		onTertiary: "rgb(3, 53, 65)",
		tertiaryContainer: "rgb(34, 76, 88)",
		onTertiaryContainer: "rgb(191, 233, 248)",
		error: "rgb(255, 180, 171)",
		onError: "rgb(105, 0, 5)",
		errorContainer: "rgb(147, 0, 10)",
		onErrorContainer: "rgb(255, 180, 171)",
		background: "rgb(25, 28, 26)",
		onBackground: "rgb(225, 227, 222)",
		surface: "rgb(25, 28, 26)",
		onSurface: "rgb(225, 227, 222)",
		surfaceVariant: "rgb(65, 73, 66)",
		onSurfaceVariant: "rgb(192, 201, 192)",
		outline: "rgb(138, 147, 139)",
		outlineVariant: "rgb(65, 73, 66)",
		shadow: "rgb(0, 0, 0)",
		scrim: "rgb(0, 0, 0)",
		inverseSurface: "rgb(225, 227, 222)",
		inverseOnSurface: "rgb(46, 49, 46)",
		inversePrimary: "rgb(0, 109, 65)",
		elevation: {
			level0: "transparent",
			level1: "rgb(30, 38, 33)",
			level2: "rgb(33, 43, 37)",
			level3: "rgb(36, 49, 41)",
			level4: "rgb(36, 51, 42)",
			level5: "rgb(38, 55, 45)",
		},
		surfaceDisabled: "rgba(225, 227, 222, 0.12)",
		onSurfaceDisabled: "rgba(225, 227, 222, 0.38)",
		backdrop: "rgba(42, 50, 44, 0.4)",
		success: "rgb(130, 219, 126)",
		onSuccess: "rgb(0, 57, 10)",
		successContainer: "rgb(0, 83, 18)",
		onSuccessContainer: "rgb(157, 248, 152)",
		info: "rgb(150, 204, 255)",
		onInfo: "rgb(0, 51, 83)",
		infoContainer: "rgb(0, 74, 117)",
		onInfoContainer: "rgb(206, 229, 255)",
		warning: "rgb(255, 183, 134)",
		onWarning: "rgb(80, 36, 0)",
		warningContainer: "rgb(114, 54, 0)",
		onWarningContainer: "rgb(255, 220, 198)",
	},
	fonts,
};

export type ThemeColor =
	| "primary"
	| "secondary"
	| "tertiary"
	| "error"
	| "success"
	| "warning"
	| "info";
