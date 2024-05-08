import { arctan2, cos, sin, tan } from "./math.helpers.ts";

import type { Coords } from "../schemas/location.schemas.ts";

const QIBLA_COORDS = {
	latitude: 21.4225,
	longitude: 39.8262,
};

// Get direction to the Holy Ka'aba from a given location
export const getQiblaDirection = (coords: Coords): number => {
	const numerator = sin(QIBLA_COORDS.longitude - coords.longitude);
	const denominator =
		cos(coords.latitude) * tan(QIBLA_COORDS.latitude) -
		sin(coords.latitude) * cos(QIBLA_COORDS.longitude - coords.longitude);

	return Math.round(arctan2(numerator, denominator));
};

export const getCompassAngleFromMagnetometerData = (magnetometerData: {
	x: number;
	y: number;
	z: number;
}): number => {
	const { x, y } = magnetometerData;

	return Math.round(
		Math.atan2(y, x) >= 0
			? Math.atan2(y, x) * (180 / Math.PI)
			: (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI),
	);
};
