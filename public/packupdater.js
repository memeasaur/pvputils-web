import JSZip from 'jszip';

/** @param {MessageEvent<File>} e */
self.onmessage = async e => {
    const updatedPack = new JSZip();
    self.Promise.all(Object.entries((await new JSZip().loadAsync(e.data)).files)
        .map(async ([filename, file]) => {
            // TODO -> option for maintaining backwards compatibility -> adding the old files too
            // TODO -> progress bar
            // TODO -> progress console
            filename = filename
                .replace("/blocks/", "/block/")
                .replace("/items/", "/item/")
            const content = file.dir
                ? null
                : filename === "pack.mcmeta"
                    ? (await file.async("string"))
                        // .replace() TODO
                        .replace('"pack_format": 1', '"pack_format": 46')
                    : await file.async("uint8array")

            // TODO PRETTY SURE THIS IS SAFELY MUTATING UPDATED PACK BECAUSE JAVASCRIPT SINGLE THREADED EVENT LOOP!
            if (content === null)
                updatedPack.folder(filename);
            else
                updatedPack.file(filename, content);
        }))
        .then(() => self.postMessage(updatedPack))
}