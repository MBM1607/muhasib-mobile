import { loadAsync } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";

import { env } from "../config.ts";
import { AlertProvider, addAlert } from "../contexts/alert.context.tsx";
import { I18nProvider } from "../contexts/i18n.context.tsx";
import { LoadingProvider } from "../contexts/loading.context.tsx";
import { ModeProvider, useMode } from "../contexts/mode.context.tsx";
import { darkTheme, lightTheme } from "../theme.ts";

SplashScreen.preventAutoHideAsync();

const Providers = () => {
	const mode = useMode();

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		loadAsync({
			RobotoSlabRegular:
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				require("../assets/fonts/roboto-slab-regular.ttf") as string,
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			RobotoSlabBold: require("../assets/fonts/roboto-slab-bold.ttf") as string,
		}).then(() => {
			setLoaded(true);
			SplashScreen.hideAsync();
		});
	}, []);

	if (!loaded) return null;

	return (
		<I18nProvider>
			<PaperProvider theme={mode.scheme === "dark" ? darkTheme : lightTheme}>
				<AlertProvider>
					<LoadingProvider>
						<StatusBar
							style="auto"
							backgroundColor={
								mode.scheme === "dark"
									? darkTheme.colors.primary
									: lightTheme.colors.primary
							}
						/>
						<Slot />
					</LoadingProvider>
				</AlertProvider>
			</PaperProvider>
		</I18nProvider>
	);
};

const RootLayout = () => {
	useEffect(() => {
		if (env !== "production" || typeof Updates.addListener !== "function")
			return;

		Updates.addListener((event) => {
			if (event.type !== Updates.UpdateEventType.UPDATE_AVAILABLE) return;

			setTimeout(() => {
				addAlert({
					title: "Update Available!",
					text: "A New Update Is Available For The App.\nRestart The Application To Apply Updates.",
					closeLabel: "Later",
					noIcon: true,
					actions: [
						{
							label: "Restart & Update",
							onPress: async () => {
								await Updates.reloadAsync();
							},
						},
					],
				});
			}, 1000);
		});
	}, []);

	return (
		<ModeProvider>
			<Providers />
		</ModeProvider>
	);
};

export default RootLayout;
