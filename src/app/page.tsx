import Page from "@/app/[connection]/page";

export default async function Home() {
    return <Page params={{ connection: "" }}/>
}