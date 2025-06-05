type PackUpdateWorkerRequest = {
    pack: File;
    packName: string;
};
type PackUpdateWorkerResponse = {
    updatedPack: Blob;
    updatedPackName: string;
};