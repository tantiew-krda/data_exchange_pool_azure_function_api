import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getContainerClient } from "../lib/azure/blob";

export async function downloadFile(
    req: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    try {
        const filename = req.query.get("filename");
        if (!filename) return { status: 400, body: "Missing query param: filename" };

        const containerClient = await getContainerClient(process.env.AZURE_BLOB_CONTAINER);
        const blockBlobClient = containerClient.getBlockBlobClient(filename);

        const exists = await blockBlobClient.exists();
        if (!exists) return { status: 404, body: `File not found: ${filename}` };

        const downloadResponse = await blockBlobClient.download();
        if (!downloadResponse.readableStreamBody) return { status: 500, body: "Blob stream is empty" };

        const buffer = await streamToBuffer(downloadResponse.readableStreamBody);

        // 🚨 return HttpResponseInit แบบถูกต้อง
        return {
            status: 200,
            body: buffer,
            headers: {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Content-Length": buffer.length.toString(),
            },
        };
    } catch (err: any) {
        return { status: 500, body: `Download error: ${err.message}` };
    }
}

// helper แปลง stream เป็น buffer
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
        chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}
