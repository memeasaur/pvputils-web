import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";
import {createClient} from '@supabase/supabase-js'
import {Database} from "@/app/supabase";

export default async function Home() {
    const {data, error} = await createClient<Database>('https://xapkbnegosbyhmondqti.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcGtibmVnb3NieWhtb25kcXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTgxNTMsImV4cCI6MjA2NDM3NDE1M30.qevIYqIPh3BhiGHj_gppbggv-42RQedaF8Zd-aI5fZA')
        .from('fabricpvputils_updates')
        .select('*')
    if (error)
        throw new Error(error.message)

    return (
        <div
            className="grid items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="grid grid-rows-[30%_1fr] gap-[16px] items-center sm:items-start">
                {/*<Image*/}
                {/*  className="dark:invert"*/}
                {/*  src="/next.svg"*/}
                {/*  alt="Next.js logo"*/}
                {/*  width={180}*/}
                {/*  height={38}*/}
                {/*  priority*/}
                {/*/>*/}
                <Accordion type="single" collapsible defaultValue={"item-1"} className={"row-start-2"}>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className="flex gap-4 self-end justify-center">
                                <p className="text-lg self-center">
                                    fabric-pvputils
                                </p> {/*TODO idk why tf next has header tags all the same size*/}
                                <p className={"self-center font-[family-name:var(--font-geist-mono)]"}>
                                    - (1.21.4) depends: fabric api
                                </p>
                                <a
                                    className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
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
                        </AccordionTrigger>
                        {data.map((item) => (
                            <AccordionContent key={item.version}>
                                <div className="flex gap-4 self-end">
                                    <p className={"font-[family-name:var(--font-geist-mono)]"}>
                                        v{item.version} - {item.summary}
                                    </p>
                                    <a
                                        href="https://github.com/pvputils/fabricpvputils-oss"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Badge variant="secondary">source (github)</Badge>
                                    </a>
                                </div>
                                <ol className="font-[family-name:var(--font-geist-mono)]">{/*TODO -> examples for each in accordions*/}
                                    {item.generic_patchnotes.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ol>
                                <div className={"flex w-full gap-4"}>{/*TODO -> idk why this needs w-full*/}
                                    <div className={"w-2/4"}>
                                        <p>1.9 combat</p>
                                        <ol start={9} className={"font-[family-name:var(--font-geist-mono)]"}>
                                            {item["1.9_patchnotes"].map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ol>
                                    </div>
                                    <div className={"w-2/4"}>
                                        <p>1.8 combat</p>
                                        <ol start={9} className={"font-[family-name:var(--font-geist-mono)]"}>
                                            {item["1.8_patchnotes"].map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                                {item.recommended_mods_info && (
                                    <ol>other recommended mods
                                        {item.recommended_mods_info.map((item) => (
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
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            </footer>
        </div>
    );
}
