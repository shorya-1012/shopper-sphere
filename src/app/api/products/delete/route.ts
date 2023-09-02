import { DeleteProductValidator } from "@/lib/apiValidators/deleteProductValidator";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(req: Request) {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

    const currentUser = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!currentUser || currentUser.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    try {

        const { productId } = DeleteProductValidator.parse(body)

        await db.product.delete({
            where: {
                id: productId
            }
        })

        return NextResponse.json({ message: 'deleted succesfully' }, { status: 200 })

    } catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error }, { status: 422 })
        }
        return NextResponse.json({ error: error }, { status: 500 })
    }
}