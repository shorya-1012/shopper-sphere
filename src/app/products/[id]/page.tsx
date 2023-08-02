import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { Truck, ShieldCheck, Loader2 } from "lucide-react"
import ProductImageContainer from "@/components/products-page-ui/ProductImageContainer"
import AddToCartButton from "@/components/products-page-ui/AddToCartButton"
import ReviewSection from "@/components/products-page-ui/reviews-ui/ReviewSection"
import AverageRating from "@/components/general-ui/AverageRating"
import { Suspense } from "react"

const page = async ({ params }: { params: { id: string } }) => {

    try {
        const product = await db.product.findUnique({
            where: {
                id: params.id
            },
            include: {
                ProdcutImage: true
            }
        })

        if (!product) notFound()

        return (
            <div className="flex flex-col items-center">
                <div className="w-screen flex flex-col md:flex-row items-center px-5 md:items-start md:justify-around py-5 my-3 font-nunito">
                    <ProductImageContainer images={product.ProdcutImage} />
                    <div data-aos="fade-up" className="w-screen md:w-[60vw] flex flex-col gap-3 px-5">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading">
                            {product.name}
                        </h1>
                        <AverageRating productId={product.id} style="text-xl" />
                        <h2 className="text-lg md:text-2xl my-2">
                            ₹ {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </h2>
                        <AddToCartButton productId={product.id} />
                        <p className=" text-gray-500 my-2">{product.description}</p>
                        <div className="flex flex-col mt-2 items-start font-kanit gap-2">
                            <div className="flex gap-2 items-center text-lg">
                                <Truck size={'20px'} />
                                <span>Fast Shipping</span>
                            </div>
                            <div className="flex gap-2 items-center text-lg">
                                <ShieldCheck size={'20px'} />
                                <span>Secure Payments</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Customer Reviews */}
                <Suspense
                    fallback={
                        <Loader2 className="animate-spin" />
                    }
                >
                    <ReviewSection productId={product.id} />
                </Suspense>
            </div>
        )
    } catch (error) {
        notFound()
    }
}

export default page