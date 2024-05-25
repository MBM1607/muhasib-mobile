import { createContext, useContext, useEffect, useState } from "react";

import { events } from "../helpers/events.helpers.ts";
import { sendMessage } from "../helpers/open-ai.helpers.ts";
import { createStore } from "../helpers/store.helpers.ts";
import { messagesSchema } from "../schemas/message.schemas.ts";

import type { PropsWithChildren } from "react";
import type { Message, Messages } from "../schemas/message.schemas.ts";

export const assistantMessagesStore = createStore({
	key: "assistant-messages",
	schema: messagesSchema,
	secureStore: false,
});

const AssistantContext = createContext<Messages>([]);

export const AssistantProvider = ({ children }: PropsWithChildren) => {
	const [messages, setMessages] = useState<Messages>([]);

	useEffect(() => {
		const addMessageListener = events.listen(
			"addAssistantMessage",
			(message) => {
				setMessages((oldMessages) => {
					const newMessages = [...oldMessages, message];

					assistantMessagesStore.set(newMessages);

					return newMessages;
				});

				// If the message is not a question, we don't need to send it to the assistant
				if (message.type === "answer") return;

				sendMessage(message.message, (text) => {
					// We need to emit an event to let the UI know that the AI has responded
					events.emit("aiResponseReceived");

					const newMessage: Message = {
						message: text,
						sentAt: new Date(),
						type: "answer",
					};

					setMessages((oldMessages) => {
						const newMessages = [...oldMessages, newMessage];
						assistantMessagesStore.set(newMessages);

						return newMessages;
					});
				});
			},
		);

		(async () => {
			const storedMessages = await assistantMessagesStore.get();
			if (storedMessages) setMessages(storedMessages);
		})();

		return () => {
			addMessageListener.remove();
		};
	}, []);

	return (
		<AssistantContext.Provider value={messages}>
			{children}
		</AssistantContext.Provider>
	);
};

export const addAssistantMessage = (question: string) => {
	events.emit("addAssistantMessage", {
		message: question,
		sentAt: new Date(),
		type: "question",
	});
};

export const useAssistantMessages = () => useContext(AssistantContext);
