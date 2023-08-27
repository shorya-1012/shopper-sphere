import { db } from "@/lib/db"
import TopReviewSlides from "./TopReviewSlides"

const TopReviews = async () => {

    const reviews = await db.review.findMany({
        where: {
            rating: {
                gte: 4
            }
        },
        include: {
            user: true,
            product: {
                include: {
                    ProdcutImage: true
                }
            }
        }
    })

    return (
        <div className="w-screen flex flex-col items-center justify-center my-10">
            <TopReviewSlides
                reviews={reviews}
            />
        </div>
    )
}

export default TopReviews