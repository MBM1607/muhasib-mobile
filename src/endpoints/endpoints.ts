import { userEndpoints, userMocks } from "./user.endpoints";

import { isFetchMocked } from "../config";

export const endpoints = {
	user: isFetchMocked ? userMocks : userEndpoints,
};

export type Endpoints = typeof endpoints;
