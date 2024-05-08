import * as Location from "expo-location";
import { useState } from "react";
import { Icon, Text } from "react-native-paper";

import { Button } from "../../../components/controls/button.component.tsx";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component.tsx";
import { addAlert } from "../../../contexts/alert.context.tsx";
import { useI18n } from "../../../contexts/i18n.context.tsx";
import { setLocation } from "../../../contexts/location.context.tsx";
import { stringifyError } from "../../../errors";
import { useTheme } from "../../../hooks/theme.hook.tsx";
import { geoDataSchema } from "../../../schemas/location.schemas.ts";

const SetLocation = () => {
	const { content } = useI18n();
	const theme = useTheme();

	const [loading, setLoading] = useState(false);

	const allowLocation = async () => {
		setLoading(true);
		try {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== Location.PermissionStatus.GRANTED) {
				addAlert({
					title: "Error",
					text: "You must grant location permissions to use this app",
				});
				return;
			}

			const currentLocation = await Location.getCurrentPositionAsync({});
			const currentLocationGeoCode = await Location.reverseGeocodeAsync(
				currentLocation.coords,
			);

			const parsedGeoData = geoDataSchema.safeParse(currentLocationGeoCode[0]);

			if (!parsedGeoData.success) {
				addAlert({
					title: "Reverse GeoCoding Error",
					text: stringifyError(parsedGeoData.error),
				});
				return;
			}

			setLocation({
				coords: currentLocation.coords,
				geoData: parsedGeoData.data,
			});
		} catch (error: unknown) {
			console.error(error);
			addAlert({
				title: "Error",
				text: "There was an error getting your location",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScreenWrapper
			style={theme.styles.view.centeredScreen}
			modeControl
			languageControl
		>
			<Icon
				size={124}
				source="map-marker-radius-outline"
			/>
			<Text
				variant="headlineLarge"
				style={theme.styles.text.center}
			>
				{content.headings.setLocation}
			</Text>
			<Text
				variant="bodyLarge"
				style={theme.styles.text.center}
			>
				{content.location.explanation}
			</Text>
			<Button
				label={content.location.button.allow}
				style={theme.styles.button.fullWidth}
				loading={loading}
				onPress={allowLocation}
			/>
		</ScreenWrapper>
	);
};

export default SetLocation;
