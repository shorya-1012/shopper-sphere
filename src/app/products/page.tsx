import { db } from "@/lib/db"
import Link from "next/link"
import ProductCard from "@/components/general-ui/ProductCard"
import PaginationButtons from "@/components/general-ui/PaginationButtons"

const page = async ({ searchParams }:
    { searchParams: { [key: string]: string | undefined } }
) => {

    console.log(searchParams)

    let queryPageParams = searchParams.pageParams || '1'
    if (queryPageParams === '0') {
        queryPageParams = '1'
    }
    const pageParams = parseInt(queryPageParams)

    const querySearchParams = searchParams.key || ''

    const productsOnOnePage = 2

    const totalProducts = await db.product.count({
        where: {
            name: {
                contains: querySearchParams
            }
        }
    })

    const products = await db.product.findMany({
        where: {
            name: {
                contains: querySearchParams
            }
        },
        skip: (pageParams - 1) * productsOnOnePage,
        take: productsOnOnePage,
        include: {
            ProdcutImage: true
        }
    })

    if (products.length === 0) {
        return (
            <div className="w-screen h-screen flex justify-center items-center font-heading">
                <h1 className="text-xl">No Products Found</h1>
            </div>
        )
    }

    const isnextavaiable = pageParams * productsOnOnePage >= totalProducts
    const isPrevAvailable = pageParams > 1

    return (
        <div className="w-full overflow-x-hidden flex flex-col items-center py-5 mt-3">
            {
                querySearchParams &&
                <h1 className="font-nunito place-self-start ms-5 font-semibold mb-5">Showing results for '{querySearchParams}'</h1>
            }
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
            <PaginationButtons
                pageParams={pageParams}
                isNextAvailable={isnextavaiable}
                isPrevAvailable={isPrevAvailable}
                searchParams={querySearchParams}
            />
        </div>
    )
}

export default page