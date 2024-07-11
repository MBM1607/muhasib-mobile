import { default as Constants } from "expo-constants";
import { Dimensions } from "react-native";
import { z } from "zod";

import type { App } from "./types/app.types.ts";

const extra = Constants.expoConfig?.extra as App.extra;

const envModes = ["development", "test", "production"] as const;

export type EnvMode = (typeof envModes)[number];

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]),
	EXPO_PUBLIC_BACKEND_API_PATH: z.string().url(),
	EXPO_PUBLIC_OPEN_AI_API_KEY: z.string(),
	EXPO_PUBLIC_OPEN_AI_ASSISTANT_ID: z.string(),
});

const parseEnvironment = () => {
	/**
	 * The environment variables must be manually accessed via the dot nation to be inlined
	 * @link {https://docs.expo.dev/guides/environment-variables/#how-to-read-from-environment-variables}
	 * */
	const parsed = envSchema.safeParse({
		EXPO_PUBLIC_BACKEND_API_PATH: process.env.EXPO_PUBLIC_BACKEND_API_PATH,
		EXPO_PUBLIC_OPEN_AI_API_KEY: process.env.EXPO_PUBLIC_OPEN_AI_API_KEY,
		EXPO_PUBLIC_OPEN_AI_ASSISTANT_ID:
			process.env.EXPO_PUBLIC_OPEN_AI_ASSISTANT_ID,
		...extra,
	});

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
		backendPath: data.EXPO_PUBLIC_BACKEND_API_PATH,
		openAi: {
			apiKey: data.EXPO_PUBLIC_OPEN_AI_API_KEY,
			assistantId: data.EXPO_PUBLIC_OPEN_AI_ASSISTANT_ID,
		},
	};
};

const { env, backendPath, openAi } = parseEnvironment();

export { backendPath, env, openAi };

const isFetchMockedConfig: Record<typeof env, boolean> = {
	development: false,
	production: false,
	test: true,
};

/** should the app use mocked fetch? used for demos and testing */
export const isFetchMocked: boolean = isFetchMockedConfig[env];

export const isSmallerScreen = Dimensions.get("screen").width <= 400;

const disableAuthConfig: Record<typeof env, boolean> = {
	development: true,
	production: true,
	test: true,
};

/** should fetch authentication be disabled? */
export const disableAuth: boolean = disableAuthConfig[env];

const shouldAutoFillConfig: Record<typeof env, boolean> = {
	development: true,
	production: false,
	test: true,
};

/** should the app auto fill inputs with default values? */
export const shouldAutoFill: boolean = shouldAutoFillConfig[env];
