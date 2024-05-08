import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { Surface } from "react-native-paper";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";

import { MenuButton } from "../../components/dashboard/menu-button";
import { PrayerTimesCard } from "../../components/dashboard/prayer-times-card";
import { TopBar } from "../../components/dashboard/top-bar";
import { useI18n } from "../../contexts/i18n.context.tsx";

const App = () => {
	const router = useRouter();
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
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								gap: 20,
							}}
						>
							<MenuButton
								icon={"prayers"}
								label={content.pages.prayers}
								onPress={() => {
									router.push("/prayers");
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
								label={content.pages.islamicCalendar}
								onPress={() => {
									router.push("/islamic-calendar");
								}}
							/>
							<MenuButton
								icon={"fasting"}
								label={content.pages.fasting}
								onPress={() => {
									router.push("/fasting");
								}}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								gap: 20,
							}}
						>
							<MenuButton
								icon={"qibla"}
								label={content.pages.qibla}
								onPress={() => {
									router.push("/qibla");
								}}
							/>
							<MenuButton
								icon={"dua"}
								label={content.pages.duas}
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
