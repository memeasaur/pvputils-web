import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";
import {createClient} from '@supabase/supabase-js'
import {Database} from "@/lib/supabase";
import React from "react";
import PackUpdater from "@/components/packupdater/packUpdater";

export default async function Home() {
    const url = 'https://xapkbnegosbyhmondqti.supabase.co'
    const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcGtibmVnb3NieWhtb25kcXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTgxNTMsImV4cCI6MjA2NDM3NDE1M30.qevIYqIPh3BhiGHj_gppbggv-42RQedaF8Zd-aI5fZA'
    const {
        data: pvpUtilsData,
        error
    } = await createClient<Database>(url, key)
        .from('fabricpvputils_updates')
        .select('*')
    if (error)
        throw new Error(error.message)
    const {
        data: packUpdaterData,
        error: error1
    } = await createClient<Database>(url, key)
        .from('packupdater_updates')
        .select('*')
    if (error1)
        throw new Error(error1.message)

    return (
        <main className="grid grid-rows-[15vh_1fr_auto] p-8 sm:p-20 place-items-center w-full">
            <Accordion type="single" collapsible className={"w-full row-start-2"}>{/*TODO defaultValue={"item-1"}*/}
                <AccordionItem value={"item-3"}>
                    <AccordionTrigger>
                        <div> {/*TODO -> accordionTrigger should just be doing this*/}
                            <p className="text-lg">
                                pack-updater pack archive
                            </p>
                            <p>
                                accepts (1.7.10).zip returns (1.21.4).zip
                            </p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>

                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className={"flex gap-4 items-center w-full"}>
                        <div> {/*TODO -> accordionTrigger should just be doing this*/}
                            <p className="text-lg">
                                pack-updater
                            </p>
                            <p>
                                accepts (1.7.10).zip, returns (1.21.4).zip
                            </p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className={"grid grid-cols-2 w-max auto-cols-auto gap-4"}>
                        <div className={"flex flex-col gap-4"}>
                            <PackUpdater></PackUpdater>{/*TODO -> allow non-compressed files (?)*/}
                            <OverviewAccordionContent
                                created_at={packUpdaterData[0].created_at}
                                generic_patchnotes={packUpdaterData[0].generic_patchnotes}
                                extra_patchnotes={null}
                            />
                        </div>
                        <div className={"flex justify-end"}>
                            foo
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-1" className={"w-full"}>
                    <ChangelogAccordionTrigger
                        title={"fabric-pvputils"}
                        version={pvpUtilsData[0].version}
                        summary={pvpUtilsData[0].summary}
                        updateData={<PvpUtilsUpdateData data={pvpUtilsData[0]}/>}
                    />
                    <AccordionContent className={"flex flex-col gap-4"}>
                        <a
                            href="https://github.com/pvputils/fabricpvputils-oss"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Badge variant="secondary">github</Badge>
                        </a>
                        <OverviewAccordionContent
                            created_at={pvpUtilsData[0].created_at}
                            generic_patchnotes={pvpUtilsData[0].generic_patchnotes}
                            extra_patchnotes={(
                                <>
                                    <div className={"flex w-full gap-2"}>{/*TODO -> idk why this needs w-full*/}
                                        <div className={"w-2/4 flex flex-col gap-2"}>
                                            <p>1.9 combat</p>
                                            <ol start={pvpUtilsData[0].generic_patchnotes.length + 1}>
                                                {pvpUtilsData[0]["1.9_patchnotes"].map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ol>
                                        </div>
                                        <div className={"w-2/4 flex flex-col gap-2"}>
                                            <p>1.8 combat</p>
                                            <ol start={pvpUtilsData[0].generic_patchnotes.length + 1}>
                                                {pvpUtilsData[0]["1.8_patchnotes"].map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                    {pvpUtilsData[0].nullable_recommended_mods_info && (
                                        <ol>other recommended mods
                                            {pvpUtilsData[0].nullable_recommended_mods_info.map((item) => (
                                                <li key={item.name}>{item.name}</li>
                                            ))}
                                        </ol>)}
                                </>
                            )}
                        />
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
        </main>
    );
}

function ChangelogAccordionTrigger(props: {
    title: string,
    version: number,
    summary: string,
    updateData: React.ReactNode
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
                <a
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
                </a>
            </div>
        </AccordionTrigger> // {/*TODO -> video embed*/}
    )
}

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

function PvpUtilsUpdateData({data}: { data: Database["public"]["Tables"]["fabricpvputils_updates"]["Row"] }) {
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
