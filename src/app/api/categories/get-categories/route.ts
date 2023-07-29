import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const categories = await db.category.findMany()
        return NextResponse.json({ categories }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'some error occured' }, { status: 500 })
    }

}