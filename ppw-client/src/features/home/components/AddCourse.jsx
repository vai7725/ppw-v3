import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUniversity,
  saveCourseAsync,
  updateFilters,
} from '../../papers/papersSlice';
import { useParams } from 'react-router-dom';
import { courseOptionsMaker, subjectOptionsMaker } from '../../../utils/helper';
import { useForm } from 'react-hook-form';
import useCourseDuration from '../../../utils/useCourseDuration';
import toast, { Toaster } from 'react-hot-toast';

export default function AddCourse() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { universityId } = useParams();
  const dispatch = useDispatch();
  const { university, selectedFilters } = useSelector((state) => state.papers);

  useEffect(() => {
    return () => {
      dispatch(clearUniversity());
    };
  }, [universityId]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div
          className={`sm:mx-auto sm:w-full sm:max-w-sm  flex items-center justify-center py-6 px-2 bg-cover bg-center bg-no-repeat bg-blend-screen`}
          style={{
            backgroundImage: `url(${university.cover})`,
            backgroundColor: 'rgba(255, 255, 255, .7',
          }}
        >
          {/* <div className="bg-blue-100 absolute w-full h-full -z-2 ">Hello</div> */}
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add New Course to "{university.title}"
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(saveCourseAsync({ ...data, universityId })).then(
                (res) => {
                  if (res?.payload?.success) {
                    toast.success(res?.payload?.msg);
                    reset();
                  } else {
                    toast.error(res?.payload?.msg);
                  }
                }
              );
            })}
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Course name
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  {...register('title', {
                    required: 'Title is required',
                  })}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.title && <p>{errors.title.message}</p>}
            </div>

            <div>
              <label
                htmlFor="duration_years"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Course duration
              </label>
              <div className="mt-2">
                <input
                  id="duration_years"
                  {...register('duration_years', {
                    required: 'Course duration is required',
                  })}
                  type="number"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.duration_years && <p>{errors.duration_years.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add paper
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
