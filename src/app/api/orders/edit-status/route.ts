import z from 'zod'
import { editOrderStatusValidator } from '@/lib/apiValidators/editOrderStatusValidator';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import isAdmin from '@/lib/authHelpers';

export async function PATCH(req: Request) {
    const { userId } = auth()
    const isauthorized = await isAdmin(userId)
    if (!isauthorized) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

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