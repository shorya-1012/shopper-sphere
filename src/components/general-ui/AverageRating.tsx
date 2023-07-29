import { db } from "@/lib/db"
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs"

type Props = {
    productId: string,
    style: string
}

const AverageRating = async ({ productId, style }: Props) => {

    const averageRating = await db.review.aggregate({
        _avg: {
            rating: true
        },
        where: {
            productId
        }
    })

    const ratingCount = await db.review.count({
        where: {
            productId
        }
    })

    const rating = averageRating._avg.rating || 0
    const stars = Array(5).fill(0)

    return (
        <div className={`${style} flex items-center text-yellow-500`}>
            {
                stars.map((_, index) => {
                    return (
                        <div>
                            {rating >= index + 1 ? <BsStarFill /> :
                                rating >= index + 0.5 ? <BsStarHalf /> : <BsStar />
                            }
                        </div>
                    )
                })
            }
            <p className="mx-2 text-base text-gray-500">({ratingCount})</p>
        </div>
    )
}

export default AverageRating