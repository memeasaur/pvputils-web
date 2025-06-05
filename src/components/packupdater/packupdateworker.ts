import JSZip from "jszip";

self.onmessage = async (e: MessageEvent<PackUpdateWorkerRequest>) => {
    const data = e.data
    const updatedPack = await new JSZip().loadAsync(data.pack);
    await Promise.all(Object.entries(updatedPack.files) // TODO -> apparently object.entries is safely capturing a snapshot of the files, so mutating it is fine
        .map(async ([oldFilename, file]) => {
            // TODO -> progress bar
            // TODO -> progress console

            const newFilename = oldFilename
                .replace("/blocks/", "/block/")
                .replace("/items/", "/item/")
            const content = file.dir
                ? null
                : newFilename === "pack.mcmeta"
                    ? (await file.async("string"))
                        // .replace() TODO
                        .replace('"pack_format": 1', '"pack_format": 46')
                    : await file.async("uint8array")

            // TODO -> option for maintaining backwards compatibility
            updatedPack.remove(oldFilename)

            if (content === null) // TODO PRETTY SURE THIS IS SAFELY MUTATING UPDATED PACK BECAUSE JAVASCRIPT SINGLE THREADED EVENT LOOP!
                updatedPack.folder(newFilename);
            else
                updatedPack.file(newFilename, content);
        }))
    self.postMessage({ updatedPack: await updatedPack.generateAsync({ type: "blob" }), updatedPackName: data.packName } as PackUpdateWorkerResponse);
}
export {}