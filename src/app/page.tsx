import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";
import {createClient} from '@supabase/supabase-js'
import {Database} from "@/lib/supabase";
import React from "react";

export default async function Home() {
    const {
        data,
        error
    } = await createClient<Database>('https://xapkbnegosbyhmondqti.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcGtibmVnb3NieWhtb25kcXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTgxNTMsImV4cCI6MjA2NDM3NDE1M30.qevIYqIPh3BhiGHj_gppbggv-42RQedaF8Zd-aI5fZA')
        .from('fabricpvputils_updates')
        .select('*')
    if (error)
        throw new Error(error.message)

    return (
        <div // TODO reactFragment ?
            className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="grid grid-rows-[30%_1fr] gap-[16px] items-center sm:items-start">
                <Accordion type="single" collapsible defaultValue={"item-1"} className={"row-start-2"}>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            <p className="text-lg">
                                pack-updater
                            </p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className={"nextButton"}>
                                upload
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="flex gap-4 items-center justify-center w-full"> {/*TODO -> make this piece of shit always w-full good fucking luck*/}
                            <p className="text-lg">
                                fabric-pvputils
                            </p> {/*TODO idk why tf next has header tags all the same size*/}
                            <p className={"font-[family-name:var(--font-geist-mono)]"}>
                                <UpdateData data={data[0]}></UpdateData>
                            </p>
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
                            <a
                                href="https://github.com/pvputils/fabricpvputils-oss"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="justify-end"
                            >
                                <Badge variant="secondary">github</Badge>
                            </a>
                        </AccordionTrigger> {/*TODO -> video embed*/}
                        {data.map((item, index) => (
                            <AccordionContent key={item.version} className={"flex flex-col gap-4"}>
                                <div className="flex gap-4">
                                    <p className={"font-[family-name:var(--font-geist-mono)]"}>
                                        {new Date(item.created_at).toLocaleDateString()} v{item.version} - {item.summary}
                                    </p>
                                    {index > 0 && (
                                        <>
                                            <UpdateData data={item}/>
                                        </>
                                    )}
                                </div>
                                <ol className="font-[family-name:var(--font-geist-mono)]">{/*TODO -> examples for each in accordions*/}
                                    {item.generic_patchnotes.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ol>
                                <div className={"flex w-full gap-2"}>{/*TODO -> idk why this needs w-full*/}
                                    <div className={"w-2/4 flex flex-col gap-2"}>
                                        <p>1.9 combat</p>
                                        <ol start={item.generic_patchnotes.length + 1}
                                            className={"font-[family-name:var(--font-geist-mono)]"}>
                                            {item["1.9_patchnotes"].map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ol>
                                    </div>
                                    <div className={"w-2/4 flex flex-col gap-2"}>
                                        <p>1.8 combat</p>
                                        <ol start={item.generic_patchnotes.length + 1}
                                            className={"font-[family-name:var(--font-geist-mono)]"}>
                                            {item["1.8_patchnotes"].map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                                {item.nullable_recommended_mods_info && (
                                    <ol>other recommended mods
                                        {item.nullable_recommended_mods_info.map((item) => (
                                            <li key={item.name}>{item.name}</li>
                                        ))}
                                    </ol>)}
                            </AccordionContent>
                        ))}
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
            {/*<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">*/}
            {/*</footer>*/}
        </div>
    );
}

function UpdateData({data}: { data: Database["public"]["Tables"]["fabricpvputils_updates"]["Row"] }) {
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
