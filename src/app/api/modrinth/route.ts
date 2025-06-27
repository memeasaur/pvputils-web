import { NextRequest, NextResponse } from 'next/server';
import TurndownService from 'turndown';
import {renderDescription} from "@/lib/serverOnly";

export const runtime = 'nodejs'
export async function POST(request: NextRequest) {
    try { // TODO reactDomServer is a piece of shit for making me spin up a function to do this + this b
        fetch('https://api.modrinth.com/v2/project/fabric-pvp-utils', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${process.env.MODRINTH_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: new TurndownService().turndown(await renderDescription(await request.json())) }),
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
    }
}