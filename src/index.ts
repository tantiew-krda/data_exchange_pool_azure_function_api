import { app } from "@azure/functions";
import { getMockUser } from "./functions/getMockUser";
import { blobList } from "./functions/blobList";
import { uploadCsv } from "./functions/upload";
import { downloadFile } from "./functions/download";

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

app.http("downloadFile", {
	methods: ["GET"],
	authLevel: "function",
	route: "downloadFile",
	handler: downloadFile,
});