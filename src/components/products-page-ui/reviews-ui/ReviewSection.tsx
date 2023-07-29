import { db } from "@/lib/db"
import AddReview from "./AddReview"
import CustomerReviews from "./CustomerReviews"

type Props = {
    productId: string
}

const ReviewSection = async ({ productId }: Props) => {

    const reviews = await db.review.findMany({
        where: {
            productId
        },
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="w-screen mx-auto px-5">
            <div className="h-fit py-5 ms-2">
                <h2 className="text-3xl font-nunito mb-5">Customer Reviews</h2>
                <AddReview productId={productId} />
            </div>
            {
                reviews.map(review => {
                    return (
                        <div key={review.id} className="mb-2">
                            <CustomerReviews
                                userProfilePic={review.user.profileImageUrl}
                                userUsername={review.user.username}
                                review={review.comment}
                                reviewTitle={review.commentTitle}
                                createdAt={review.createdAt}
                                rating={review.rating}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ReviewSection