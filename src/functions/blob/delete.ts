import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { deleteBlob, undeleteBlob } from "../../utils/blob/crud";

export async function deleteCsv(
	req: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	try {
		const filename = req.query.get("filename");
		const action = req.query.get("action") || "delete";

		if (!filename) {
			return { status: 400, body: "Missing query param: key" };
		}

		let ok = false;

		if (action === "undelete") {
			ok = await undeleteBlob(filename);
			if (!ok) {
				return { status: 404, body: `Blob not found or cannot be undeleted: ${filename}` };
			}
			return {
				status: 200,
				body: JSON.stringify({ ok: true, message: "Blob undeleted", filename }),
				headers: { "Content-Type": "application/json" },
			};
		}

		// default = delete
		ok = await deleteBlob(filename);
		if (!ok) {
			return { status: 404, body: `Blob not found: ${filename}` };
		}

		return {
			status: 200,
			body: JSON.stringify({ ok: true, message: "Blob deleted", filename }),
			headers: { "Content-Type": "application/json" },
		};
	} catch (err: any) {
		context.error(`Blob delete error: ${err.message}`);
		return { status: 500, body: `Blob delete error: ${err.message}` };
	}
}
