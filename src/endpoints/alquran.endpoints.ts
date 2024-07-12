import { getRequest } from "../helpers/api.helpers.ts";
import { alafasyQuranResponseSchema } from "../schemas/alquran.schemas.ts";

export const alQuranEndpoints = {
	getWholeQuran: async () => {
		const response = await getRequest(
			"https://api.alquran.cloud/v1/quran/ar.alafasy",
			{
				isExternal: true,
			},
		);

		const parsedResponse = alafasyQuranResponseSchema.parse(response);

		return parsedResponse.data;
	},
};
