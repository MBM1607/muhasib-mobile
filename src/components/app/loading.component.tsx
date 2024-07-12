import { ActivityIndicator, Surface, Text } from "react-native-paper";

import { useI18n } from "../../contexts/i18n.context.tsx";

export const Loading = () => {
	const { content } = useI18n();

	return (
		<Surface
			style={{
				flexDirection: "row",
				gap: 4,
				paddingHorizontal: 16,
				borderRadius: 8,
			}}
		>
			<ActivityIndicator />
			<Text
				variant="headlineSmall"
				style={{
					fontSize: 16,
					padding: 8,
				}}
			>
				{content.loading}
			</Text>
		</Surface>
	);
};
