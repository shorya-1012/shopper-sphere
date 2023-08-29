import CartItemCard from "@/components/cart-ui/CartItemCard"
import ProceedToCheckOutButton from "@/components/cart-ui/ProceedToCheckOutButton"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const page = async () => {

    const { userId } = auth()
    if (!userId) redirect('/sign-in')

    const cartItems = await db.cart.findMany({
        where: {
            userId
        },
        include: {
            product: {
                include: {
                    ProdcutImage: true
                }
            }
        }
    })

    const cartItmesForCheckOut = cartItems.map(item => {
        return {
            quantity: item.quantity,
            price_data: {
                currency: "inr",
                unit_amount: parseInt(item.product.price.toString()) * 100,
                product_data: {
                    name: item.product.name,
                    images: [item.product.ProdcutImage[0].imageURL]
                }
            }
        }
    })

    const productIds = cartItems.flatMap(item => item.productId)
    const productPrices = cartItems.flatMap(item => parseInt(item.product.price.toString()) * item.quantity)

    let subtotal = 0
    cartItems.flatMap(cartItem => {
        subtotal += cartItem.quantity * parseInt(cartItem.product.price.toString())
        return 0
    })

    if (cartItems.length === 0) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <h1 className="font-heading text-2x*l">Your Cart is Empty</h1>
            </div>
        )
    }

    return (
        <div className="w-screen py-5 flex flex-col lg:flex-row md:justify-between gap-3 overflow-x-hidden">
            <div className="h-[100px] lg:order-2 flex justify-center items-center text-2xl my-5 lg:my-0 lg:mr-5">
                <div className="flex flex-col items-center p-4 shadow-xl rounded-2xl my-5">
                    <div className="flex justify-between w-[300px] md:w-[450px] p-5 ">
                        <span className="font-review">SubTotal :</span>
                        <span className="font-review">₹{subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </div>
                    <ProceedToCheckOutButton
                        cartItems={cartItmesForCheckOut}
                        productIds={productIds}
                        productPrices={productPrices}
                    />
                </div>
            </div>
            <div className="lg:order-1 flex flex-col overflow-x-hidden lg:ms-3">
                {
                    cartItems.map(cartItem => {
                        return (
                            <CartItemCard
                                key={cartItem.id}
                                quantity={cartItem.quantity}
                                productId={cartItem.product.id}
                                productName={cartItem.product.name}
                                price={cartItem.product.price.toString()}
                                productImage={cartItem.product.ProdcutImage[0].imageURL}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default page