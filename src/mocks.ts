import { wait } from "./helpers/async.helpers.ts";
import { dayjsUtcExtended } from "./helpers/date.helpers.ts";

import type { DbId, DbMeta, Jwt } from "./helpers/schema.helpers.ts";
import type { User } from "./schemas/user.schemas.ts";

export const mockToken =
	/** cSpell: disable-next-line */
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" as Jwt;

export const createMockedData = <T extends DbMeta>(
	data: Omit<T, keyof DbMeta>[],
) => {
	return data.map((row, index) => ({
		id: (index + 1) as DbId,
		createdAt: dayjsUtcExtended(),
		updatedAt: dayjsUtcExtended(),
		...row,
	})) as T[];
};

export const mockData = {
	user: createMockedData<User>([
		{
			email: "testing@test.com",
			name: "test",
			password: "12345",
		},
	]),
};

type MockData = typeof mockData;

type MockedGet = {
	<Key extends keyof MockData>(key: Key): Promise<MockData[Key]>;
	<Key extends keyof MockData>(
		key: Key,
		id: DbId,
	): Promise<MockData[Key][number]>;
};

export const mockedGet: MockedGet = async (key: keyof MockData, id?: DbId) => {
	const list = mockData[key];
	if (!id) {
		await wait(500);
		return list as never;
	}
	const row = list.find((curr) => curr.id === id);
	await wait(500);
	return row as never;
};

export const mockedAdd = async <
	Key extends keyof MockData,
	Type extends MockData[Key][number],
>(
	key: Key,
	body: Omit<Type, keyof DbMeta>,
): Promise<Type> => {
	const list = mockData[key];
	const newId = Math.max(...list.map((curr) => curr.id), 0) + 1;
	const now = dayjsUtcExtended();
	const added = {
		id: newId as DbId,
		createdAt: now,
		updatedAt: now,
		...body,
	} as Type;
	list.push(added);
	await wait(500);
	return added;
};

export const mockedUpdate = async <
	Key extends keyof MockData,
	Type extends MockData[Key][number],
>(
	key: Key,
	id: DbId,
	body: Omit<Type, keyof DbMeta>,
): Promise<Type> => {
	const list = mockData[key];
	const row = list.find((curr) => curr.id === id);
	if (!row) throw new Error(`No record found by ID ${id}`);
	const updatedRow = { ...row, ...body } as Type;
	list[list.indexOf(row)] = updatedRow;
	await wait(500);
	return updatedRow;
};

export const mockedDelete = async <
	Key extends keyof MockData,
	Type extends MockData[Key][number],
>(
	key: Key,
	id: DbId,
): Promise<Type> => {
	const list = mockData[key];
	const row = list.find((curr) => curr.id === id);
	if (!row) throw new Error(`No record found by ID ${id}`);
	list.splice(list.indexOf(row), 1);
	await wait(500);
	return row as Type;
};
