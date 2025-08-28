import { app } from "@azure/functions";
import { getMockUser } from "./functions/getMockUser";

// Import blob function
import { blobList } from "./functions/blob/blobList";
import { uploadCsv } from "./functions/blob/upload";
import { downloadCsv } from "./functions/blob/download";
import { deleteCsv } from "./functions/blob/delete";

app.setup({
	enableHttpStream: true,
});


app.http("getMockUser", {
	methods: ["GET"],
	authLevel: "function",
	route: "getMockUser/{id}",
	handler: getMockUser,
});

app.http("blobList", {
	methods: ["GET"],
	authLevel: "function",
	route: "blobList",
	handler: blobList,
});

app.http("uploadCsv", {
	methods: ["POST"],
	authLevel: "function",
	route: "uploadCsv",
	handler: uploadCsv,
});

app.http("downloadCsv", {
	methods: ["GET"],
	authLevel: "function",
	route: "downloadCsv",
	handler: downloadCsv,
});

app.http("deleteCsv", {
	methods: ["DELETE"],
	authLevel: "function",
	route: "deleteCsv",
	handler: deleteCsv,
});