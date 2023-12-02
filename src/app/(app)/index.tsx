import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { Surface } from "react-native-paper";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";

import { MenuButton } from "../../components/dashboard/menu-button";
import { PrayerTimesCard } from "../../components/dashboard/prayer-times-card";
import { TopBar } from "../../components/dashboard/top-bar";
import { useI18n } from "../../contexts/i18n.context";
import { useMode } from "../../contexts/mode.context";
import { useTheme } from "../../hooks/theme.hook";

const App = () => {
	const router = useRouter();
	const theme = useTheme();
	const mode = useMode();
	const { content } = useI18n();

	return (
		<SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
			<Surface style={{ flex: 1, position: "relative" }}>
				<Animated.ScrollView
					entering={SlideInLeft.springify()}
					exiting={SlideOutRight.springify()}
				>
					<View
						style={{
							padding: 15,
							flex: 1,
							justifyContent: "center",
							gap: 20,
						}}
					>
						<TopBar />
						<PrayerTimesCard />
						<MenuButton
							icon={"prayers"}
							label={"Prayers"}
							onPress={() => {
								router.push("/prayers");
							}}
						/>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								gap: 20,
							}}
						>
							<MenuButton
								icon={"qibla"}
								label={"Qibla"}
								onPress={() => {
									router.push("/qibla");
								}}
							/>
							<MenuButton
								icon={"quran"}
								label={"Quran"}
								onPress={() => {
									router.push("/quran");
								}}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								gap: 20,
							}}
						>
							<MenuButton
								icon={"islamic-calendar"}
								label={"Calendar"}
								onPress={() => {
									router.push("/islamic-calendar");
								}}
							/>
							<MenuButton
								icon={"fasting"}
								label={"Fasting"}
								onPress={() => {
									router.push("/fasting");
								}}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								gap: 20,
							}}
						>
							<MenuButton
								icon={"ai-chat"}
								label={"AI Chat"}
								onPress={() => {
									router.push("/ai-chat");
								}}
							/>
							<MenuButton
								icon={"dua"}
								label={"Duas"}
								onPress={() => {
									router.push("/duas");
								}}
							/>
						</View>
					</View>
				</Animated.ScrollView>
			</Surface>
		</SafeAreaView>
	);
};

export default App;
