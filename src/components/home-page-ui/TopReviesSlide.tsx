'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { BsStar, BsStarFill } from 'react-icons/bs'

import 'swiper/css'
import { Prisma } from '@prisma/client'
import TopReviewScrollButton from './TopReviewScrollButton'

type ReviewWithUser = Prisma.ReviewGetPayload<{
    include: {
        user: true
    }
}>

type Props = {
    reviews: ReviewWithUser[]
}

const TopReviesSlide = ({ reviews }: Props) => {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
                1024: { slidesPerView: 3 }
            }}
            className='w-full sm:w-[80%] !flex flex-col items-center justify-center mt-5'
        >
            {
                reviews.map(review => {
                    const stars = Array(5).fill(0);
                    return (
                        <SwiperSlide>
                            <div className='w-[305px] h-[310px] flex flex-col items-center text-center mx-auto lg:mx-0'>
                                <div className="flex text-lg my-1 ms-1 text-yellow-500">
                                    {
                                        stars.map((_, index) => {
                                            return (
                                                <div>
                                                    {review.rating >= index + 1 ? <BsStarFill /> : <BsStar />}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <h1 className='font-semibold font-heading'>{review.commentTitle}</h1>
                                <p className='font-review text-gray-600'>{review.comment}</p>
                                <p className='text-gray-700 font-semibold font-review'>
                                    - {review.user.username}
                                </p>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
            <TopReviewScrollButton />
        </Swiper>
    )
}

export default TopReviesSlide