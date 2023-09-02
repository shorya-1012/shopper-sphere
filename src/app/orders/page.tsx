import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const page = async () => {

  const { userId } = auth()
  if (!userId) redirect('/sign-in')

  const orders = await db.order.findMany({
    where: {
      userId
    },
    include: {
      product: {
        include: {
          ProdcutImage: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (orders.length === 0) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center pb-10 gap-3">
        <h1 className=" font-heading text-lg">You haven't ordered anything yet</h1>
        <Link href={'/'}>
          <div className="h-[40px] w-[250px] rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm flex gap-3 justify-center items-center">
            Continue Shopping
            <ArrowRight size={'15px'} />
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-start sm:px-5 py-5">
      <h1 className="font-heading ms-3 mb-5">Your Orders</h1>
      {
        orders.map(order => {
          return (
            <div
              className="w-full mx-3 sm:mx-5 sm:w-[600px] flex gap-3 items-center sm:items-start shrink-0 my-2 py-5 px-5 border-y-[1px] border-gray-300">
              <div className="relative h-[140px] w-[140px] sm:h-[190px] sm:w-[190px] overflow-hidden rounded-xl bg-zinc-200 shrink-0">
                <Image
                  src={order.product.ProdcutImage[0].imageURL}
                  alt="product-image"
                  fill={true}
                  sizes="100%"
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="flex flex-col items-start sm:ms-3">
                <Link href={`/products/${order.productId}`}>
                  <span className="font-kanit sm:text-xl">{order.product.name}</span>
                </Link>
                <span className="sm:text-lg">₹{order.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                <div className="flex items-center gap-3 font-review mt-3">
                  <h3 className="text-gray-500">Status:</h3>
                  <span className="text-gray-800">{order.status}</span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default page