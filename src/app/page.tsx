import Carousel from "@/components/home-page-ui/Carousel"
import BestSellers from "@/components/home-page-ui/BestSellers"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import TopReviews from "@/components/home-page-ui/top-reviews/TopReviews"

const page = async () => {

  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <Carousel />
      <div className="w-full overflow-x-hidden flex flex-col items-center py-5 mt-3">
        <h1 className="font-heading text-xl mb-5">Best Sellers</h1>
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <BestSellers />
        </Suspense>
        <Link href={'/products'}>
          <div
            className="bg-red-500 rounded-full py-2 px-5 mt-7 text-white font-nunito">
            See More
          </div>
        </Link>
        <TopReviews />
      </div>
    </div>
  )
}

export default page