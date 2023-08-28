'use client'
import { ChevronLeft, ChevronRight } from "lucide-react"

import { useSwiper } from "swiper/react"

const TopReviewScrollButton = () => {

    const swiper = useSwiper()

    return (
        <div className="flex items-center gap-x-3 mt-1 mb-5">
            <button
                onClick={() => swiper.slidePrev()}
                className="w-max p-1 rounded-[50%] hover:bg-gray-700/20">
                <ChevronLeft size={'32px'} />
            </button>
            <button
                onClick={() => swiper.slideNext()}
                className="w-max p-1 rounded-[50%] hover:bg-gray-700/20">
                <ChevronRight size={'32px'} />
            </button>
        </div>
    )
}

export default TopReviewScrollButton