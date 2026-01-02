import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";
import React from "react";
import PackUpdater from "@/components/packupdater/packUpdater";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {MOD_DATA, UPDATER_DATA} from "../../../data";

export const revalidate = 302400 // supabase inactivity timeout
export default async function Page({ params }: { params: {connection: string} }) {
    const modData0 = MOD_DATA[0]
    fetch('https://api.modrinth.com/v2/project/fabric-pvp-utils', { // TODO
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${process.env.MODRINTH_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: modData0.markdown }),
    })
    const updaterData0 = UPDATER_DATA[0]

    const connection = (await params).connection // ?
    return (
        <div style={{
            backgroundImage: "url('/vignette.png')",
            backgroundSize: 'cover',
            mixBlendMode: 'multiply'
        }}>
            <main
                style={{
                    backgroundImage: Math.random() < .5
                        ? "url('/fire_layer_0.png')"
                        : "url('/fire_layer_1.png')",
                    backgroundSize: "100% 3200%", // TODO -> fade in as it loads?
                    // height: "100vh",
                    // backgroundPosition: "center bottom",
                    backgroundAttachment: "fixed",
                    imageRendering: "pixelated",
                    animation: "play 3.2s steps(32) infinite"
                    }}
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
                            version={updaterData0.version}
                            summary={updaterData0.summary}
                            updateData={
                                <>
                                    accepts (1.7.10).zip, returns (1.21.4).zip
                                </>}
                            modrinthButton={null}
                        />
                        <AccordionContent className={"flex flex-col gap-4"}>
                            <PackUpdater></PackUpdater>{/*TODO -> allow non-compressed files (?)*/}
                            <OverviewAccordionContent
                                created_at={updaterData0.created_at}
                                generic_patchnotes={updaterData0.generic_patchnotes}
                                extra_patchnotes={null}
                            />
                            <br/>
                            <div className={"flex flex-col items-center self-start"}>
                                my 1.7 pack archive
                                <div className={"flex"}>
                                    <a className={"nextButton"} href={"https://app.mediafire.com/folder/3p9q3lunpfgh7/packarchive"}>
                                        individual
                                    </a>
                                    <a className={"nextButton"} href={"https://www.mediafire.com/file/sw1sg26wvjj4vms/packarchive.zip/file"}>
                                        bulk
                                    </a>
                                </div>
                                <iframe className={"w-[25vw] aspect-video"}
                                        src={`https://www.youtube.com/embed/UQZeqrTQDbU?autoplay=1&mute=1&loop=1`}
                                        allow="autoplay"
                                        allowFullScreen/>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-1" className={"w-full"}>
                        <ChangelogAccordionTrigger
                            title={"fabric-pvputils"}
                            version={modData0.version}
                            summary={modData0.summary}
                            updateData={<>
                                ({modData0.minecraft_versions}) {modData0.nullable_dependencies && (
                                <>
                                    depends: {modData0.nullable_dependencies.map((item, index) => (
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
                                {modData0.markdown}
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
                <a // TODO -> make this piece of fucking shit hug the top GL
                    href="https://github.com/memeasaur/pvputils-web"
                    target="_blank"
                    className={"row-start-3 justify-self-end"}
                >
                    <Badge variant="secondary">github</Badge>
                </a>
            </main>
        </div>
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