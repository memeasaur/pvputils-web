import React from "react";
import {PvpUtilsUpdateData} from "@/app/[connection]/page";

export function OverviewAccordionContent(props: {
    created_at: string,
    generic_patchnotes: string[],
    extra_patchnotes: React.ReactNode
}) {
    return (
        <div className={"flex flex-col gap-4"}>
            <p>
                {new Date(props.created_at).toLocaleDateString()}
            </p>
            <ol className="">{/*TODO -> examples for each in accordions*/}
                {props.generic_patchnotes.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ol>
            {props.extra_patchnotes}
        </div>)
}

export function FabricPvpUtilsDescription({data}: {data: PvpUtilsUpdateData}) {
    return (
        <OverviewAccordionContent
            created_at={data.created_at}
            generic_patchnotes={data.generic_patchnotes}
            extra_patchnotes={(
                <>
                    <div className={"flex w-full gap-2"}>{/*TODO -> idk why this needs w-full*/}
                        <div className={"w-2/4 flex flex-col gap-2"}>
                            <p>1.9 combat</p>
                            <ol start={data.generic_patchnotes.length + 1}>
                                {data["1.9_patchnotes"].map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ol>
                        </div>
                        <div className={"w-2/4 flex flex-col gap-2"}>
                            <p>1.8 combat</p>
                            <ol start={data.generic_patchnotes.length + 1}>
                                {data["1.8_patchnotes"].map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    {data.nullable_recommended_mods_info && (
                        <ol>other recommended mods
                            {data.nullable_recommended_mods_info.map((item) => (
                                <li key={item.name}>{item.name}</li>
                            ))}
                        </ol>)}
                </>
            )}
        />
    )
}