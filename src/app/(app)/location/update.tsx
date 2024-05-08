import * as Location from "expo-location";
import { useState } from "react";
import { Icon, Text } from "react-native-paper";

import { Button } from "../../../components/controls/button.component.tsx";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component.tsx";
import { addAlert } from "../../../contexts/alert.context.tsx";
import { useI18n } from "../../../contexts/i18n.context.tsx";
import {
	setLocation,
	useLocation,
} from "../../../contexts/location.context.tsx";
import { stringifyError } from "../../../errors";
import { useTheme } from "../../../hooks/theme.hook.tsx";
import { geoDataSchema } from "../../../schemas/location.schemas.ts";

const UpdateLocation = () => {
	const { content } = useI18n();
	const theme = useTheme();
	const location = useLocation();

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
			const currentLocationGeoCode = await Location.reverseGeocodeAsync({
				latitude: currentLocation.coords.latitude,
				longitude: currentLocation.coords.longitude,
			});

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
			title={content.pages.updateLocation}
			style={theme.styles.view.centeredScreen}
			settingsControl
			back
		>
			<Icon
				size={124}
				source="map-marker-radius-outline"
			/>
			<Text
				variant="headlineLarge"
				style={theme.styles.text.center}
			>
				{content.headings.updateLocation}
			</Text>
			{/* TODO Show google maps with marker on current location and search bar to enter location manually */}
			<Button
				label={content.location.button.detect}
				style={theme.styles.button.fullWidth}
				loading={loading}
				onPress={allowLocation}
			/>
		</ScreenWrapper>
	);
};

export default UpdateLocation;
