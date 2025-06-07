export type PackUpdateWorkerRequest = {
    pack: File;
    packName: string;
    formData: FormData
};
export type PackUpdateWorkerResponse = {
    updatedPack: Blob;
    updatedPackName: string;
};