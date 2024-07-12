import z from "zod";

export const quranFormatSchema = z.enum(["audio", "text"]);
export const quranRevelationTypeSchema = z.enum(["Meccan", "Medinan"]);

export const quranAyahWithAudioSchema = z.object({
	number: z.number(),
	audio: z.string().url(),
	audioSecondary: z.array(z.string().url()),
	text: z.string(),
	numberInSurah: z.number(),
	juz: z.number(),
	manzil: z.number(),
	page: z.number(),
	ruku: z.number(),
	hizbQuarter: z.number(),
	sajda: z
		.literal(false)
		.or(
			z.object({
				id: z.number(),
				recommended: z.boolean(),
				obligatory: z.boolean(),
			}),
		),
});

export const quranEditionSchema = z.object({
	identifier: z.string(),
	language: z.string(),
	name: z.string(),
	englishName: z.string(),
	format: quranFormatSchema,
	type: z.string(),
});

export const quranSurahSchema = z.object({
	number: z.number(),
	name: z.string(),
	englishName: z.string(),
	englishNameTranslation: z.string(),
	revelationType: z.string(),
	ayahs: z.array(quranAyahWithAudioSchema),
});

export const alafasyQuranSchema = z.object({
	surahs: z.array(quranSurahSchema),
	edition: quranEditionSchema,
});

export const alafasyQuranResponseSchema = z.object({
	code: z.literal(200),
	status: z.literal("OK"),
	data: alafasyQuranSchema,
});

export type QuranAyahWithAudio = z.infer<typeof quranAyahWithAudioSchema>;
export type QuranEdition = z.infer<typeof quranEditionSchema>;
export type QuranSurah = z.infer<typeof quranSurahSchema>;
export type AlafasyQuran = z.infer<typeof alafasyQuranSchema>;
export type AlafasyQuranResponse = z.infer<typeof alafasyQuranResponseSchema>;
