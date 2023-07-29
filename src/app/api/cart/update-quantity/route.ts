import { db } from "@/lib/db";
import { UpdateQuantityValidator } from "@/lib/apiValidators/updateQuantityValidator";
import { z } from 'zod'
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const { userId } = auth()
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    try {
        const { productId, quantity } = UpdateQuantityValidator.parse(body)

        await db.cart.updateMany({
            where: {
                productId,
                userId
            },
            data: {
                quantity: quantity
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