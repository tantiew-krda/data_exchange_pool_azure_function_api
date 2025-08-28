import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { uploadCsvBlob } from "../../utils/blob/crud";

export async function uploadCsv(
	req: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	try {
		// read file in buffer
		const arrayBuffer = await req.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const filename = req.query.get("filename") || "upload.csv";

		if (!buffer || buffer.length === 0) {
			return { status: 400, body: "No file uploaded or empty file" };
		}

		const result = await uploadCsvBlob(filename, buffer);

		return {
			status: 200,
			body: JSON.stringify({ ok: true, ...result }),
			headers: { "Content-Type": "application/json" },
		};
	} catch (err: any) {
		context.error(`Upload CSV error: ${err.message}`);
		return { status: 500, body: `Upload CSV error: ${err.message}` };
	}
}
