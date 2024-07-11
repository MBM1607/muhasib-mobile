import { Dimensions } from "react-native";
import { z } from "zod";
// import * as Sentry from "sentry-expo";

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

const {
	env,
	backendPath,
	openAi,
	// sentry
} = parseEnvironment();

export { backendPath, env, openAi };

// if (env === "production") {
// 	Sentry.init({
// 		dsn: sentry.dsn,
// 		enableInExpoDevelopment: true,
// 		debug: false,
// 		tracesSampleRate: 1.0,
// 	});
// }

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
