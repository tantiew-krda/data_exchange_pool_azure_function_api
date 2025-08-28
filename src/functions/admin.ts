import { HttpRequest, HttpResponseInit } from "@azure/functions";
import {
	getUserController,
	createUserController,
} from "../controllers/admin/admin.controller";

export async function getUser(req: HttpRequest): Promise<HttpResponseInit> {
	return await getUserController(req);
}

export async function createUser(req: HttpRequest): Promise<HttpResponseInit> {
	return await createUserController(req);
}

export async function getUserById(req: HttpRequest): Promise<HttpResponseInit> {
	return await getUserController(req);
}

export async function updateUserById(
	req: HttpRequest
): Promise<HttpResponseInit> {
	return await getUserController(req);
}

export async function deleteUserById(
	req: HttpRequest
): Promise<HttpResponseInit> {
	return await getUserController(req);
}

/** 


COMPANY
dbdbfdd1-576d-46ac-93b0-2fe8997152a4	skc
7715fcc7-d64b-4a4a-8f78-e35afa437e50	krda


TEAM
f04dc346-3aea-43e0-bd03-8aa3525925b9	sell
7c8b1aca-d519-4ec8-8b7f-b4f2be5f531e	marketing
cd309868-5709-4459-b7e7-167e0b1162e2	service
b67d8072-df27-4e64-ba70-e7c72866439a	iot


ROLE
132d6037-ab2a-4000-9f9d-cda6a440baf3	admin
1020df9b-9f43-41c6-873b-5fd7a2428911	user
692eca2c-3b38-49fe-8aac-36be48e08700	dev
e4cbaf31-25e6-4ae8-b281-1daf39d0fa24	download
e945c9f4-9ff6-4526-b63b-86e1f721535f	upload


**/
