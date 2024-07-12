import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Surface, Text, TouchableRipple } from "react-native-paper";

import { Icon } from "../../../components/app/icon.component.tsx";
import { Loading } from "../../../components/app/loading.component.tsx";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component.tsx";
import { useCategories } from "../../../contexts/duas.context.tsx";
import { useI18n } from "../../../contexts/i18n.context.tsx";
import { events } from "../../../helpers/events.helpers.ts";
import { humanizeToken } from "../../../helpers/humanize-token.helpers.ts";
import { useTheme } from "../../../hooks/theme.hook.tsx";

const Duas = () => {
	const router = useRouter();
	const { content } = useI18n();
	const theme = useTheme();
	const categories = useCategories();

	useEffect(() => {
		if (categories.length === 0) events.emit("loadDuas");

		// ? I know what I'm doing
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ScreenWrapper
			title={content.pages.duas}
			style={{
				gap: 16,
				padding: 16,
			}}
			scroll
			settingsControl
			back
		>
			{categories.length === 0 ? (
				<Loading />
			) : (
				categories.map((category) => (
					<Surface
						key={category}
						style={{
							borderRadius: 16,
						}}
					>
						<TouchableRipple
							style={[
								theme.styles.view.row,
								{
									padding: 8,
									justifyContent: "space-between",
									alignItems: "center",
								},
							]}
							onPress={() => {
								router.push(`/duas/${category}`);
							}}
						>
							<>
								<Text
									variant="headlineSmall"
									style={{ fontSize: 16 }}
								>
									{humanizeToken(category)}
								</Text>
								<Icon
									name={"arrow-next"}
									size={28}
									color={theme.colors.primary}
								/>
							</>
						</TouchableRipple>
					</Surface>
				))
			)}
		</ScreenWrapper>
	);
};

export default Duas;
