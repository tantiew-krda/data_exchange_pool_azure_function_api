import {
    HttpRequest,
    HttpResponseInit,
    InvocationContext,
} from "@azure/functions";
import { getContainerClient } from "../lib/azure/blob";

export async function blobList(
    req: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    try {
        const containerClient = getContainerClient(
            process.env.AZURE_BLOB_CONTAINER
        );
        const exists = await containerClient.exists();

        if (!exists) {
            return { status: 404, body: `Container not found.` };
        }

        const blobs: string[] = [];
        for await (const blob of containerClient.listBlobsFlat()) {
            blobs.push(blob.name);
        }

        return {
            status: 200,
            body: JSON.stringify({
                message: "Connected to Azure Blob successfully!",
                blobs,
            }),
            headers: { "Content-Type": "application/json" },
        };
    } catch (err: any) {
        return {
            status: 500,
            body: `Error: ${err.message}`,
        };
    }
}
