// src/Slider.js
import React, { useEffect, useState } from 'react';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUniversitiesAsync, modifyUniversityAsync } from '../homeSlice';
import LoadingPage from '../../../pages/LoadingPage';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const Slider = () => {
  const dispatch = useDispatch();
  const universityData = useSelector((state) => state.home.universities);
  const { status } = useSelector((state) => state.home);
  const { user } = useSelector((state) => state.auth);
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
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative w-[90%] max-w-[400px]   mx-auto px-8 my-8">
        {universityData.length > 1 && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 hover:bg-gray-200  text-gray-800 p-1 rounded-full z-10"
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
                className="flex-none w-full flex flex-col justify-between items-center h-fit rounded-md p-2  bg-indigo-100"
              >
                <div>
                  <img
                    src={university.cover}
                    alt={`Slide ${university._id}`}
                    className="w-full aspect-[16/9] rounded-md  "
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
                  className="hero-btn text-center my-1"
                >
                  Select
                </Link>
                {user && user.role === 'ADMIN' && (
                  <div className="flex items-center justify-between w-full">
                    <Link
                      to={`/edit-university/${university._id}`}
                      className=" flex items-center justify-center text-center my-1 bg-indigo-700 text-white w-full mx-1 py-1 rounded-md hover:bg-indigo-600"
                    >
                      <PencilSquareIcon className="w-6 h-6 mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(
                          modifyUniversityAsync({
                            universityId: university._id,
                            data: { deleted: true },
                          })
                        ).then((res) => {
                          if (res?.payload?.success) {
                            toast.success(
                              <p className="toast-msg">{res?.payload?.msg}</p>
                            );
                            dispatch(fetchUniversitiesAsync());
                          } else {
                            toast.error(
                              <p className="toast.err">{res?.payload?.msg}</p>
                            );
                          }
                        });
                      }}
                      className="flex items-center justify-center text-center my-1  bg-red-700 text-white w-full mx-1 py-1 rounded-md hover:bg-red-600"
                    >
                      <TrashIcon className="w-6 h-6 mr-1" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {universityData.length > 1 && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2  hover:bg-gray-200 text-gray-800 p-1 rounded-full z-10"
            onClick={nextSlide}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        )}
      </div>
    </>
  );
};

export default Slider;
