import OpenAI from "openai";

import { openAi } from "../config.ts";

import type { Assistant } from "openai/resources/beta/assistants.mjs";
import type { Thread } from "openai/resources/beta/threads/threads.mjs";

const client = new OpenAI({
	apiKey: openAi.apiKey,
});

let assistant: Assistant | null = null;
let thread: Thread | null = null;

export const startConversation = async () => {
	const newAssistant = await client.beta.assistants.retrieve(
		openAi.assistantId,
	);
	const newThread = await client.beta.threads.create();

	return { newAssistant, newThread };
};

export const sendMessage = async (
	content: string,
	onTextCreated: (data: string) => void,
) => {
	// If there is no assistant or thread, we need to start a conversation
	if (!assistant || !thread) {
		console.info("Starting a new conversation with Muhasib Assistant");
		const { newAssistant, newThread } = await startConversation();

		assistant = newAssistant;
		thread = newThread;
	}

	console.info("Sending message to Muhasib Assistant");
	// add message to the thread
	await client.beta.threads.messages.create(thread.id, {
		role: "user",
		content,
	});

	console.info("Running the assistant");
	const run = await client.beta.threads.runs.createAndPoll(thread.id, {
		assistant_id: assistant.id,
	});

	if (run.status === "completed") {
		const messages = await client.beta.threads.messages.list(run.thread_id);
		for (const message of messages.data) {
			if (message.role === "user") continue;

			const first = message.content[0];

			// We only care about text messages
			if (!first || first.type !== "text") continue;

			onTextCreated(first.text.value);

			// We only need the first message
			break;
		}
	} else {
		console.error("Unexpected status of the OpenAI thread run", run.status);
	}
};
