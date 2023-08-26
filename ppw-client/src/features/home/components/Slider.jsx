// src/Slider.js
import React, { useState } from 'react';
import img1 from '../../../assets/form_bg_props.webp';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const slidesData = [{ id: 1, image: img1 }];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-[90%] max-w-[400px]   mx-auto px-8 my-8">
      {slidesData.length > 1 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white  text-gray-800 p-1 rounded-full z-10"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      )}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 linear transform"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slidesData.map((slide) => (
            <div
              key={slide.id}
              className="flex-none w-full   h-[375px] rounded-md p-2  bg-gray-100"
            >
              <img
                src="https://images.edexlive.com/uploads/user/imagelibrary/2020/9/9/original/15088382431447149306MDSUNEW.jpg?w=400&dpr=2.6"
                alt={`Slide ${slide.id}`}
                className="w-full aspect-video rounded-md  "
              />
              <div className="my-2">
                <h2 className="text-[1.18rem] font-semibold">
                  Maharshi Dayananda Saraswati University
                </h2>
                <p className="text-sm my-1">
                  Maharshi Dayanand Saraswati University Ajmer is a prominent
                  affiliating university in the state of Rajasthan. Established
                  on August 1, 1987....
                </p>
                <button className="hero-btn">Select</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {slidesData.length > 1 && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white  text-gray-800 p-2 rounded-full z-10"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Slider;
