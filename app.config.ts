import pkg from "./package.json";

import type { ConfigContext, ExpoConfig } from "@expo/config";

const IS_PROD = process.env.IS_PROD === "true";
const NODE_ENV = process.env.NODE_ENV ?? "development";

const extra = { IS_PROD, NODE_ENV };
export type Extra = typeof extra;

const details = {
	id: pkg.name,
	org: "muhasib",
	expoUsername: "mbm1607",
	name: "Muhasib",
	description: pkg.description,
	github: pkg.repository.url,
	version: pkg.version,
	easProjectId: "7ab8f232-40f2-4e38-bdc2-fa882fdf65fe",
	primaryColor: "#26784e",
} as const;

const semverToInt = (version: string): number => {
	const [major = NaN, minor = NaN, patch = NaN] = version
		.split(".")
		.map(Number);
	if (isNaN(major) || isNaN(minor) || isNaN(patch))
		throw new Error("Invalid version!");
	return major * 10000000 + minor * 100000 + patch;
};

const appId = `app.${details.id}${!extra.IS_PROD ? ".dev" : ""}`.replace(
	/-/gu,
	".",
);

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	owner: details.org,
	scheme: details.id,
	name: details.name + (!extra.IS_PROD ? " (Dev)" : ""),
	slug: details.id,
	description: details.description,
	version: details.version,
	runtimeVersion: {
		policy: "appVersion",
	},
	orientation: "portrait",
	icon: "./assets/icon.png",
	userInterfaceStyle: "automatic",
	experiments: {
		typedRoutes: true,
	},
	extra: {
		...extra,
		eas: {
			projectId: details.easProjectId,
		},
	},
	githubUrl: details.github,
	platforms: ["android", "ios"],
	primaryColor: details.primaryColor,
	splash: {
		image: "./assets/splash.png",
		resizeMode: "contain",
		backgroundColor: details.primaryColor,
	},
	updates: {
		enabled: IS_PROD,
	},
	assetBundlePatterns: ["**/*"],
	android: {
		package: appId,
		versionCode: semverToInt(details.version),
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#ffffff",
		},
	},
	ios: {
		bundleIdentifier: appId,
		buildNumber: details.version,
		supportsTablet: true,
	},
	plugins: [
		["expo-dev-launcher", { launchModeExperimental: "most-recent" }],
		["expo-build-properties", { android: { usesCleartextTraffic: true } }],
		["expo-updates", { username: details.expoUsername }],
		"expo-router",
		[
			"expo-location",
			{
				locationAlwaysAndWhenInUsePermission:
					"Allow $(PRODUCT_NAME) to use your location.",
			},
		],
		[
			"expo-notifications",
			{
				icon: "./assets/notification-icon.png",
				color: "#26784e",
				sounds: ["./assets/azan.mp3"],
			},
		],
	],
});
