import z from 'zod'
import { editOrderStatusValidator } from '@/lib/apiValidators/editOrderStatusValidator';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    const { userId } = auth()

    if (!userId) return NextResponse.json({ ok: false }, { status: 401 })

    const currentUser = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!currentUser || currentUser.role !== 'ADMIN') return NextResponse.json({ ok: false }, { status: 401 })

    const body = await req.json()

    try {
        const { id, status } = editOrderStatusValidator.parse(body)

        const updatedOrder = await db.order.update({
            where: {
                id
            },
            data: {
                status: status
            }
        })

        return NextResponse.json({ ok: true }, { status: 200 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error }, { status: 422 })
        }
        return NextResponse.json({ error: error }, { status: 500 })
    }
}