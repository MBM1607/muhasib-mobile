import { FlashList } from "@shopify/flash-list";
import { useEffect } from "react";

import { Loading } from "../../../components/app/loading.component.tsx";
import { ScreenWrapper } from "../../../components/layout/screen-wrapper.component.tsx";
import { SurahCard } from "../../../components/quran/surah-card.component.tsx";
import { useI18n } from "../../../contexts/i18n.context.tsx";
import { useQuran } from "../../../contexts/quran.context.tsx";
import { events } from "../../../helpers/events.helpers.ts";

const Quran = () => {
	const { content } = useI18n();
	const quran = useQuran();

	useEffect(() => {
		if (quran === null) events.emit("loadQuran");

		// ? I know what I'm doing
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ScreenWrapper
			title={content.pages.quran}
			style={{
				gap: 16,
				padding: 16,
			}}
			settingsControl
			back
		>
			{quran === null ? (
				<Loading />
			) : (
				<FlashList
					data={quran.surahs}
					estimatedItemSize={72}
					renderItem={({ item, index }) => (
						<SurahCard
							surah={item}
							surahIndex={index}
							style={{
								marginBottom: index === quran.surahs.length - 1 ? 0 : 16,
							}}
						/>
					)}
				/>
			)}
		</ScreenWrapper>
	);
};

export default Quran;
