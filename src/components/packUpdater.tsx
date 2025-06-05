'use client';
import React, {useState} from "react";

export default function PackUpdater() {
    const [updatedPacks, setUpdatedPacks] = useState<Blob[]>([]);
    return (
        <>
            <input multiple type="file" className={"nextButton"} onChange={e => {
                const packs = e.target.files;
                if (!packs)
                    alert("invalid upload")
                // TODO -> refresh (?)
                else {

                    setUpdatedPacks(currentUpdatedPacks => [...currentUpdatedPacks, ...newUpdatedPacks]))
                }
            }}/>
            <ol className={"font-[family-name:var(--font-geist-mono)]"}>
                foo
            </ol>
            <ol className={"font-[family-name:var(--font-geist-mono)]"}>
                bar
            </ol> {/*TODO -> just make this a link to the bucket*/}
        </>
    )
}