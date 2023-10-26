import z from 'zod'
import { editUserStatusValidator } from '@/lib/apiValidators/editUserRoleValidator';
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
        const { id, status } = editUserStatusValidator.parse(body)

        const userDetails = await db.user.findUnique({
            where: {
                id
            }
        })

        if (!userDetails) {
            return NextResponse.json({ error: "User does not exits" }, { status: 404 })
        }

        const updatedUser = await db.user.update({
            where: {
                id
            },
            data: {
                role: userDetails?.role === 'ADMIN' ? "USER" : "ADMIN"
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