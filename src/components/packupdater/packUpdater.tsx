'use client';
import React, {useRef, useState} from "react";
import { PackUpdateWorkerRequest, PackUpdateWorkerResponse } from './types';

export default function PackUpdater() {
    const [updatedPacks, setUpdatedPacks] = useState<PackUpdateWorkerResponse[]>([]);
    const workersCounter = useRef(0)
    const tasks = useRef<File[]>([])
    return (
        <>
            <input multiple type="file" className={"nextButton"} onChange={e => {
                const packs = e.target.files;
                if (!packs)
                    alert("invalid upload")
                // TODO -> refresh (?)
                else {
                    for (const pack of packs) {
                        if (workersCounter.current < 4) { // TODO -> different handling per device (?)
                            {
                                const worker = new Worker(new URL('./packupdateworker.ts', import.meta.url))
                                worker.onmessage = (e: MessageEvent<PackUpdateWorkerResponse>) => {
                                    setUpdatedPacks(currentUpdatedPacks => [...currentUpdatedPacks, e.data])
                                    const next = tasks.current.pop()
                                    if (next)
                                        worker.postMessage(next)
                                    else {
                                        worker.terminate()
                                        workersCounter.current = workersCounter.current - 1
                                    }
                                }
                                worker.postMessage({pack, packName: pack.name} as PackUpdateWorkerRequest)
                            }
                            workersCounter.current = workersCounter.current + 1
                        }
                        else
                            tasks.current.push(pack)
                    }
                }
            }}/>
            <ol className={"font-[family-name:var(--font-geist-mono)]"}>
                foo
            </ol>
            <ol className={"font-[family-name:var(--font-geist-mono)]"}>
                {updatedPacks.map((pack) => (
                    <li key={pack.updatedPackName}>
                        <a href={URL.createObjectURL(pack.updatedPack)} download={pack.updatedPackName}>
                            {pack.updatedPackName}
                        </a>
                    </li>
                ))}
            </ol> {/*TODO -> just make this a link to the bucket*/}
        </>
    )
}