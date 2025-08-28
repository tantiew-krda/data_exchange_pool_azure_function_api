import { app } from "@azure/functions";
import { getMockUser } from "./functions/getMockUser";
import { createUser } from "./functions/admin";

app.setup({
	enableHttpStream: true,
});

app.http("getMockUser", {
	methods: ["GET"],
	authLevel: "function",
	route: "getMockUser/{id}",
	handler: getMockUser,
});

app.http("createUser", {
	methods: ["POST"],
	authLevel: "function",
    route: "v1/admin/user/create",
	handler: createUser,
});
