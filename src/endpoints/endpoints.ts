import { alQuranEndpoints } from "./alquran.endpoints.ts";
import { userEndpoints, userMocks } from "./user.endpoints.ts";

import { isFetchMocked } from "../config.ts";

export const endpoints = {
	user: isFetchMocked ? userMocks : userEndpoints,
	alquran: alQuranEndpoints,
};

export type Endpoints = typeof endpoints;
