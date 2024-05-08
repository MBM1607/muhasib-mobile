import { z } from "zod";

export const coordsSchema = z.strictObject({
	/**
	 * The latitude in degrees.
	 */
	latitude: z.number(),
	/**
	 * The longitude in degrees.
	 */
	longitude: z.number(),
	altitude: z.number().nullable(),
	/**
	 * The accuracy of the altitude value, in meters. Can be `null` on Web if it's not available.
	 */
	altitudeAccuracy: z.number().nullable(),
	/**
	 * The radius of uncertainty for the location, measured in meters. Can be `null` on Web if it's not available.
	 */
	accuracy: z.number().nullable(),
	/**
	 * Horizontal direction of travel of this device, measured in degrees starting at due north and
	 * continuing clockwise around the compass. Thus, north is 0 degrees, east is 90 degrees, south is
	 * 180 degrees, and so on. Can be `null` on Web if it's not available.
	 */
	heading: z.number().nullable(),
	/**
	 * The instantaneous speed of the device in meters per second. Can be `null` on Web if it's not available.
	 */
	speed: z.number().nullable(),
});

export const geoDataSchema = z.strictObject({
	timezone: z.string().nullable(),
	region: z.string(),
	subregion: z.string().nullable(),
	isoCountryCode: z.string(),
	country: z.string(),
	district: z.string().nullable(),
	city: z.string(),
	street: z.string().nullable(),
	streetNumber: z.string().nullable(),
	postalCode: z.string().nullable(),
	name: z.string().nullable(),
	formattedAddress: z.string(),
});

export const locationSchema = z.strictObject({
	coords: coordsSchema,
	geoData: geoDataSchema,
});

export type Location = z.infer<typeof locationSchema>;
export type Coords = z.infer<typeof coordsSchema>;
export type GeoData = z.infer<typeof geoDataSchema>;
