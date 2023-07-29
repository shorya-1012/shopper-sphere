import { db } from "@/lib/db";
import { RemoveCartItemValidator } from "@/lib/apiValidators/removeCartItemValidator";
import { z } from 'zod'
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const { userId } = auth()
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    try {
        const { productId } = RemoveCartItemValidator.parse(body)

        await db.cart.deleteMany({
            where: {
                productId,
                userId
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