import { useRouter } from "expo-router";
import { Magnetometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import { Surface, Text } from "react-native-paper";

import { Icon } from "../../components/app/icon.component.tsx";
import { Button } from "../../components/controls/button.component.tsx";
import { ScreenWrapper } from "../../components/layout/screen-wrapper.component.tsx";
import { useI18n } from "../../contexts/i18n.context.tsx";
import { useLocation } from "../../contexts/location.context.tsx";
import { getCompassAngleFromMagnetometerData } from "../../helpers/qibla.helpers.ts";
import { useTheme } from "../../hooks/theme.hook.tsx";

const Qibla = () => {
	const router = useRouter();
	const theme = useTheme();
	const location = useLocation();
	const { content } = useI18n();

	const [compassAngle, setCompassAngle] = useState(0);

	useEffect(() => {
		if (!location) return;

		const subscription = Magnetometer.addListener((data) => {
			setCompassAngle(getCompassAngleFromMagnetometerData(data));
		});

		return () => {
			subscription.remove();
		};
	}, [location]);

	const screenWidth = Dimensions.get("screen").width;

	return (
		<ScreenWrapper
			title={content.pages.qibla}
			style={[theme.styles.view.centeredScreen]}
			settingsControl
			back
		>
			<Surface
				style={[
					theme.styles.view.row,
					{
						justifyContent: "space-between",
						width: "100%",
						paddingVertical: 8,
						paddingHorizontal: 16,
						borderRadius: 16,
					},
				]}
			>
				<View>
					<Text
						variant="bodySmall"
						style={[theme.styles.text.center, { fontSize: 14 }]}
					>
						{content.qibla.trueNorth}
					</Text>
					<Text
						variant="headlineSmall"
						style={[theme.styles.text.center, { fontSize: 16 }]}
					>
						218° (SW)
					</Text>
				</View>
				<View>
					<Text
						variant="bodySmall"
						style={[theme.styles.text.center, { fontSize: 14 }]}
					>
						{content.qibla.kaaba}
					</Text>
					<Text
						variant="headlineSmall"
						style={[theme.styles.text.center, { fontSize: 16 }]}
					>
						318°
					</Text>
				</View>
				<View>
					<Text
						variant="bodySmall"
						style={[theme.styles.text.center, { fontSize: 14 }]}
					>
						{content.qibla.magneticField}
					</Text>
					<Text
						variant="headlineSmall"
						style={[theme.styles.text.center, { fontSize: 16 }]}
					>
						36 μT
					</Text>
				</View>
			</Surface>
			<View
				style={{
					position: "relative",
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Image
					/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
					source={require("../../assets/compass/rose.png")}
					style={{
						height: screenWidth * 0.9125,
						width: screenWidth * 0.9125,
						transform: [
							{
								rotate: `${compassAngle}deg`,
							},
						],
					}}
				/>
				<Image
					/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
					source={require("../../assets/compass/needle.png")}
					style={{
						height: screenWidth * 0.9125,
						width: screenWidth * 0.9125,
						position: "absolute",
					}}
				/>
			</View>
			<Button
				icon="location"
				label={location.geoData.city || "Set Location"}
				mode="contained"
				color="primary"
				onPress={() => {
					if (location) router.push("/location/update");
					else router.push("/location/set");
				}}
			/>
			<Surface
				style={[
					theme.styles.view.row,
					{
						paddingVertical: 8,
						paddingHorizontal: 16,
						borderRadius: 16,
						justifyContent: "center",
					},
				]}
			>
				<Icon
					name="qibla"
					size={24}
					color={theme.colors.primary}
				/>
				<Text
					variant="headlineSmall"
					style={[theme.styles.text.center, { fontSize: 14 }]}
				>
					260° (W) {content.qibla.fromTrueNorth}
				</Text>
			</Surface>
		</ScreenWrapper>
	);
};

export default Qibla;
