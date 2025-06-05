import JSZip from 'jszip';

/**
 * @param {MessageEvent<File>} e
 */
self.onmessage = async e => {
    const updatedResources = Promise.all(Object.entries((await new JSZip().loadAsync(e.data)).files).map(async ([filename, file]) => {
        // TODO -> option for maintaining backwards compatibility -> adding the old files too
        // TODO -> progress bar
        // TODO -> progress console
        return {
            filename: filename
                .replace("/blocks/", "/block/")
                .replace("/items/", "/item/"),
            content: file.dir
                ? null
                : filename === "pack.mcmeta"
                    ? (await file.async("string")) // .replace() TODO
                        .replace('"pack_format": 1', '"pack_format": 46')
                    : await file.async("uint8array")
        }; // TODO -> just use null content as isFile
    }))
    const updatedPack = new JSZip()
    for (const {filename, content} of updatedResources) {
        if (content === null)
            updatedPack.folder(filename)
        else
            updatedPack.file(filename, content)
    }
    // return updatedPack
}