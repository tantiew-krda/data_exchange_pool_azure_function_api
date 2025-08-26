import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import { getUserController } from "../controllers/mockuser.controller";

export async function getMockUser(req: HttpRequest): Promise<HttpResponseInit> {
	return await getUserController(req);
}

// app.http("getMockUser", {
// 	methods: ["GET"],
// 	authLevel: "function",
// 	handler: getMockUser,
// });
