import { AddToCartValidator } from "@/lib/apiValidators/addToCartValidator";
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
        const { productId, quantity } = AddToCartValidator.parse(body)

        const cartItem = await db.cart.findMany({
            where: {
                productId,
                userId
            }
        })

        if (cartItem.length === 0) {
            await db.cart.create({
                data: {
                    productId,
                    userId,
                    quantity
                }
            })

            return NextResponse.json({ ok: true }, { status: 200 })
        }

        await db.cart.updateMany({
            where: {
                userId,
                productId
            },
            data: {
                quantity: cartItem[0].quantity + quantity
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