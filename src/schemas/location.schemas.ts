import { z } from "zod";

export const coordsSchema = z.strictObject({
	latitude: z.number(),
	longitude: z.number(),
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
});

export const locationSchema = z.strictObject({
	coords: coordsSchema,
	geoData: geoDataSchema,
});

export type Location = z.infer<typeof locationSchema>;
export type Coords = z.infer<typeof coordsSchema>;
export type GeoData = z.infer<typeof geoDataSchema>;
