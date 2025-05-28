export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/*<Image*/}
        {/*  className="dark:invert"*/}
        {/*  src="/next.svg"*/}
        {/*  alt="Next.js logo"*/}
        {/*  width={180}*/}
        {/*  height={38}*/}
        {/*  priority*/}
        {/*/>*/}
        <p>fabric-pvputils-oss 1.21.4</p> {/*TODO idk why tf next has header tags all the same size*/}
        <ol className="font-[family-name:var(--font-geist-mono)]">
          <li>
            removes miss penalty hit delay introduced in 1.8
            {/*Get started by editing{" "}*/}
            {/*<code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">*/}
            {/*  src/app/page.tsx*/}
            {/*</code>*/}
            {/*.*/}
          </li>
          <li>
            toggle movement keybinds (autorun). also, 1.7 hcf-style toggle-sprint/toggle-sneak/fly-boost
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
            customizable knockback/sweep/default hit particles
          </li>
          <li>
            toggleable potion enchantment glint revert (1.8)
          </li>
        </ol>
        <div className={"flex w-full"}>{/*TODO -> idk why this needs w-full*/}
          <div className={"w-2/4"}>
            <p>1.9 combat</p>
            <ol className={"font-[family-name:var(--font-geist-mono)]"}>
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
            <ol className={"font-[family-name:var(--font-geist-mono)]"}>
              <li>
                disable vanilla miss sound effect option
              </li>
              <li>
                disable vanilla attack-hand lowering animation option
              </li>
            </ol>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
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
            {/*/>TODO*/}
            modrinth
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
