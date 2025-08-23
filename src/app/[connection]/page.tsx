import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";
import {supabaseClient} from "@/lib/supabase";
import React from "react";
import PackUpdater from "@/components/packupdater/packUpdater";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const revalidate = 302400 // supabase inactivity timeout
export default async function Page({ params }: { params: {connection: string} }) {
    const {
        data: pvpUtilsData,
        error
    } = await supabaseClient
        .from('fabricpvputils_updates')
        .select('*')
    if (error)
        throw new Error(error.message)
    const {
        data: packUpdaterData,
        error: error1
    } = await supabaseClient
        .from('packupdater_updates')
        .select('*')
    if (error1)
        throw new Error(error1.message)
    const pvpUtilsData0 = pvpUtilsData[0]
    fetch('https://api.modrinth.com/v2/project/fabric-pvp-utils', { // TODO
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${process.env.MODRINTH_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: pvpUtilsData0.markdown}),
    })

    const connection = (await params).connection // ?
    return (
        <main
            style={{backgroundImage: Math.random() < .5
                    ? "url('https://xapkbnegosbyhmondqti.supabase.co/storage/v1/object/public/packs/fire_layer_0.png')"
                    : "url('https://xapkbnegosbyhmondqti.supabase.co/storage/v1/object/public/packs/fire_layer_1.png')",
                backgroundSize: "100% 3200%",
                // height: "100vh",
                // backgroundPosition: "center bottom",
                backgroundAttachment: "fixed",
                imageRendering: "pixelated",
                animation: "play 3.2s steps(32) infinite"}}
            className="grid grid-rows-[20vh_1fr_auto] p-8 sm:p-20 place-items-center w-full min-h-screen">{/*TODO -> actually center this*/}
            <Accordion type="single" collapsible
                       className={"w-full row-start-2"}
                       style={{
                           backdropFilter: "blur(1vw)",
                           backgroundColor: "rgba(255, 255, 255, 0.95)",
                           borderRadius: "1vw",
                           padding: "1vw"
                       }}
                       defaultValue={connection === "packupdater" ? "item-2" : connection === "fabric" ? "item-1" : ""}>
                <AccordionItem value="item-2">
                    <ChangelogAccordionTrigger
                        title={"pack-updater"}
                        version={packUpdaterData[0].version}
                        summary={packUpdaterData[0].summary}
                        updateData={
                            <>
                                accepts (1.7.10).zip, returns (1.21.4).zip
                            </>}
                        modrinthButton={null}
                    />
                    <AccordionContent className={"flex flex-col gap-4"}>
                        <PackUpdater></PackUpdater>{/*TODO -> allow non-compressed files (?)*/}
                        <OverviewAccordionContent
                            created_at={packUpdaterData[0].created_at}
                            generic_patchnotes={packUpdaterData[0].generic_patchnotes}
                            extra_patchnotes={null}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-1" className={"w-full"}>
                    <ChangelogAccordionTrigger
                        title={"fabric-pvputils"}
                        version={pvpUtilsData0.version}
                        summary={pvpUtilsData0.summary}
                        updateData={<>
                            ({pvpUtilsData0.minecraft_versions}) {pvpUtilsData0.nullable_dependencies && (
                            <>
                                depends: {pvpUtilsData0.nullable_dependencies.map((item, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && ', '}
                                    {item}
                                </React.Fragment>
                            ))}
                            </>
                        )}
                        </>}
                        modrinthButton={<a
                            className="nextButton"
                            href="https://modrinth.com/mod/fabric-pvp-utils"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {/*<Image*/}
                            {/*  className="dark:invert"*/}
                            {/*  src=""*/}
                            {/*  alt="Modrinth logomark"*/}
                            {/*  width={20}*/}
                            {/*  height={20}*/}
                            {/*/>TODO modrinth logo*/}
                            modrinth
                        </a>}
                    />
                    <AccordionContent className={"flex flex-col gap-4"}>
                        <a
                            href="https://github.com/pvputils/fabricpvputils-oss"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Badge variant="secondary">github</Badge>
                        </a>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {pvpUtilsData0.markdown}
                        </ReactMarkdown>
                    </AccordionContent>
                </AccordionItem>
                {/*<AccordionItem value="item-3">*/}
                {/*    <AccordionTrigger>*/}
                {/*        <s>fabric-pvputils+</s>*/}
                {/*    </AccordionTrigger>*/}
                {/*    <AccordionContent>*/}
                {/*        todo*/}
                {/*    </AccordionContent>*/}
                {/*</AccordionItem>TODO */}
            </Accordion>
            <a
                href="https://github.com/memeasaur/pvputils-web"
                target="_blank"
                rel="noopener noreferrer"
                className={"row-start-3 justify-self-end"}
            >
                <Badge variant="secondary">github</Badge>
            </a>
        </main>
    );
}

function ChangelogAccordionTrigger(props: {
    title: string,
    version: number,
    summary: string,
    updateData: React.ReactNode
    modrinthButton: React.ReactNode
}) {
    return (
        <AccordionTrigger
            className="flex gap-4 items-center w-full"> {/*TODO -> make this piece of shit always w-full good fucking luck*/}
            <div className={"flex items-center"}> {/*TODO -> accordionTrigger should just be doing this*/}
                <div className={""}>
                    <div className={"flex items-center gap-2"}>
                        <p className="text-lg">
                            {props.title}
                        </p> {/*TODO idk why tf next has header tags all the same size*/}
                        <p>
                            v{props.version} - {props.summary}
                        </p>
                    </div>
                    <p>
                        {props.updateData}
                    </p>
                </div>
                {props.modrinthButton}
            </div>
        </AccordionTrigger> // {/*TODO -> video embed*/}
    )
}
// type PvpUtilsUpdateData = Database["public"]["Tables"]["fabricpvputils_updates"]["Row"]
function OverviewAccordionContent(props: {
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
// function FabricPvpUtilsDescription({data}: {data: PvpUtilsUpdateData}) {
//     return (
//         <OverviewAccordionContent
//             created_at={data.created_at}
//             generic_patchnotes={data.generic_patchnotes}
//             extra_patchnotes={(
//                 <>
//                     <div className={"flex w-full gap-2"}>{/*TODO -> idk why this needs w-full*/}
//                         <div className={"w-2/4 flex flex-col gap-2"}>
//                             <p>1.9 combat</p>
//                             <ol start={data.generic_patchnotes.length + 1}>
//                                 {data["1.9_patchnotes"].map((item) => (
//                                     <li key={item}>{item}</li>
//                                 ))}
//                             </ol>
//                         </div>
//                         <div className={"w-2/4 flex flex-col gap-2"}>
//                             <p>1.8 combat</p>
//                             <ol start={data.generic_patchnotes.length + 1}>
//                                 {data["1.8_patchnotes"].map((item) => (
//                                     <li key={item}>{item}</li>
//                                 ))}
//                             </ol>
//                         </div>
//                     </div>
//                     {data.nullable_recommended_mods_info && (
//                         <ol>other recommended mods
//                             {data.nullable_recommended_mods_info.map((item) => (
//                                 <li key={item.name}>{item.name}</li>
//                             ))}
//                         </ol>)}
//                 </>
//             )}
//         />
//     )
// }