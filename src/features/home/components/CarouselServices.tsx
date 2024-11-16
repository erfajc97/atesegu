import React, { useState } from "react";
import { imgsSlide1, imgsSlide2, imgsSlide3 } from "../data.ts";

const slides = [
  imgsSlide1.dataImage,
  imgsSlide2.dataImage,
  imgsSlide3.dataImage,
];

const CarouselServices = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // console.log(imgsSlide1.titleBanner);
  return (
    <div className="carousel w-full lg:mt-10 mt-5">
      <div className="carousel-item relative w-full">
        <div className="w-full relative">
          <img
            src={
              currentSlide === 0
                ? imgsSlide1.banner
                : currentSlide === 1
                ? imgsSlide2.banner
                : imgsSlide3.banner
            }
            className="w-full lg:h-[350px] h-[150px]"
            alt="Banner Seguros Individuales"
          />
          <div className="absolute lg:top-16 top-[2%] flex flex-row-reverse lg:flex-row items-center gap-x-4 lg:left-[10%] left-[5%] px-5">
            <img
              src="/img-png/logofamily.png"
              alt="logo"
              className="lg:w-[150px] lg:h-[150px] w-[80px] h-[80px]"
            />
            <div>
              <h3 className="lg:text-5xl text-2xl font-bold text-white">
                {currentSlide === 0
                  ? imgsSlide1.titleBanner
                  : currentSlide === 1
                  ? imgsSlide2.titleBanner
                  : imgsSlide3.titleBanner}
              </h3>
              <p className="lg:text-[28px] text-[12px] text-white mt-2 lg:mt-4">
                {currentSlide === 0
                  ? imgsSlide1.descriptionBanner
                  : currentSlide === 1
                  ? imgsSlide2.descriptionBanner
                  : imgsSlide3.descriptionBanner}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            {slides[currentSlide]?.map((img, index) => (
              <div key={index} className="w-full relative">
                <img
                  src={img.img}
                  className="w-full lg:h-[300px] h-[150px]"
                  alt={`Slide ${index + 1}`}
                />
                <div className="absolute top-0  h-full w-full flex items-center justify-center">
                  <p className="text-white lg:text-3xl text-[17px] font-bold text-center">
                    {img.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button onClick={handlePrevSlide} className="btn btn-circle">
            ❮
          </button>
          <button onClick={handleNextSlide} className="btn btn-circle">
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselServices;
