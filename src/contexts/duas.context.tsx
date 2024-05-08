import { createContext, useContext, useEffect, useState } from "react";

import { getRequest } from "../helpers/api.helpers.ts";
import { duasSchema } from "../schemas/duas.schemas.ts";

import type { PropsWithChildren } from "react";
import type { Duas } from "../schemas/duas.schemas.ts";

const DuasContext = createContext<Duas>([]);

export const DuasProvider = ({ children }: PropsWithChildren) => {
	const [duas, setDuas] = useState<Duas>([]);

	useEffect(() => {
		(async () => {
			const duas = await getRequest<typeof duasSchema>("duas", {
				isPublic: true,
				schema: duasSchema,
			});

			setDuas(duas);
		})();
	}, []);

	return <DuasContext.Provider value={duas}>{children}</DuasContext.Provider>;
};

export const useDuas = (): Duas => {
	const duas = useContext(DuasContext);
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (duas === undefined)
		throw new Error("useDuas must be used within a DuasProvider");

	return duas;
};

export const useCategories = (): string[] => {
	const duas = useDuas();

	return [...new Set(duas.map((dua) => dua.category))];
};

export const useDuasByCategory = (category: string): Duas => {
	const duas = useDuas();

	return duas.filter((dua) => dua.category === category);
};
