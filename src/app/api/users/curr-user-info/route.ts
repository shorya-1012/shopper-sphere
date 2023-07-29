import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    const { userId } = auth()
    if (!userId) {
        return NextResponse.json({ ok: false }, { status: 404 })
    }

    try {
        const userInfo = await db.user.findUnique({
            where: {
                id: userId
            },
        })

        return NextResponse.json({ userInfo }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'some error occured' }, { status: 500 })
    }
}