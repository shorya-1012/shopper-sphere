import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    console.log('endpoint hit')
    const user = await req.json()

    try {

        const { id, first_name, last_name, image_url, email_addresses } = user.data

        if (user.type === 'user.created') {
            const newUser = await db.user.create({
                data: {
                    id: id,
                    username: first_name + ' ' + last_name,
                    profileImageUrl: image_url,
                    email: email_addresses[0].email_address
                }
            })

            console.log('New User :')
            console.log(newUser)
        }
        else if (user.type = 'user.deleted') {
            console.log('deleting user')
            await db.user.delete({
                where: {
                    id: id
                }
            })

            console.log('user deleted')
        }

        return NextResponse.json({ ok: true }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}