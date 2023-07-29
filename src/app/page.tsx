import ProductCard from "@/components/general-ui/ProductCard"
import Carousel from "@/components/home-page-ui/Carousel"
import { db } from "@/lib/db"
import Link from "next/link"

const page = async () => {

  const products = await db.product.findMany({
    include: {
      ProdcutImage: true
    }
  })

  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <Carousel />
      <div className="w-full overflow-x-hidden flex flex-col items-center py-5 mt-3">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
          {
            products.map((product, i) => {
              return (
                <Link href={`/products/${product.id}`}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    images={product.ProdcutImage}
                    inDuration={300 + (i * 200)}
                  />
                </Link>
              )
            })
          }
        </div>
        <div
          className="bg-red-500 rounded-full py-2 px-5 mt-7 text-white font-nunito">
          See More
        </div>
      </div>
    </div>
  )
}

export default page