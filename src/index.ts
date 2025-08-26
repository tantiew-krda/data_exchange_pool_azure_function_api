import { app } from "@azure/functions";
import { getMockUser } from "./functions/getMockUser";

app.setup({
	enableHttpStream: true,
});


app.http("getMockUser", {
	methods: ["GET"],
	authLevel: "function",
	route: "getMockUser/{id}",
	handler: getMockUser,
});