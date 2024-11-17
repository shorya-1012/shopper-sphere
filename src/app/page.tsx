import Carousel from "@/components/home-page-ui/Carousel";
import BestSellers from "@/components/home-page-ui/BestSellers";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import TopReviews from "@/components/home-page-ui/TopReviews";
import Footer from "@/components/home-page-ui/Footer";

const page = async () => {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <Carousel />
      <div className="w-full overflow-hidden flex flex-col items-center py-5 my-5">
        <div className="flex flex-col items-center justify-center mb-10 px-2">
          <h1 className="font-kanit text-2xl lg:text-3xl">Best Sellers</h1>
          <div className="w-[90%] h-[1px] bg-black mt-2 mb-2"></div>
          <p className="font-kanit text-gray-500 text-center text-sm">
            Top Picks, Trusted by Thousands – Your Bestsellers Await!
          </p>
        </div>
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <BestSellers />
        </Suspense>
        <Link href={"/products"}>
          <div className="bg-red-500 rounded-full py-2 px-5 mt-7 text-white font-nunito">
            See More
          </div>
        </Link>
      </div>
      <div className="w-full overflow-hidden flex flex-col items-center mb-5 mt-10">
        <div className="flex flex-col items-center justify-center px-2">
          <h1 className="font-kanit text-2xl lg:text-3xl">Top Reviews</h1>
          <div className="w-[90%] h-[1px] bg-black mt-2 mb-2"></div>
          <p className="font-kanit text-gray-500 text-center text-sm">
            Real Stories, Real Smiles – See What Our Happy Customers Have to
            Say!
          </p>
        </div>
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <TopReviews />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default page;
