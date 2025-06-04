'use client';
import JSZip from "jszip";

export function PackInput() {
    async function handle(pack: File | undefined) {
        if (!pack)
            alert("invalid pack")
        else {
            const updatedResources = await Promise.all(Object.entries((await new JSZip().loadAsync(pack)).files).map(async ([filename, file]) => {
                // TODO -> option for maintaining backwards compatibility -> adding the old files too
                // TODO -> progress bar
                // TODO -> progress console
                if (filename === "pack.mcmeta") {
                    // TODO
                }
                filename = filename.replace("/blocks/", "/block/")
                filename = filename.replace("/items/", "/item/")
                const isDir = file.dir
                const content = isDir
                    ? null
                    : await file.async("uint8array")
                return [filename, content, isDir]
            }))
        }
    }
    return (
        <input type="file" className={"nextButton"} onChange={e => handle(e.target.files?.[0])}/>
    )
}