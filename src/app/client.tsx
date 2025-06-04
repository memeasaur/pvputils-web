'use client';
import JSZip from "jszip";

export function PackInput() {
    async function handle(file: File) {
        const jszip = new JSZip();
        const zip = await jszip.loadAsync(file);
        for (const filename of Object.keys(zip.files)) {
            const content = await zip.files[filename].async("string");
            console.log(filename, content);
        }
    }
    return (
        <input type="file" className={"nextButton"} onChange={e => {
            const pack = e.target.files?.[0]
            if (pack) {
                handle(pack)
            }
        }}/>
    )
}