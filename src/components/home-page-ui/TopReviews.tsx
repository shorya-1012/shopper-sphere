import { db } from "@/lib/db";
import TopReviesSlide from "./TopReviesSlide";

const TopReviews = async () => {
  const reviews = await db.review.findMany({
    where: {
      rating: {
        gte: 4,
      },
    },
    include: {
      user: true,
    },
    take: 10,
  });

  return (
    <div
      data-aos="fade-up"
      className="w-screen flex flex-col justify-center items-center my-10"
    >
      <TopReviesSlide reviews={reviews} />
    </div>
  );
};

export default TopReviews;
