import { createContext, useContext, useEffect, useState } from "react";

import { endpoints } from "../endpoints/endpoints.ts";
import { events } from "../helpers/events.helpers.ts";

import type { PropsWithChildren } from "react";
import type { AlafasyQuran } from "../schemas/alquran.schemas.ts";

const QuranContext = createContext<AlafasyQuran | null>(null);

export const QuranProvider = ({ children }: PropsWithChildren) => {
	const [quran, setQuran] = useState<AlafasyQuran | null>(null);

	useEffect(() => {
		const fetchQuran = async () => {
			try {
				const data = await endpoints.alquran.getWholeQuran();

				setQuran(data);
			} catch (error) {
				console.info("Failed to fetch data from AlQuran API");
				console.error(error);
			}
		};

		const { remove } = events.listen("loadQuran", fetchQuran);

		return () => {
			remove();
		};
	}, []);

	return (
		<QuranContext.Provider value={quran}>{children}</QuranContext.Provider>
	);
};

export const useQuran = (): AlafasyQuran | null => {
	const quran = useContext(QuranContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (quran === undefined)
		throw new Error("useQuran must be used within a QuranProvider");

	return quran;
};

export const useSurah = (surahIndex: number) => {
	const quran = useQuran();
	const surah = quran?.surahs[surahIndex];

	return surah;
};
