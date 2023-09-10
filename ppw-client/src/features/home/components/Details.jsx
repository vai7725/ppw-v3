import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  clearCourses,
  clearUniversity,
  fetchCoursesAsync,
  fetchUniversityAsync,
} from '../../papers/papersSlice';
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

const Details = () => {
  const { universityId } = useParams();
  const dispatch = useDispatch();
  const { university, courses } = useSelector((state) => state.papers);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUniversityAsync(universityId));
    dispatch(fetchCoursesAsync(universityId));
    return () => {
      dispatch(clearUniversity());
      dispatch(clearCourses());
    };
  }, [universityId]);

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex items-center justify-center flex-wrap">
      <div className="w-1/2 min-w-[300px] p-4 sm:border-r-2 my-4 text-center flex flex-col items-center justify-center bg-indigo-50 sm:bg-white">
        <img
          src={university?.cover}
          alt={university?.title}
          className="w-full sm:w-3/4"
        />
        <h2 className="font-bold text-2xl">{university?.title}</h2>
        <p>{university?.description}</p>
      </div>
      <div className="w-1/2 min-w-fit p-4">
        <h1>
          {' '}
          <span className="font-semibold">Total courses </span> -{' '}
          {courses.length}
        </h1>
        <table className="divide-y mb-6 divide-gray-600 min-w-full border-gray-600 border-[1px] m-2 overflow-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-[1px] border-gray-600 text-center">
                S. No.
              </th>
              <th className="border-[1px] border-gray-600 text-center">
                Title
              </th>
              <th className="border-[1px] border-gray-600 text-center">
                Duration years
              </th>
              {user && user?.role === 'ADMIN' && (
                <th className="border-[1px] border-gray-600 text-center">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {courses.map((course, i) => (
              <tr key={i} className="">
                <td className="border-[1px] border-gray-600 text-center">
                  {i + 1}
                </td>
                <td className="border-[1px] border-gray-600 text-center">
                  {course.title}
                </td>
                <td className="border-[1px] border-gray-600 text-center">
                  {course.duration_years}
                </td>
                {user && user.role === 'ADMIN' && (
                  <td className="border-[1px] border-gray-600 text-center">
                    <button>
                      <PencilSquareIcon className="h-5 w-5 mx-1 text-indigo-700" />
                    </button>
                    <button>
                      <TrashIcon className="h-5 w-5 mx-1 text-red-700" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          <span className="font-semibold">Total question papers</span> -{' '}
          {university.papersCount} (
          <Link
            to={`/papers/university/${universityId}`}
            className="underline text-indigo-800"
          >
            See papers
          </Link>
          )
        </p>
      </div>
    </section>
  );
};

export default Details;
