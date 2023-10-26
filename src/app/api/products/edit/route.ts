import z from 'zod'
import { editProductValidator } from "@/lib/apiValidators/editProductValidator";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import isAdmin from '@/lib/authHelpers';

export async function PATCH(req: Request) {
    const { userId } = auth()
    const isauthorized = await isAdmin(userId)
    if (!isauthorized) {
        return NextResponse.json({ ok: false }, { status: 401 })
    }

    const body = await req.json()

    try {

        const { id, name, price, category, description } = editProductValidator.parse(body)

        const existingProduct = await db.product.findMany({
            where: {
                id
            }
        })

        if (!existingProduct) return NextResponse.json({ error: 'Product Not found' }, { status: 404 })

        const updatedProduct = await db.product.update({
            where: {
                id
            },
            data: {
                name,
                price,
                categoryName: category,
                description: description
            }
        })

        return NextResponse.json({ message: 'Updated' }, { status: 200 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error }, { status: 422 })
        }
        return NextResponse.json({ error: error }, { status: 500 })
    }
}