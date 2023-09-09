import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCourses,
  clearUniversity,
  fetchCoursesAsync,
  fetchExamYearsAsync,
  fetchSubjectTitlesAsync,
  fetchUniversityAsync,
  savePaperAsync,
  updateFilters,
} from '../../papers/papersSlice';
import { useParams } from 'react-router-dom';
import {
  courseOptionsMaker,
  examYearObj,
  subjectOptionsMaker,
} from '../../../utils/helper';
import { useForm } from 'react-hook-form';
import useCourseDuration from '../../../utils/useCourseDuration';
import toast, { Toaster } from 'react-hot-toast';

export default function AddPaper() {
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
  const { courses, examYears, selectedFilters, subjectTitles, university } =
    useSelector((state) => state.papers);

  useEffect(() => {
    dispatch(fetchCoursesAsync(universityId));
    dispatch(fetchUniversityAsync(universityId));
    return () => {
      dispatch(clearCourses());
      dispatch(clearUniversity());
    };
  }, [universityId]);

  const courseOptions = courseOptionsMaker(courses);
  const [durationYearsOptions] = useCourseDuration(examYears);
  const subjectOptions = subjectOptionsMaker(subjectTitles);

  const handlefilters = (key, value) => {
    dispatch(updateFilters({ [key]: value }));
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
            Add New Question Paper to "{university.title}"
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(savePaperAsync({ ...data, universityId })).then(
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
                htmlFor="course"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Course
              </label>
              <div className="mt-2">
                <select
                  id="course"
                  {...register('course', { required: 'Course is required' })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    handlefilters('courseId', e.target.value),
                      dispatch(
                        fetchExamYearsAsync({
                          universityId,
                          courseId: e.target.value,
                        })
                      );
                  }}
                >
                  <option value="">--Select course--</option>
                  {courseOptions.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="exam_year"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Course year
              </label>
              <div className="mt-2">
                <select
                  id="exam_year"
                  {...register('exam_year')}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    handlefilters('exam_year', e.target.value),
                      dispatch(
                        fetchSubjectTitlesAsync({
                          universityId,
                          courseId: selectedFilters.courseId,
                          exam_year: e.target.value,
                        })
                      );
                  }}
                >
                  <option value="">--Select course year--</option>
                  {durationYearsOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="subject_title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Subject title
              </label>
              <div className="mt-2">
                <select
                  id="subject_title"
                  {...register('subject_title')}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">--Select subject--</option>
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="paper_year"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Paper year
              </label>
              <div className="mt-2">
                <input
                  id="paper_year"
                  {...register('paper_year')}
                  type="number"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="file_link"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                File link
              </label>
              <div className="mt-2">
                <input
                  id="file_link"
                  {...register('file_link', {
                    required: 'File link is required',
                    match: {
                      value:
                        /^https:\/\/drive\.google\.com\/file\/d\/[A-Za-z0-9_-]+\/view\?usp=sharing$/,
                      message: 'Invalid file link',
                    },
                  })}
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
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
