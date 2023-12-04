export type Dua = {
	id: number;
	english: string;
	arabic: string;
	urdu: string;
	reference: string;
};

export const DUA_CATEGORY_NAMES = [
	"uponWakingUp",
	// "wearingClothes",
	// "wearingNewClothes",
	// "beforeUndressing",
	// "beforeEnteringToilet",
	// "afterLeavingToilet",
	// "beforeStartingWudu",
	// "afterPerformingWudu",
	// "leaveHome",
	// "enterHome",
	// "goingToMasjid",
	// "enteringMasjid",
	// "afterLeavingMasjid",
	// "relatedToAzaan",
	// "relatedToNamaz",
	// "duringRuku",
	// "risingFromRuku",
	// "duringSajdah",
	// "betweenTwoSajdah",
] as const;

export type DuaCategoryName = (typeof DUA_CATEGORY_NAMES)[number];
export type DuaCategory = Record<DuaCategoryName, Dua[]>;

export const DUA_CATEGORIES: DuaCategory = {
	uponWakingUp: [
		{
			id: 1,
			arabic:
				"الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
			english:
				"All praise is for Allah who gave us life after having taken it from us and unto Him is the Resurrection.",
			urdu: "اللہ کا شکر ہے جس نے ہمیں زندہ کیا جب ہمیں مرنے کے بعد اور اسی کی طرف پھر کھینچا جائے گا",
			reference:
				"Al-Bukhari [6312]. see Fath al-Bari [11/113] and Muslim [2711](4/2083)",
		},
	],
};
