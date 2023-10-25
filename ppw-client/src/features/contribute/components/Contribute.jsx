import { DocumentIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { handleContributionAsync } from '../contributionSlice';
import Loader from './Loader';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ogImg from '../../../assets/og-img.png';

export default function Contribute() {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    toast.error('You have to login to continue');
    return <Navigate to={'/login'} replace={true} />;
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    resetField,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.contribution);

  const file = watch('file');
  if (file && file[0]?.type !== 'application/pdf') {
    toast.error('Upload a PDF file only');
    resetField('file');
  }

  return (
    <>
      <Helmet>
        <title>Contribute | Previous Year Question Papers</title>
        <meta
          name="description"
          content="Contribute question papers to our site! Upload PDFs, help fellow students, and expand our educational resource"
        />
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_CLIENT_URI}/contribute`}
        />
        <meta
          name="keywords"
          content="contribute question paper, share question paper, help fellow students, contribute study material, upload paper"
        />
        <meta
          property="og:title"
          content="Contribute | Previous Year Question Papers"
        />
        <meta
          property="og:description"
          content="Contribute question papers to our site! Upload PDFs, help fellow students, and expand our educational resource"
        />
        <meta property="og:image" content={ogImg} />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_CLIENT_URI}/contribute`}
        />
        <meta property="og:type" content={`article`} />
      </Helmet>
      <form
        className="px-4 max-w-7xl py-12 sm:px-8"
        onSubmit={handleSubmit((data) => {
          const formData = new FormData();
          formData.append('university', data.university);
          formData.append('course', data.course);
          formData.append('subject', data.subject);
          formData.append('exam_year', data.exam_year);
          formData.append('paper_year', data.paper_year);
          formData.append('file', data.file[0]);
          formData.append('agree_with_terms', data.agree_with_terms);
          dispatch(handleContributionAsync(formData)).then(() => {
            reset();
          });
        })}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-2xl sm:text-3xl font-bold leading-7 text-gray-900">
              Help fellow students by uploading Question paper
            </h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Paper will be verified and then points will be added to your
              account.
            </p>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="university"
                    className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900"
                  >
                    <span>University</span>
                    {errors.university && (
                      <p className="text-xs text-red-700 font-semibold">
                        {errors.university.message}
                      </p>
                    )}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register('university', {
                        required: 'University name is required',
                      })}
                      id="university"
                      autoComplete="given-name"
                      placeholder="RTU / MDSU ..."
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="course"
                    className="flex items-center justify-between text-sm  font-medium leading-6 text-gray-900"
                  >
                    <span>Course</span>
                    {errors.course && (
                      <p className="text-xs text-red-700 font-semibold">
                        {errors.course.message}
                      </p>
                    )}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register('course', {
                        required: 'Course name is required',
                      })}
                      id="course"
                      placeholder="B.Sc / B.Tech ..."
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="subject"
                    className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900"
                  >
                    <span>Subject</span>
                    {errors.subject && (
                      <p className="text-xs text-red-700 font-semibold">
                        {errors.subject.message}
                      </p>
                    )}
                  </label>
                  <div className="mt-2">
                    <input
                      id="subject"
                      {...register('subject', {
                        required: 'Subject title is required',
                      })}
                      type="text"
                      placeholder="Enter subject as mentioned on the paper"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="exam_year"
                    className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900"
                  >
                    <span>Exam year</span>
                    {errors.exam_year && (
                      <p className="text-xs text-red-700 font-semibold">
                        {errors.exam_year.message}
                      </p>
                    )}
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      {...register('exam_year', {
                        required: 'Exam year is required',
                      })}
                      id="exam_year"
                      placeholder="1 / 2 / 3 ..."
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 sm:col-start-1">
                  <label
                    htmlFor="paper_year"
                    className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900"
                  >
                    <span>Paper year</span>
                    {errors.paper_year && (
                      <p className="text-xs text-red-700 font-semibold">
                        {errors.paper_year.message}
                      </p>
                    )}
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      {...register('paper_year', {
                        required: 'Paper year is required',
                      })}
                      id="paper_year"
                      placeholder="2023 / 2024 ..."
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <div className="flex items-center justify-between text-sm font-medium leading-6 text-gray-900">
                  <span>Question paper (PDF only)</span>
                  {errors?.file && (
                    <p className="text-xs text-red-700 font-semibold">
                      {errors?.file?.message}
                    </p>
                  )}
                </div>
                <div
                  className={`mt-2 flex justify-center rounded-lg border border-dashed ${
                    errors?.file ? 'border-red-600' : 'border-gray-900/25'
                  } px-6 py-10`}
                >
                  <div className="text-center">
                    <DocumentIcon
                      className={`mx-auto h-12 w-12 ${
                        file && file[0]?.type === 'application/pdf'
                          ? 'text-indigo-200'
                          : 'text-gray-300'
                      }`}
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <input
                        id="file-upload"
                        {...register('file', { required: 'File is required' })}
                        type="file"
                        className="sr-only"
                        accept="application/pdf"
                      />
                      {file && file[0]?.type === 'application/pdf' ? (
                        file[0]?.name
                      ) : (
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white  text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span className="font-semibold">Click here</span>
                          <span className="pl-1 text-gray-800">
                            to upload the appropriate file
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3 sm:col-start-1 flex items-center justify-start mt-8">
          <input
            type="checkbox"
            {...register('agree_with_terms', {
              required: 'Please accept our Terms and Conditions',
            })}
            id="t&c"
            className={`rounded-md border-0 ring-1 ring-inset mr-2 ${
              errors.agree_with_terms && 'ring-red-600'
            }`}
          />
          <div
            className={`block text-sm font-medium leading-6 text-gray-900 ${
              errors.agree_with_terms && 'text-red-700'
            }`}
          >
            I accept the{' '}
            <span className="text-indigo-600 underline cursor-pointer">
              terms and conditions
            </span>
            .
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {status === 'loading' ? <Loader /> : 'Submit'}
          </button>
        </div>
      </form>
    </>
  );
}
