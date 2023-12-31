import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export async function POST(req: Request) {
    const body = await req.json()
    const { userId } = auth()

    const { cartItems, productIds, productPrices } = body
    const productIdArray = JSON.stringify(productIds)
    const productPriceArray = JSON.stringify(productPrices)

    try {
        // Create Checkout Sessions from body params.
        const origin = req.headers.get('origin')
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cartItems,
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['IN']
            },
            success_url: `${origin}/success`,
            cancel_url: `${origin}/cart`,
            payment_intent_data: {
                metadata: {
                    userId,
                    productIdArray,
                    productPriceArray
                }
            }
        });
        // return NextResponse.redirect(session.url)
        return NextResponse.json({ id: session.id }, { status: 200 })
    } catch (err) {
        console.log('error :')
        console.log(err)
        return NextResponse.json({ error: err }, { status: 500 })
    }
} 