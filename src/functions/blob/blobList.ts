import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { listBlobsPaginated } from "../../utils/blob/crud";

export async function blobList(
	req: HttpRequest
): Promise<HttpResponseInit> {
	try {
		const page = parseInt(req.query.get("page") || "1", 10);
		const pageSize = parseInt(req.query.get("pageSize") || "50", 10);

		if (page < 1 || pageSize < 1) {
			return { status: 400, body: "Invalid page or pageSize" };
		}

		const { blobs, hasMore } = await listBlobsPaginated(page, pageSize);

		return {
			status: 200,
			body: JSON.stringify({
				message: "Connected to Azure Blob successfully",
				blobs,
				page,
				pageSize,
				hasMore,
			}),
			headers: { "Content-Type": "application/json" },
		};
	} catch (err: any) {
		return { status: 500, body: `Error: ${err.message}` };
	}
}
