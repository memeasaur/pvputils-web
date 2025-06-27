import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";
import {Database} from "@/lib/supabase";
import React from "react";
import PackUpdater from "@/components/packupdater/packUpdater";
import {createClient} from "@supabase/supabase-js";
import {FabricPvpUtilsDescription, OverviewAccordionContent} from "@/lib/server";

export const revalidate = 604800 // supabase inactivity timeout
export default async function Page({ params }: { params: {connection: string} }) {
    const supabaseClient = createClient<Database>('https://xapkbnegosbyhmondqti.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcGtibmVnb3NieWhtb25kcXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTgxNTMsImV4cCI6MjA2NDM3NDE1M30.qevIYqIPh3BhiGHj_gppbggv-42RQedaF8Zd-aI5fZA')
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
    fetch('http://localhost:3000/api/modrinth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pvpUtilsData[0]),
    });

    const connection = params.connection
    return (
        <main
            className="grid grid-rows-[20vh_1fr_auto] p-8 sm:p-20 place-items-center w-full">{/*TODO -> actually center this*/}
            <Accordion type="single" collapsible className={"w-full row-start-2"} defaultValue={connection === "packupdater" ? "item-2" : connection === "fabric" ? "item-1" : ""}>
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
                        version={pvpUtilsData[0].version}
                        summary={pvpUtilsData[0].summary}
                        updateData={<PvpUtilsUpdateData data={pvpUtilsData[0]}/>}
                        modrinthButton={<a
                            className="nextButton"
                            href="https://modrinth.com"
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
                        <FabricPvpUtilsDescription data={pvpUtilsData[0]}/>
                        {pvpUtilsData.map((item, index) => index > 0 && (
                            <PvpUtilsUpdateData key={index} data={item}/>
                        ))}
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
export type PvpUtilsUpdateData = Database["public"]["Tables"]["fabricpvputils_updates"]["Row"]
function PvpUtilsUpdateData({data}: { data: PvpUtilsUpdateData }) {
    console.log("client shouldn't see this")
    return (
        <>
            ({data.minecraft_versions}) {data.nullable_dependencies && (
            <>
                depends: {data.nullable_dependencies.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 && ', '}
                    {item.name}
                </React.Fragment>
            ))}
            </>
        )}
        </>
    )
}