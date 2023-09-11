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
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
  DocumentPlusIcon,
} from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';
import { editCourseAsync, fetchCourseAsync } from '../homeSlice';

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
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
          <div className="flex justify-between items-center">
            <h1>
              {' '}
              <span className="font-semibold">Total courses </span> -{' '}
              {courses.length}
            </h1>
            <div className="flex items-center justify-center border  rounded-sm">
              <Link
                to={`/add-course/${universityId}`}
                className="hover:bg-gray-200 p-1"
                title="Add course"
              >
                <PlusCircleIcon className="w-6 h-6 mx-1 rounded-sm " />
              </Link>
              <Link
                to={`/add-paper/${universityId}`}
                className="hover:bg-gray-200 p-1 hover:text-green-700"
                title="Add paper"
              >
                <DocumentPlusIcon className="h-6 w-6 mx-1 rounded-sm" />
              </Link>
            </div>
          </div>
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
                  Duration
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
                    <td className=" border-gray-600 text-center flex justify-center items-center">
                      <Link
                        to={`/edit-course/${course._id}`}
                        title={`Edit ${course.title}`}
                      >
                        <PencilSquareIcon className="h-5 w-5 mx-1 text-indigo-700" />
                      </Link>

                      <button
                        title={`Delete ${course.title}`}
                        onClick={() => {
                          dispatch(
                            editCourseAsync({
                              courseId: course._id,
                              editData: { deleted: true },
                            })
                          ).then((res) => {
                            if (res?.payload?.success) {
                              toast.success(
                                <p className="toast-msg">{res?.payload?.msg}</p>
                              );
                              dispatch(fetchCoursesAsync(universityId));
                            } else {
                              toast.error(
                                <p className="toast.err">{res?.payload?.msg}</p>
                              );
                            }
                          });
                        }}
                      >
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
            {university.papersCount}{' '}
            {university.papersCount > 0 && (
              <>
                {'('}{' '}
                <Link
                  to={`/papers/university/${universityId}`}
                  className="underline text-indigo-800"
                >
                  See papers
                </Link>{' '}
                {')'}
              </>
            )}
          </p>
        </div>
      </section>
    </>
  );
};

export default Details;