import { getContainerClient } from "../../lib/azure/blob";

// Check Azure Blob exist ===============================================
export async function blobExists(key: string): Promise<boolean> {
	const blob = getContainerClient(
		process.env.AZURE_BLOB_CONTAINER
	).getBlockBlobClient(key);
	return blob.exists();
}

// Download Azure Blob ===================================================
export async function downloadBlob(key: string): Promise<Buffer | null> {
	const blob = getContainerClient(
		process.env.AZURE_BLOB_CONTAINER
	).getBlockBlobClient(key);

	if (!(await blob.exists())) {
		return null;
	}

	const downloadResp = await blob.download();
	const buffer = Buffer.from(await streamToBuffer(downloadResp.readableStreamBody!));
	return buffer;
}

async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Uint8Array> {
	return new Promise((resolve, reject) => {
		const chunks: Uint8Array[] = [];
		readableStream.on("data", (data) => {
			chunks.push(data instanceof Buffer ? data : Buffer.from(data));
		});
		readableStream.on("end", () => {
			resolve(Buffer.concat(chunks));
		});
		readableStream.on("error", reject);
	});
}


// Upload Azure Blob ====================================================
export async function uploadCsvBlob(
	filename: string,
	buffer: Buffer
) {
	const containerClient = getContainerClient(process.env.AZURE_BLOB_CONTAINER);
	const blockBlobClient = containerClient.getBlockBlobClient(filename);

	await blockBlobClient.uploadData(buffer, {
		blobHTTPHeaders: { blobContentType: "text/csv" },
	});

	return {
		filename,
		size: buffer.length,
		blobUrl: blockBlobClient.url,
	};
}

// Delete Azure Blob ===================================================
export async function deleteBlob(key: string): Promise<boolean> {
	const blob = getContainerClient(
		process.env.AZURE_BLOB_CONTAINER
	).getBlockBlobClient(key);

	if (!(await blob.exists())) {
		return false;
	}

	// Soft delete (Need to setting this feature in Azure container)
	await blob.delete();
	return true;
}

export async function undeleteBlob(key: string): Promise<boolean> {
	const blob = getContainerClient(
		process.env.AZURE_BLOB_CONTAINER
	).getBlockBlobClient(key);

	try {
		await blob.undelete(); // need to setuup soft delete function in azure container
		return true;
	} catch (err) {
		console.error(`Failed to undelete blob: ${key}`, err);
		return false;
	}
}


// List & Panigate Azure Blob ===================================================
export async function listBlobsPaginated(
	page: number = 1,
	pageSize: number = 50
): Promise<{ blobs: string[]; hasMore: boolean }> {
	const containerClient = getContainerClient(process.env.AZURE_BLOB_CONTAINER);

	const iterator = containerClient
		.listBlobsFlat()
		.byPage({ maxPageSize: pageSize });

	let currentPage = 1;
	let segment: any = null;

	for await (const response of iterator) {
		if (currentPage === page) {
			segment = response;
			break;
		}
		currentPage++;
	}

	if (!segment) {
		return { blobs: [], hasMore: false };
	}

	const blobs = segment.segment.blobItems.map((b: any) => b.name);
	return { blobs, hasMore: !!segment.continuationToken };
}