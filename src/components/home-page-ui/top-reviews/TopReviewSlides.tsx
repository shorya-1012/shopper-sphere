'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { Prisma } from '@prisma/client'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type ReviewWithUser = Prisma.ReviewGetPayload<{
    include: {
        user: true,
        product: {
            include: {
                ProdcutImage: true;
            }
        }
    }
}>

type Props = {
    reviews: ReviewWithUser[]
}

const TopReviewSlides = ({ reviews }: Props) => {
    const stars = Array(5).fill(0)
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={3}
        >
            {
                reviews.map(review => {
                    return (
                        <SwiperSlide key={review.id}>
                            <div className='w-[305px] h-[310px] flex flex-col items-center gap-y-2 mx-auto text-center'>
                                <div className="flex text-lg my-1 ms-1 text-yellow-500">
                                    {
                                        stars.map((_, index) => {
                                            return (
                                                <div key={index}>
                                                    {review.rating >= index + 1 ? <BsStarFill /> : <BsStar />}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <h1 className='font-semibold font-heading'>{review.commentTitle}</h1>
                                <p className='text-gray-500'>{review.comment}</p>
                                <p className='font-review font-semibold text-gray-700'>
                                    -{review.user.username}
                                </p>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper >
    )
}

export default TopReviewSlides;