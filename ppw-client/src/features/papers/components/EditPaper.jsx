import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCourses,
  clearPaper,
  clearUniversity,
  editPaperAsync,
  fetchCoursesAsync,
  fetchPaperAsync,
  handleSubjectTitleInput,
} from '../../papers/papersSlice';
import { useNavigate, useParams } from 'react-router-dom';
import {
  courseNameFinder,
  courseOptionsMaker,
  extractCourseYear,
  maxYearProvider,
  subjectOptionsMaker,
} from '../../../utils/helper';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { search } from '../../../utils/search';
import { XMarkIcon, XCircleIcon } from '@heroicons/react/24/outline';
import LoadingPage from '../../../pages/LoadingPage';

export default function EditPaper() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { paperId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, courses, subjectTitles, subject_title_input, paper } =
    useSelector((state) => state.papers);

  const [maxYearValue, setMaxYearValue] = useState(
    extractCourseYear(courses, paper.courseId)
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [inpValue, setInpValue] = useState(paper.subject_title);

  useEffect(() => {
    dispatch(fetchPaperAsync(paperId));
    return () => {
      dispatch(clearPaper());
      dispatch(clearUniversity());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCoursesAsync(paper.universityId));
    return () => {
      dispatch(clearCourses());
    };
  }, [paper.universityId]);

  const courseOptions = courseOptionsMaker(courses);

  const handleSearch = () => {
    const results = search(subjectTitles, inpValue);
    setSearchResults(results);
  };

  useEffect(() => {
    handleSearch();
  }, [inpValue]);

  // if (status === 'loading') {
  //   return <LoadingPage />;
  // }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div
          className={`sm:mx-auto sm:w-full sm:max-w-sm  flex items-center justify-center py-6 px-2 `}
        >
          {/* <div className="bg-blue-100 absolute w-full h-full -z-2 ">Hello</div> */}
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Modify Paper - "{paper.subject_title}"
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(editPaperAsync({ paperId, data })).then((res) => {
                if (res?.payload?.success) {
                  toast.success(res?.payload?.msg);
                  reset();
                  navigate(-1);
                } else {
                  toast.error(res?.payload?.msg);
                }
              });
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
                  {...register('courseId', { required: 'Course is required' })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    setMaxYearValue(maxYearProvider(courses, e.target.value));
                  }}
                >
                  <option value={paper.courseId}>
                    {courseNameFinder(courses, paper.courseId)}
                  </option>
                  {courseOptions.map((option) => {
                    if (option.value === paper.courseId) {
                      return;
                    }
                    return (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
                {errors.course && (
                  <p className="text-sm text-red-800">
                    {errors.course.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="exam_year"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Exam year
              </label>
              <div className="mt-2">
                <input
                  id="exam_year"
                  type="number"
                  {...register('exam_year', {
                    required: 'Course year is required',
                    max: {
                      value: maxYearValue,
                      message: `Value cannot be grater than ${maxYearValue}`,
                    },
                  })}
                  defaultValue={paper.exam_year}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  //   onChange={(e) => {
                  //     handlefilters('exam_year', e.target.value),
                  //       dispatch(
                  //         fetchSubjectTitlesAsync({
                  //           universityId,
                  //           courseId: selectedFilters.courseId,
                  //           exam_year: e.target.value,
                  //         })
                  //       );
                  //   }}
                />
                {
                  <p className="text-sm text-red-800">
                    {errors.exam_year?.message || ''}
                  </p>
                }
              </div>
            </div>

            <div>
              <label
                htmlFor="subject_title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Subject title
              </label>
              <div className="mt-2 relative">
                <input
                  id="subject_title"
                  type="text"
                  {...register('subject_title', {
                    required: 'Subject title is required',
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={subject_title_input}
                  onChange={(e) => {
                    dispatch(handleSubjectTitleInput(e.target.value));
                    setShowSuggestions(true);
                  }}
                />
                {errors.subject_title && (
                  <p className="text-sm text-red-800">
                    {errors.subject_title.message}
                  </p>
                )}

                {showSuggestions && (
                  <ul className="bg-gray-100 rounded-md relative mt-2 pt-2 w-full  shadow-md">
                    <button
                      onClick={(e) => {
                        e.preventDefault(), setShowSuggestions(false);
                      }}
                      className=" text-red-700 absolute right-0 top-0 rounded-tr-md rounded-bl-md bg-red-100"
                    >
                      <XCircleIcon className="h-6 w-6" />
                    </button>
                    {searchResults?.map((result) => (
                      <li
                        key={result}
                        className="px-3 py-1  my-1 hover:bg-indigo-100 rounded-sm cursor-default"
                        onClick={() => (
                          setInpValue(result), setShowSuggestions(false)
                        )}
                      >
                        {result}
                      </li>
                    ))}
                  </ul>
                )}
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
                  {...register('paper_year', {
                    required: 'Paper year is required',
                  })}
                  type="number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="2023 / 2024 ..."
                  defaultValue={paper.paper_year}
                />
              </div>
              {errors.paper_year && (
                <p className="text-sm text-red-800">
                  {errors.paper_year.message}
                </p>
              )}
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={paper.file_link}
                />
              </div>
              {errors.file_link && (
                <p className="text-sm text-red-800">
                  {errors.file_link.message}
                </p>
              )}
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
