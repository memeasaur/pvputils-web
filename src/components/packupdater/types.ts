import {UUID} from "node:crypto";

export type PackUpdateWorkerFormData = {
    blendMode: "multiply" | "overlay";
    "1.8Assets": Blob | null;
    defaultPack: File | null;
    "64xPack": File | null;
    "32xPack": File | null;
    "16xPack": File | null;
    isModernBasePackEnabled: boolean;
    isBlinkingHeartSpriteRemoved: boolean;
    isWitherHeartSpriteRecolored: boolean;
    isBackwardCompatible: boolean;
    packDescriptionWatermark: string | null | undefined;
    isNetheriteWeapons: boolean;
    isNetheriteTools: boolean;
    packNameWatermark: string | null | undefined;
    isFontDeleted: boolean;
}
export type PackUpdateWorkerRequest = {
    pack: File;
    packName: string;
    formData: PackUpdateWorkerFormData
    uuid: UUID;
};
export type PackUpdateWorkerResponse = {
    updatedPack: Blob;
    updatedPackName: string;
    uuid: UUID;
};