"use client";

import { useEffect, useRef, useState } from "react";
import { Prisma } from "@prisma/client";
import { BsStar, BsStarFill } from "react-icons/bs";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";

type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: {
    user: true;
  };
}>;

type Props = {
  reviews: ReviewWithUser[];
};

const TestReviewSlide = ({ reviews }: Props) => {
  const [currSlide, setCurrSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Scroll to a specific slide
  const scrollToSlide = (slideIndex: number) => {
    if (!carouselRef.current) return;

    const slider = carouselRef.current;
    const width = slider.clientWidth;
    slider.scrollTo({ left: width * slideIndex, behavior: "smooth" });
    setCurrSlide(slideIndex);
  };

  // Button Handlers
  const handlePrev = () => {
    const prevSlide = currSlide === 0 ? reviews.length - 1 : currSlide - 1;
    scrollToSlide(prevSlide);
  };

  const handleNext = () => {
    const nextSlide = currSlide === reviews.length - 1 ? 0 : currSlide + 1;
    scrollToSlide(nextSlide);
  };

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      const nextSlide = currSlide === reviews.length - 1 ? 0 : currSlide + 1;
      scrollToSlide(nextSlide);
    }, 8000);

    return () => clearInterval(slideInterval);
  }, [currSlide, reviews.length]);

  return (
    <div className="w-screen relative overflow-hidden z-10 my-2">
      <div
        ref={carouselRef}
        className="carousel flex overflow-hidden scroll-smooth w-screen items-start"
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className="w-screen flex-shrink-0 flex items-center justify-center"
          >
            <div className="w-[90%] md:w-[70%] flex items-center justify-center rounded-xl shadow-2xl p-5">
              <div className="flex items-start font-review mx-1 sm:mx-3 my-10 ">
                <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden">
                  <Avatar>
                    <AvatarImage src={review.user.profileImageUrl} />
                  </Avatar>
                </div>
                <div className="flex flex-col items-start ms-2">
                  <div className="flex gap-x-4 items-center ms-2">
                    <p className="text-lg font-review font-medium">
                      {review.user.username}
                    </p>
                  </div>
                  <div className="flex text-lg my-1 ms-1 text-yellow-500">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => {
                        return (
                          <div>
                            {review.rating >= index + 1 ? (
                              <BsStarFill />
                            ) : (
                              <BsStar />
                            )}
                          </div>
                        );
                      })}
                  </div>
                  <div className="mt-2 ms-1 w-[60vw] flex flex-col items-start">
                    <h3 className="text-xl text-gray-800 ">
                      {review.commentTitle}
                    </h3>
                    <p className="text-lg text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestReviewSlide;
