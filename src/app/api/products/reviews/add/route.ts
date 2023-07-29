import { AddReviewValidator } from "@/lib/apiValidators/addReviewValidator";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from 'zod'

export async function POST(req: Request) {
    const { userId } = auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    try {

        const { productId, rating, comment, commentTitle } = AddReviewValidator.parse(body)

        await db.review.create({
            data: {
                userId,
                productId,
                rating,
                commentTitle,
                comment
            }
        })

        return NextResponse.json({ ok: true }, { status: 200 })

    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error }, { status: 422 })
        }
        return NextResponse.json({ error: error }, { status: 500 })
    }
}