import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  PlusCircleIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import {
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/20/solid';
import Papers from './Papers';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCoursesAsync,
  fetchExamYearsAsync,
  fetchFilteredPapersAsync,
  fetchPapersAsync,
  fetchSubjectTitlesAsync,
  updateFilters,
  clearPapers,
  clearFilters,
  clearCourses,
} from '../papersSlice';
import { Link, useParams } from 'react-router-dom';
import useCourseDuration from '../../../utils/useCourseDuration';
import { Controller, useForm } from 'react-hook-form';
import { courseOptionsMaker, subjectOptionsMaker } from '../../../utils/helper';
import { Toaster } from 'react-hot-toast';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PapersSection() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const {
    university,
    courses,
    examYears,
    subjectTitles,
    selectedFilters,
    papersFiltered,
    page,
  } = useSelector((state) => state.papers);
  const { universityId } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCoursesAsync(universityId));
    return () => {
      dispatch(clearCourses());
    };
  }, []);

  // const courseOptions = courses.map((course) => {
  //   return {
  //     value: course._id,
  //     label: course.title,
  //     checked: false,
  //   };
  // });

  const courseOptions = courseOptionsMaker(courses);

  const [durationYearsOptions] = useCourseDuration(examYears);

  const courseFilters = {
    id: 'courseId',
    name: 'Courses',
    options: courseOptions,
  };
  const examYearFilters = {
    id: 'exam_year',
    name: 'Exam year',
    options: durationYearsOptions,
  };
  const subjectTitleFilters = {
    id: 'subject_title',
    name: 'Subjects',
    // options: subjectTitles.map((title) => {
    //   return {
    //     value: title,
    //     label: title,
    //     checked: false,
    //   };
    // }),
    options: subjectOptionsMaker(subjectTitles),
  };

  const handlefilters = (key, value) => {
    dispatch(updateFilters({ [key]: value }));
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  useEffect(() => {
    document.title = `Previous year question papers | ${university.title} old papers | ${university.title} paper pattern | ${university.title} b sc bed old papers | ${university.title} ba bed old papers | ${university.title} previous year questions papers`;
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      {papersFiltered && (
                        <div className=" p-2 flex justify-end items-center text-gray-700">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(clearPapers());
                              dispatch(clearFilters());
                              dispatch(
                                fetchPapersAsync({ universityId, page })
                              );
                            }}
                            className="underline font-semibold text-sm"
                          >
                            Clear search
                          </button>
                        </div>
                      )}
                      <Disclosure
                        as="div"
                        className="border-b border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {courseFilters.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <ChevronUpIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <ChevronDownIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {courseFilters.options?.map(
                                  (option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${courseFilters.id}-${optionIdx}`}
                                        {...register(courseFilters.id)}
                                        defaultValue={option.value}
                                        type="radio"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onClick={() => {
                                          handlefilters(
                                            courseFilters.id,
                                            option.value
                                          );

                                          dispatch(
                                            fetchExamYearsAsync({
                                              universityId,
                                              courseId: option.value,
                                            })
                                          );
                                        }}
                                      />

                                      <label
                                        htmlFor={`filter-mobile-${courseFilters.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  )
                                )}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>

                      <Disclosure
                        as="div"
                        className="border-b border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {examYearFilters.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <ChevronUpIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <ChevronDownIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              {examYearFilters.options.length > 0 ? (
                                <div className="space-y-4">
                                  {examYearFilters.options?.map(
                                    (option, optionIdx) => (
                                      <div
                                        key={option.value}
                                        className="flex items-center"
                                      >
                                        <input
                                          id={`filter-mobile-${examYearFilters.id}-${optionIdx}`}
                                          {...register(examYearFilters.id)}
                                          defaultValue={option.value}
                                          type="radio"
                                          defaultChecked={option.checked}
                                          className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          onClick={() => {
                                            handlefilters(
                                              examYearFilters.id,
                                              option.value
                                            );
                                            dispatch(
                                              fetchSubjectTitlesAsync({
                                                universityId,
                                                courseId:
                                                  selectedFilters.courseId,
                                                exam_year: option.value,
                                              })
                                            );
                                          }}
                                        />

                                        <label
                                          htmlFor={`filter-mobile-${examYearFilters.id}-${optionIdx}`}
                                          className="ml-3 text-sm text-gray-600"
                                        >
                                          {option.label}
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-400 ">
                                  Select course to see options
                                </p>
                              )}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>

                      <Disclosure
                        as="div"
                        className="border-b border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {subjectTitleFilters.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <ChevronUpIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <ChevronDownIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              {subjectTitleFilters.options.length > 0 ? (
                                <div className="space-y-4">
                                  {subjectTitleFilters.options?.map(
                                    (option, optionIdx) => (
                                      <div
                                        key={option.value}
                                        className="flex items-center"
                                      >
                                        <input
                                          id={`filter-mobile-${subjectTitleFilters.id}-${optionIdx}`}
                                          {...register(subjectTitleFilters.id)}
                                          defaultValue={option.value}
                                          type="radio"
                                          defaultChecked={option.checked}
                                          className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          onClick={() => {
                                            handlefilters(
                                              subjectTitleFilters.id,
                                              option.value
                                            );
                                            dispatch(
                                              fetchFilteredPapersAsync({
                                                universityId,
                                                courseId:
                                                  selectedFilters.courseId,
                                                exam_year:
                                                  selectedFilters.exam_year,
                                                subject_title: option.value,
                                              })
                                            );
                                          }}
                                        />

                                        <label
                                          htmlFor={`filter-mobile-${subjectTitleFilters.id}-${optionIdx}`}
                                          className="ml-3 text-sm text-gray-600"
                                        >
                                          {option.label}
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-400 ">
                                  Select exam year to see options
                                </p>
                              )}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  Papers
                </h1>
              </div>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1"></div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <button
                  type="button"
                  className=" text-gray-700 hover:text-gray-500 lg:hidden sm:w-12 "
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  {papersFiltered && (
                    <div className="flex justify-start items-center text-gray-700">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(clearPapers());
                          dispatch(clearFilters());
                          dispatch(fetchPapersAsync({ universityId, page }));
                          reset();
                        }}
                        className="underline font-semibold text-sm"
                      >
                        Clear search
                      </button>
                    </div>
                  )}

                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {courseFilters.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <ChevronUpIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ChevronDownIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {courseFilters.options?.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${courseFilters.id}-${optionIdx}`}
                                  {...register(courseFilters.id)}
                                  defaultValue={option.value}
                                  type="radio"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onClick={() => {
                                    handlefilters(
                                      courseFilters.id,
                                      option.value
                                    );

                                    dispatch(
                                      fetchExamYearsAsync({
                                        universityId,
                                        courseId: option.value,
                                      })
                                    );
                                  }}
                                />

                                <label
                                  htmlFor={`filter-${courseFilters.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {examYearFilters.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <ChevronUpIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ChevronDownIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          {examYearFilters.options.length > 0 ? (
                            <div className="space-y-4">
                              {examYearFilters.options?.map(
                                (option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${examYearFilters.id}-${optionIdx}`}
                                      {...register(examYearFilters.id)}
                                      defaultValue={option.value}
                                      type="radio"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      onClick={() => {
                                        handlefilters(
                                          examYearFilters.id,
                                          option.value
                                        );
                                        dispatch(
                                          fetchSubjectTitlesAsync({
                                            universityId,
                                            courseId: selectedFilters.courseId,
                                            exam_year: option.value,
                                          })
                                        );
                                      }}
                                    />

                                    <label
                                      htmlFor={`filter-${examYearFilters.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400 ">
                              Select course to see options
                            </p>
                          )}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {subjectTitleFilters.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <ChevronUpIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ChevronDownIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          {subjectTitleFilters.options.length > 0 ? (
                            <div className="space-y-4">
                              {subjectTitleFilters.options?.map(
                                (option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${subjectTitleFilters.id}-${optionIdx}`}
                                      {...register(subjectTitleFilters.id)}
                                      defaultValue={option.value}
                                      type="radio"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      onClick={() => {
                                        handlefilters(
                                          subjectTitleFilters.id,
                                          option.value
                                        );
                                        dispatch(
                                          fetchFilteredPapersAsync({
                                            universityId,
                                            courseId: selectedFilters.courseId,
                                            exam_year:
                                              selectedFilters.exam_year,
                                            subject_title: option.value,
                                          })
                                        );
                                      }}
                                    />

                                    <label
                                      htmlFor={`filter-${subjectTitleFilters.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400 ">
                              Select exam year to see options
                            </p>
                          )}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </form>
                {/* Product grid */}
                <div className="lg:col-span-3">
                  <Papers universityId={universityId} />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
