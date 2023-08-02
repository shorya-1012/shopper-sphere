import { db } from "@/lib/db"
import Link from "next/link"
import ProductCard from "../general-ui/ProductCard"

const BestSellers = async () => {

    const products = await db.product.findMany({
        orderBy: {
            Orders: {
                '_count': 'desc'
            }
        },
        include: {
            ProdcutImage: true
        },
        take: 4
    })
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
            {
                products.map((product, i) => {
                    return (
                        <Link href={`/products/${product.id}`}>
                            <ProductCard
                                id={product.id}
                                name={product.name}
                                price={product.price.toString()}
                                description={product.description}
                                images={product.ProdcutImage}
                                inDuration={300 + (i * 200)}
                            />
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default BestSellers