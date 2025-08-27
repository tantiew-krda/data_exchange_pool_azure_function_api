import { generateBlobSASQueryParameters, BlobSASPermissions, StorageSharedKeyCredential } from "@azure/storage-blob";

export const generateSasToken = (accountName: string, accountKey: string, containerName: string, blobName: string) => {
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

  const sasOptions = {
    containerName,
    blobName,
    permissions: BlobSASPermissions.parse("racwd"), // read, add, create, write, delete
    startsOn: new Date(),
    expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 ชั่วโมง
  };

  return generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
};
