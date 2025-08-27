import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContainerClient } from "../lib/azure/blob";

export async function uploadCsv(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  try {
    // read file in buffer arrayBuffer
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = req.query.get("filename") || "upload.csv";

    if (!buffer || buffer.length === 0) {
      return { status: 400, body: "No file uploaded or empty file" };
    }

    const containerClient = getContainerClient(process.env.AZURE_BLOB_CONTAINER);
    const blockBlobClient = containerClient.getBlockBlobClient(filename);

    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: "text/csv" },
    });

    return {
      status: 200,
      body: JSON.stringify({
        ok: true,
        filename,
        size: buffer.length,
        blobUrl: blockBlobClient.url,
      }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (err: any) {
    return { status: 500, body: `Upload CSV error: ${err.message}` };
  }
}
