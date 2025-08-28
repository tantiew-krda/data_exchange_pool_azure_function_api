export interface BlobListResponse {
    message: string;
    blobs: string[];
    page?: number;         // option: current page
    pageSize?: number;     // option: page size
    hasMore?: boolean;     // option: does blob has next page?
}

export interface UploadCsvResponse {
    ok: boolean;
    filename: string;
    size: number;
    blobUrl: string;
}

export interface DownloadBlobResponse {
    ok: boolean;
    filename: string;
    size: number;
    contentType: string;
    buffer: Buffer;        // real file data
}

// For deleteBlob / undeleteBlob
export interface DeleteBlobResponse {
    ok: boolean;
    filename: string;
    action: "delete" | "undelete";
    message: string;
}

export interface BlobErrorResponse {
    ok?: false;
    error: string;
    details?: string;
}
