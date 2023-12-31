import { useRouter } from "expo-router";

import { Button } from "../../../components/controls/button.component";
import { FormControl } from "../../../components/controls/form-control.component";
import { Alert } from "../../../components/feedback/alert.component";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component";
import { useI18n } from "../../../contexts/i18n.context";
import { endpoints } from "../../../endpoints/endpoints";
import { useForm } from "../../../hooks/form.hook";
import { userSchema } from "../../../schemas/user.schemas";

const Register = () => {
	const { content } = useI18n();
	const router = useRouter();

	const { props, state } = useForm({
		schema: userSchema.pick({ email: true, name: true, password: true }),
		details: {
			email: { type: "email", next: "name" },
			name: { type: "string", next: "password" },
			password: { type: "password" },
		},
		onSubmit: async (values) => {
			const { email: _ } = await endpoints.user.add({
				...values,
			});

			setTimeout(
				// // () => router.push({ pathname: '/auth/login', params: { email } }),
				() => {
					router.push("/auth/login");
				},
				1000,
			);
			return "user added! please wait...";
		},
	});

	return (
		<ScreenWrapper
			title={content.pages.register}
			style={{ padding: 15, gap: 5, justifyContent: "center" }}
			settingsControl
			back
		>
			<FormControl
				{...props.field.email}
				hasIcon
			/>

			<FormControl
				{...props.field.name}
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
				loading={state.status.type === "submitting"}
				label={content.action.register}
			/>
		</ScreenWrapper>
	);
};

export default Register;
