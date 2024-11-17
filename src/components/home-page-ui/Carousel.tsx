"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

const Carousel = () => {
  const slideData = [
    {
      imageUrl:
        "https://t4.ftcdn.net/jpg/09/00/42/39/360_F_900423976_JPCn1macb1DGHyUwUOEcSRNov1fSR4a4.jpg",
      mainText: "Elevate Your Style.",
      subText: "See what's New",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FkZ2V0c3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      mainText: "Empowering Innovation.",
      subText: "Discover Cutting-Edge Electronics",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
      mainText: "Living Room Refresh.",
      subText: "Best deals on Home Decor",
    },
  ];

  const [currSlide, setCurrSlide] = useState(0);

  const scrollToFirst = () => {
    setCurrSlide(0);
    const slider = document.querySelector(".carousel");
    if (!slider) return;
    const width = slider.clientWidth;
    slider.scrollLeft -= width * (slideData.length - 1);
  };

  const scrollToLast = () => {
    setCurrSlide(slideData.length - 1);
    const slider = document.querySelector(".carousel");
    if (!slider) return;
    const width = slider.clientWidth;
    slider.scrollLeft += width * (slideData.length - 1);
  };

  const scrollToNext = () => {
    setCurrSlide((prev) => (prev += 1));
    const slider = document.querySelector(".carousel");
    if (!slider) return;
    const width = slider.clientWidth;
    slider.scrollLeft += width;
  };
  const scrollToPrev = () => {
    setCurrSlide((prev) => prev - 1);
    const slider = document.querySelector(".carousel");
    if (!slider) return;
    const width = slider.clientWidth;
    slider.scrollLeft -= width;
  };

  useEffect(() => {
    const handleSlideChange = () => {
      if (currSlide === slideData.length - 1) {
        scrollToFirst();
        return;
      }
      scrollToNext();
    };
    const slideInterval = setInterval(handleSlideChange, 8000);
    return () => clearInterval(slideInterval);
  }, [currSlide]);

  return (
    <div className="w-screen relative overflow-x-hidden z-10 my-2">
      <div className="carousel flex overflow-hidden scroll-smooth ">
        {slideData.map((data, index) => {
          return (
            <div
              key={index}
              className="sm:z-0 h-[50vh] lg:h-[calc(100vh-193px)]"
            >
              <div
                style={{ backgroundImage: `url(${data.imageUrl})` }}
                className="main-image w-screen h-full bg-cover bg-no-repeat bg-center shrink-0"
              >
                <div className="w-full h-full flex flex-col  justify-center items-center backdrop-brightness-50">
                  <span className="text-white text-4xl w-1/2 text-center font-kanit">
                    {data.mainText}
                  </span>
                  <span className="text-white mt-1 font-semibold md:text-xl">
                    {data.subText}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          if (currSlide === 0) {
            scrollToLast();
            return;
          }
          scrollToPrev();
        }}
        className="p-2 bg-gray-900/20 w-fit text-white rounded-[50%] absolute top-[50%] ms-2"
      >
        <ChevronLeft size={"24px"} />
      </button>
      <button
        onClick={() => {
          if (currSlide === slideData.length - 1) {
            scrollToFirst();
            return;
          }
          scrollToNext();
        }}
        className="p-2 bg-gray-900/20 w-fit text-white rounded-[50%] absolute top-[50%] right-0 mr-2"
      >
        <ChevronRight size={"24px"} />
      </button>
    </div>
  );
};

export default Carousel;
