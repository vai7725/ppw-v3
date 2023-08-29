// src/Slider.js
import React, { useEffect, useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUniversitiesAsync } from '../homeSlice';
import LoadingPage from '../../../pages/LoadingPage';
import { Link } from 'react-router-dom';

const Slider = () => {
  const dispatch = useDispatch();
  const universityData = useSelector((state) => state.home.universities);
  const status = useSelector((state) => state.home.status);
  useEffect(() => {
    dispatch(fetchUniversitiesAsync());
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? universityData.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === universityData.length - 1 ? 0 : prev + 1
    );
  };

  if (status === 'loading') return <LoadingPage />;

  return (
    <div className="relative w-[90%] max-w-[400px]   mx-auto px-8 my-8">
      {universityData.length > 1 && (
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
          {universityData.map((university) => (
            <div
              key={university._id}
              className="flex-none w-full flex flex-col justify-between items-center h-[375px] rounded-md p-2  bg-indigo-100"
            >
              <div>
                <img
                  src={university.cover}
                  alt={`Slide ${university._id}`}
                  className="w-full aspect-video rounded-md  "
                />
                <div className="my-3">
                  <h2 className="text-[1.18rem] font-semibold">
                    {university.title}
                  </h2>
                  <p className="text-sm my-1">{university.description}</p>
                </div>
              </div>
              <Link
                to={`/papers/university/${university._id}`}
                className="hero-btn text-center"
              >
                Select
              </Link>
            </div>
          ))}
        </div>
      </div>
      {universityData.length > 1 && (
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
