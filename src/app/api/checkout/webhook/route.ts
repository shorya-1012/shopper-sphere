import { NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { db } from "@/lib/db";

export async function POST(req: Request) {

    const payload = await req.text()

    const signature = req.headers.get('stripe-signature') as string
    console.log('sig : ', signature)

    let event;

    const endpointSecret = process.env.STRIPE_WEBHOOOK_KEY as string

    try {
        console.log('constructing event...')
        event = stripe.webhooks.constructEvent(payload, signature, endpointSecret)

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'error' }, { status: 400 })
    }

    console.log('events :')
    console.log(event)

    if (event.type === 'charge.succeeded') {
        console.log(event.data.object.metadata)
        const { productIdArray, userId, productPriceArray } = event.data.object.metadata
        const productIds: string[] = JSON.parse(productIdArray)
        const productPrices: number[] = JSON.parse(productPriceArray)

        const orders = productIds.map((productId, i) => {
            return {
                userId,
                productId,
                amount: productPrices[i]
            }
        })

        try {
            await db.order.createMany({
                data: orders
            })

            await db.cart.deleteMany({
                where: {
                    userId
                }
            })
            return NextResponse.json({ ok: true }, { status: 200 })
        } catch (error) {
            console.log(error)
            return NextResponse.json({ error: error }, { status: 500 })
        }

    }

    return NextResponse.json({ ok: true }, { status: 200 })

}