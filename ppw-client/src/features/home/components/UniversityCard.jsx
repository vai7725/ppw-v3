// src/Slider.js
import React, { useEffect, useState } from 'react';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
  DocumentPlusIcon,
  ExclamationCircleIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUniversitiesAsync,
  modifyUniversityAsync,
  toggleUniversityOptions,
} from '../homeSlice';
import LoadingPage from '../../../pages/LoadingPage';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const Slider = () => {
  const dispatch = useDispatch();
  const { universities } = useSelector((state) => state.home);
  const { status } = useSelector((state) => state.home);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchUniversitiesAsync());
  }, []);

  if (status === 'loading') return <LoadingPage />;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" w-full sm:w-[90%] my-8 h-fit">
        <div className="flex justify-center flex-wrap ">
          {universities.map((university) => (
            <div
              key={university._id}
              className="relative m-2 w-full max-w-[300px] bg-indigo-100 p-2 flex flex-col justify-between rounded-md shadow-md"
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
              <div className="flex items-center justify-center w-full">
                <Link
                  to={`/papers/university/${university._id}`}
                  className="hero-btn text-center my-1"
                >
                  Select
                </Link>
                {user &&
                  (user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
                    <>
                      <button
                        onClick={() => {
                          dispatch(toggleUniversityOptions(university._id));
                        }}
                        className=" p-1 rounded-full mx-1 hover:bg-gray-100"
                      >
                        <EllipsisVerticalIcon className="w-6 h-6" />
                      </button>
                      {university?.showOptions && (
                        <div className=" absolute right-8 bottom-12 flex flex-col  rounded-sm shadow-md bg-gray-800 ">
                          <Link
                            to={`/details/${university._id}`}
                            className=" flex items-center justify-start text-white pl-2 pr-4 text-sm hover:bg-gray-600 w-full  py-1 my-1 "
                          >
                            <ExclamationCircleIcon className="w-5 h-5 mr-1" />
                            Details
                          </Link>
                          <Link
                            to={`/edit-university/${university._id}`}
                            className=" flex items-center justify-start text-white pl-2 pr-4 text-sm hover:bg-gray-600 w-full  py-1 my-1 "
                          >
                            <PencilSquareIcon className="w-5 h-5 mr-1" />
                            Edit university
                          </Link>
                          <Link
                            to={`/add-course/${university._id}`}
                            className=" flex items-center justify-start text-white pl-2 pr-4 text-sm hover:bg-gray-600 w-full  py-1 my-1 "
                          >
                            <PlusCircleIcon className="w-5 h-5 mr-1" />
                            Add courses
                          </Link>
                          <Link
                            to={`/add-paper/${university._id}`}
                            className=" flex items-center justify-start text-white pl-2 pr-4 text-sm hover:bg-gray-600 w-full  py-1 my-1 "
                          >
                            <DocumentPlusIcon className="w-5 h-5 mr-1" />
                            Add paper
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
                                    <p className="toast-msg">
                                      {res?.payload?.msg}
                                    </p>
                                  );
                                  dispatch(fetchUniversitiesAsync());
                                } else {
                                  toast.error(
                                    <p className="toast.err">
                                      {res?.payload?.msg}
                                    </p>
                                  );
                                }
                              });
                            }}
                            className=" flex items-center justify-start text-white pl-2 pr-4 text-sm hover:bg-gray-600 w-full  py-1 my-1 "
                          >
                            <TrashIcon className="w-5 h-5 mr-1" />
                            Delete university
                          </button>
                        </div>
                      )}
                    </>
                  )}
              </div>
              {/* {user && (user.role === 'ADMIN' || user.role === 'MANAGER') && (
                  <div className="flex items-center justify-between w-full">
                    <Link
                      to={`/add-course/${university._id}`}
                      className=" flex items-center justify-center text-center my-1 bg-green-700 text-white w-full mx-1 py-1 rounded-md hover:bg-green-600"
                    >
                      <PlusCircleIcon className="w-6 h-6 mr-1" />
                      Add courses
                    </Link>
                    <Link
                      to={`/add-paper/${university._id}`}
                      className="flex items-center justify-center text-center my-1  bg-blue-700 text-white w-full mx-1 py-1 rounded-md hover:bg-blue-600"
                    >
                      <DocumentPlusIcon className="w-6 h-6 mr-1" />
                      Add paper
                    </Link>
                  </div>
                )}
                {user && user.role === 'ADMIN' && (
                  <div className="flex items-center justify-between w-full">
                    <Link
                      to={`/edit-university/${university._id}`}
                      className=" flex items-center justify-center text-center my-1 bg-sky-700 text-white w-full mx-1 py-1 rounded-md hover:bg-sky-600"
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
                )} */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Slider;
