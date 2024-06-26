import { useRouter } from "expo-router";

import { Button } from "../../../components/controls/button.component.tsx";
import { FormControl } from "../../../components/controls/form-control.component.tsx";
import { Alert } from "../../../components/feedback/alert.component.tsx";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component.tsx";
import { login } from "../../../contexts/auth.context.tsx";
import { useI18n } from "../../../contexts/i18n.context.tsx";
import { endpoints } from "../../../endpoints/endpoints.ts";
import { useForm } from "../../../hooks/form.hook.tsx";
import { userSchema } from "../../../schemas/user.schemas.ts";

const Login = () => {
	const { content } = useI18n();
	const router = useRouter();
	// // const { email } = useLocalSearchParams<{ email?: string }>();

	const { props, state } = useForm({
		schema: userSchema.pick({ email: true, password: true }),
		details: {
			email: { type: "email", next: "password" },
			password: { type: "password" },
		},
		onSubmit: async (values) => {
			const user = await endpoints.user.login(values);
			setTimeout(() => {
				login(user);
			}, 1000);
			return "Logged In! Redirecting...";
		},
	});

	return (
		<ScreenWrapper
			title={content.pages.login}
			style={{ padding: 15, gap: 5, justifyContent: "center" }}
			settingsControl
			back
		>
			<FormControl
				{...props.field.email}
				hasIcon
			/>

			<FormControl
				{...props.field.password}
				hasIcon
			/>

			{props.status && (
				<Alert
					{...props.status}
					style={{ marginBottom: 10 }}
				/>
			)}

			<Button
				{...props.button}
				icon="submit"
				loading={state.status.type === "submitting"}
				label={content.action.login}
			/>

			<Button
				label={content.action.forgotPassword}
				mode="contained-tonal"
				style={{
					width: 200,
					marginLeft: "auto",
					marginRight: "auto",
					marginTop: 10,
				}}
				onPress={() => {
					router.push("/auth/forgot-password");
				}}
			/>
		</ScreenWrapper>
	);
};

export default Login;
