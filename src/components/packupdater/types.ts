export type PackUpdateWorkerRequest = {
    pack: File;
    packName: string;
};
export type PackUpdateWorkerResponse = {
    updatedPack: Blob;
    updatedPackName: string;
};