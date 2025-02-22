import { listProfiles } from "@brawltracker/supercell-id-api";

export default defineEventHandler(async (event) => {
	const { scidAccountToken } = useRuntimeConfig(event);

	const sessionToken = await getCachedScidSessionToken(scidAccountToken);

	const scids = [
		"00-73c673be-f2ff-4d7e-bbaa-d82d9ca6d14b",
		"05-e3c931a3-f118-41e1-abda-7735fdcec17b",
		"07-69f6234f-ad70-424b-9948-65cec419f273",
		"10-c7aa83a5-5fd7-417f-8521-a4d8e46e3117",
		"13-a8f9999b-a35e-4b71-8099-866cedd32efc",
		"15-77739278-24aa-4f13-9bb4-9ab4f5914068",
		"17-ae9e6202-6aad-499b-8939-0b59185f7888",
		"18-2b53b493-95c1-4719-97f8-0fd2dbceb744",
		"18-76b2010b-2b99-4f7e-baa1-45de88431b0c",
		"20-3f00a3d6-e7c6-4f75-861b-e11df79480d8",
		"22-0390ab73-6f4b-433f-8d96-84f784ccf407",
		"24-f102bb38-0a23-44c8-8236-e1f61a0756c9",
		"25-6901db7e-3724-445b-917e-f79cc5f87d8f",
		"25-a18225ae-fa80-4ab7-b84d-07550f63462d",
		"27-37ebc6c8-2f63-4c88-a123-93ed54061016",
		"34-eeff0648-000e-4c70-acf4-194733dfbd46",
		"37-89765c6b-42d9-4b63-bea0-0d502b08cc72",
		"39-c2f90e22-1028-4e46-8081-ebd8b8aa0e41",
		"43-539270ee-36c4-43d0-908f-8ce402bb1449",
		"45-de32f93a-e561-47bf-8cb4-852491a26767",
		"46-4f3abe4b-b1aa-4f2a-906d-715fc0a2ef3b",
		"54-ca08ffa0-aaa4-4a02-a5b0-91abeec89541",
		"54-daf6ba41-d567-4440-b352-75cf396f9b0c",
		"57-eba7c54d-e62d-4b4c-aa6a-eb27c38a66fc",
		"58-c2560476-f60c-4ce7-b0e8-5748c62dd53c",
		"67-8c2b4392-6d3c-46a8-adcc-dca356801def",
		"74-89cfd303-15c0-4eef-b4a1-d7aa51adc144",
		"74-faeaa1f4-9c1c-4cc4-8fe3-32624713d3ed",
		"79-bd1d457c-9a4a-4b30-b7ad-41b7ceebc9bc",
		"86-f1211235-b0a9-41b3-a0b7-957ec2a167a2",
		"87-cd330576-4723-4abd-a1bb-777d583ae45b",
		"87-e8e3da0d-851c-406b-8980-b4fe3126bdbb",
		"95-13ea5094-0670-487c-b6a6-92df8fce5d96",
		"95-547754a0-0d6c-404c-8f99-cc0f3cf9b0a1",
		"95-f68085c1-91df-4a37-bb4d-91d8d9dc422c",
		"97-7d0e865d-bc58-4cb7-9dce-aa8c1dcc56be",
		"99-d9f68803-b82a-4177-bf02-75b1214e797a",
	];

	return await listProfiles(sessionToken!.token, scids, "scids");
});
