import CartItemCard from "@/components/cart-ui/CartItemCard"
import ProceedToCheckOutButton from "@/components/cart-ui/ProceedToCheckOutButton"
import { db } from "@/lib/db"
import { auth, clerkClient } from "@clerk/nextjs"
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

    let subtotal = 0
    cartItems.flatMap(cartItem => {
        subtotal += cartItem.quantity * parseInt(cartItem.product.price.toString())
        return 0
    })

    if (cartItems.length === 0) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <h1 className="font-heading text-2xl">Your Cart is Empty</h1>
            </div>
        )
    }

    return (
        <div className="w-screen py-5 flex flex-col items-start gap-3 overflow-x-hidden">
            <div className="w-screen h-[100px] flex justify-center items-center text-2xl mb-5 ">
                <div data-aos="fade-down" className="flex flex-col items-center p-4 shadow-xl rounded-2xl my-5">
                    <div className="flex justify-between w-[300px] md:w-[550px] p-5 ">
                        <span className="font-review">SubTotal :</span>
                        <span className="font-review">₹{subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    </div>
                    <ProceedToCheckOutButton
                        cartItems={cartItmesForCheckOut}
                        productIds={productIds}
                    />
                </div>
            </div>
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
    )
}

export default page