import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";

export default function Home() {
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
                        <AccordionContent>
                            <div className="flex gap-4 self-end">
                                <p className={"font-[family-name:var(--font-geist-mono)]"}>
                                    v0.9 - init
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
                                <li>
                                    remove 1.8&#39;s .5s missed hit penalty cooldown, unless server disallows it
                                </li>
                                <li>
                                    toggle movement keybinds (autorun), with 1.7 hcf-style
                                    toggle-sprint/toggle-sneak/server disallowable fly-boost. (autorun works in menus),
                                    and (toggle-sneak works in both inventories and menus) unless server disallows them
                                </li>
                                <li>
                                    customizable fake night vision-style fullbright
                                </li>
                                <li>
                                    customizable last attack reach indicator
                                </li>
                                <li>
                                    in-depth player nameplate color changer system
                                </li>
                                <li>
                                    customizable sweep hit warning sound effect
                                </li>
                                <li>
                                    customizable knockback/sweep/generic hit particles
                                </li>
                                <li>
                                    toggleable potion enchantment glint revert (1.8)
                                </li>
                            </ol>
                            <div className={"flex w-full gap-4"}>{/*TODO -> idk why this needs w-full*/}
                                <div className={"w-2/4"}>
                                    <p>1.9 combat</p>
                                    <ol start={9} className={"font-[family-name:var(--font-geist-mono)]"}>
                                        <li>
                                            customizable attack cooldown notification sound effect
                                        </li>
                                        <li>
                                            customizable attack cooldown warning sound effect
                                        </li>
                                        <li>
                                            customizable last attack cooldown indicator
                                        </li>
                                    </ol>
                                </div>
                                <div className={"w-2/4"}>
                                    <p>1.8 combat</p>
                                    <ol start={9} className={"font-[family-name:var(--font-geist-mono)]"}>
                                        <li>
                                            disable vanilla miss sound effect option
                                        </li>
                                        <li>
                                            disable vanilla attack-hand lowering animation option
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            </footer>
        </div>
    );
}
