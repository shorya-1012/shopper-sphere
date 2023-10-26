import { AddProductApiValidator } from "@/lib/apiValidators/addProductValidator"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import z from 'zod'
import isAdmin from "@/lib/authHelpers"

export async function POST(req: Request) {

    const { userId } = auth()
    const isauthorized = await isAdmin(userId)
    if (!isauthorized) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    try {
        const { name, price, description, images, category } = AddProductApiValidator.parse(body)

        const product = await db.product.create({
            data: {
                name,
                price,
                description,
                categoryName: category
            }
        })

        const imagesArray = images.map(async (image) => {
            return (
                await db.prodcutImage.create({
                    data: {
                        imageURL: image.imageURL,
                        productId: product.id
                    }
                })
            )
        })

        return NextResponse.json({ ok: true }, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error }, { status: 422 })
        }
        return NextResponse.json({ error: error }, { status: 500 })
    }
}