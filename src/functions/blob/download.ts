import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { downloadBlob } from "../../utils/blob/crud";

export async function downloadCsv(
	req: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	try {
		const filename = req.query.get("filename");
		if (!filename) {
			return { status: 400, body: "Filename query parameter is required" };
		}

		const buffer = await downloadBlob(filename);
		if (!buffer) {
			return { status: 404, body: `File not found: ${filename}` };
		}

		return {
			status: 200,
			body: buffer,
			headers: {
				"Content-Type": "text/csv",
				"Content-Disposition": `attachment; filename="${filename}"`,
			},
		};
	} catch (err: any) {
		context.error("Download error", err);
		return { status: 500, body: `Download CSV error: ${err.message}` };
	}
}
