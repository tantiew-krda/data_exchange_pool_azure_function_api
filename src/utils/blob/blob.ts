import { getContainerClient } from "../../lib/azure/blob";

export async function blobExists(key: string): Promise<boolean> {
  const blob = getContainerClient(
    process.env.AZURE_BLOB_CONTAINER
  ).getBlockBlobClient(key);
  return blob.exists();
}

export async function uploadBlob(
  key: string,
  buf: Buffer,
  contentType: string
) {
  const blob = getContainerClient(
    process.env.AZURE_BLOB_CONTAINER
  ).getBlockBlobClient(key);
  await blob.uploadData(buf, {
    blobHTTPHeaders: { blobContentType: contentType },
  });
  return blob;
}
