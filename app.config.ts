import { z } from "zod";

import type { ConfigContext, ExpoConfig } from "@expo/config";

const parseEnvironment = () => {
	const envSchema = z.object({
		NODE_ENV: z.enum(["development", "production", "test"]),
		BACKEND_API_PATH: z.string().url(),
		OPEN_AI_API_KEY: z.string(),
		OPEN_AI_ASSISTANT_ID: z.string(),
		// SENTRY_ORG: z.string(),
		// SENTRY_PROJECT: z.string(),
		// SENTRY_AUTH_TOKEN: z.string(),
		// SENTRY_DSN: z.string(),
	});
	const parsed = envSchema.safeParse(process.env);

	if (!parsed.success && process.env.NODE_ENV) {
		const env = process.env.NODE_ENV;
		console.error(
			"🔥 Invalid environment variables:",
			parsed.error.flatten().fieldErrors,
			`\n🔥 Fix the issues in .env.${env} file.`,
			`\n💡 Tip: If you recently updated the .env.${env} file and the error still persists, try restarting the server with the -cc flag to clear the cache.`,
		);
		throw new Error("Invalid environment, Check terminal for more details ");
	}
	const data = parsed.success ? parsed.data : ({} as z.infer<typeof envSchema>);
	return {
		env: data.NODE_ENV,
		// sentry: {
		// 	dsn: data.SENTRY_DSN,
		// 	organization: data.SENTRY_ORG,
		// 	project: data.SENTRY_PROJECT,
		// },
		backendPath: data.BACKEND_API_PATH,
		openAi: {
			apiKey: data.OPEN_AI_API_KEY,
			assistantId: data.OPEN_AI_ASSISTANT_ID,
		},
	};
};

const extra = parseEnvironment();
export type Environment = typeof extra;

const details = {
	id: "muhasib",
	org: "muhasib",
	name: "Muhasib",
	description: "Prayer Times + Tracking App",
	github: "https://github.com/mbm1607/muhasib-mobile",
	version: "0.0.1",
	easProjectId: "7ab8f232-40f2-4e38-bdc2-fa882fdf65fe",
	primaryColor: "#26784e",
} as const;

const semverToInt = (version: `${number}.${number}.${number}`): number => {
	const [major, minor, patch] = version.split(".").map(Number);
	return (major ?? 0) * 10000000 + (minor ?? 0) * 100000 + (patch ?? 0);
};

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	owner: details.org,
	scheme: details.id,
	name: details.name,
	slug: details.id,
	description: details.description,
	version: details.version,
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
		enabled: true,
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		bundleIdentifier: `app.${details.id}`,
		buildNumber: details.version,
		supportsTablet: true,
	},
	android: {
		package: `app.${details.id}`,
		versionCode: semverToInt(details.version),
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#ffffff",
		},
	},
	plugins: [
		// "sentry-expo",
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
	// hooks: {
	// 	postPublish: [
	// 		{
	// 			file: "sentry-expo/upload-sourcemaps",
	// 			config: {
	// 				setCommits: true,
	// 				organization: extra.sentry.organization,
	// 				project: extra.sentry.project,
	// 			},
	// 		},
	// 	],
	// },
});
