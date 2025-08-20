export type PackUpdateWorkerFormData = {
    blendMode: "multiply" | "overlay";
    defaultPack: ArrayBuffer | null;
    "64xPack": ArrayBuffer | null;
    "32xPack": ArrayBuffer | null;
    "16xPack": ArrayBuffer | null;
    isModernBasePackEnabled: boolean;
    isBlinkingHeartSpriteRemoved: boolean;
    isWitherHeartSpriteRecolored: boolean;
    isBackwardCompatible: boolean;
    packDescriptionWatermark: string | null | undefined;
    isNetheriteWeapons: boolean;
    isNetheriteTools: boolean;
    packNameWatermark: string | null | undefined;
}
export type PackUpdateWorkerRequest = {
    pack: File;
    packName: string;
    formData: PackUpdateWorkerFormData
};
export type PackUpdateWorkerResponse = {
    updatedPack: Blob;
    updatedPackName: string;
};