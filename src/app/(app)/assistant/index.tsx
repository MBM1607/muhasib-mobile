import { useState } from "react";
import { View } from "react-native";
import { Avatar, Surface, Text } from "react-native-paper";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";

import { FormControl } from "../../../components/controls/form-control.component.tsx";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component.tsx";
import {
	addAssistantMessage,
	useAssistantMessages,
} from "../../../contexts/assistant.context.tsx";
import { useI18n } from "../../../contexts/i18n.context.tsx";
import { events } from "../../../helpers/events.helpers.ts";
import { useForm } from "../../../hooks/form.hook.tsx";
import { useTheme } from "../../../hooks/theme.hook.tsx";
import { messageSchema } from "../../../schemas/message.schemas.ts";

const Assistant = () => {
	const theme = useTheme();
	const { content } = useI18n();

	const messages = useAssistantMessages();
	const [waitingForResponse, setWaitingForResponse] = useState(false);

	const { props, state } = useForm({
		schema: messageSchema.pick({ message: true }),
		details: {
			message: { type: "string" },
		},
		// eslint-disable-next-line @typescript-eslint/require-await
		onSubmit: async (values) => {
			addAssistantMessage(values.message);
			state.values.message = "";
			setWaitingForResponse(true);

			events.listen("aiResponseReceived", () => {
				setWaitingForResponse(false);
			});

			return "Sent! Waiting for response...";
		},
	});

	return (
		<ScreenWrapper
			title={content.pages.muhasibAi}
			style={{
				justifyContent: "space-between",
				gap: 12,
			}}
			settingsControl
			back
		>
			<Animated.ScrollView
				entering={SlideInLeft.springify()}
				exiting={SlideOutRight.springify()}
				style={{ flex: 1 }}
				contentContainerStyle={{ gap: 12, padding: 6 }}
			>
				{messages.map((message) => (
					<View
						key={`message-${message.sentAt.toISOString()}`}
						style={{
							flexDirection:
								message.type === "question" ? "row" : "row-reverse",
							alignItems: "center",
							gap: 6,
						}}
					>
						<Avatar.Icon
							icon={message.type === "question" ? "account" : "robot"}
							size={32}
							style={{
								backgroundColor:
									message.type === "question"
										? theme.colors.primary
										: theme.colors.info,
							}}
						/>
						<Surface
							mode="elevated"
							style={{
								borderRadius: 6,
								padding: 8,
								flex: 1,
							}}
						>
							<Text variant="bodyLarge">{message.message}</Text>
						</Surface>
					</View>
				))}
				{waitingForResponse && (
					<View
						style={{
							flexDirection: "row-reverse",
							alignItems: "center",
							gap: 6,
						}}
					>
						<Avatar.Icon
							icon="robot"
							size={32}
							style={{
								backgroundColor: theme.colors.info,
							}}
						/>
						<Surface
							mode="elevated"
							style={{
								borderRadius: 6,
								padding: 8,
								flex: 1,
							}}
						>
							<Text variant="bodyLarge">Sent! Waiting for response...</Text>
						</Surface>
					</View>
				)}
			</Animated.ScrollView>
			<View
				style={{
					flexDirection: "row",
					gap: 6,
				}}
			>
				<FormControl
					{...props.field.message}
					button={{
						...props.button,
						icon: "message-submit",
						loading: waitingForResponse,
					}}
					styles={{
						container: {
							flex: 1,
						},
					}}
				/>
			</View>
		</ScreenWrapper>
	);
};

export default Assistant;
