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

export const getCompassDirectionFromAngle = (angle: number): string => {
	if (angle >= 337.5 || angle < 22.5) return "N";
	if (angle >= 22.5 && angle < 67.5) return "NE";
	if (angle >= 67.5 && angle < 112.5) return "E";
	if (angle >= 112.5 && angle < 157.5) return "SE";
	if (angle >= 157.5 && angle < 202.5) return "S";
	if (angle >= 202.5 && angle < 247.5) return "SW";
	if (angle >= 247.5 && angle < 292.5) return "W";
	if (angle >= 292.5 && angle < 337.5) return "NW";

	return "N";
};
