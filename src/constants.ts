import { Platform } from "react-native";

export const PHONE_REGEX =
	/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/u;

export const JWT_REGEX = /^[0-9a-zA-Z]*\.[0-9a-zA-Z]*\.[0-9a-zA-Z-_]*$/u;

export const PLAYSTORE_URL =
	"https://play.google.com/store/apps/details?id=app.muhasib";
export const APPSTORE_URL =
	"https://apps.apple.com/pk/app/muhasib/id1559787066";

export const STORE_URL = Platform.select({
	ios: APPSTORE_URL,
	android: PLAYSTORE_URL,
}) as string;
