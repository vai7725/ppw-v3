import { useDispatch, useSelector } from 'react-redux';
import paperCover from '../../../assets/paper-cover.jpeg';
import { useEffect } from 'react';
import { fetchPapersAsync, fetchUniversityAsync } from '../papersSlice';
import LoadingPage from '../../../pages/LoadingPage';
import { examYearObj, idExtractor } from '../../../utils/helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Papers({ universityId }) {
  const dispatch = useDispatch();
  const { papers, courses, university, page, hasMorePages, errorMsg } =
    useSelector((state) => state.papers);

  const courseNames = courses.reduce((acc, course) => {
    acc[course._id] = course.title;
    return acc;
  }, {});

  useEffect(() => {
    dispatch(fetchUniversityAsync(universityId));
  }, [universityId, dispatch]);

  useEffect(() => {
    dispatch(fetchPapersAsync({ universityId, page }));
  }, []);

  const examYears = examYearObj();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {university.title}
        </h2>

        {errorMsg ? (
          <div className=" py-12 text-red-700 text-2xl text-center flex flex-col justify-center items-center ">
            <ExclamationTriangleIcon className="h-10 w-10" />
            <h3>{errorMsg}</h3>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={papers.length}
            next={() => dispatch(fetchPapersAsync({ universityId, page }))}
            loader={<LoadingPage />}
            hasMore={hasMorePages}
            className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
          >
            {papers.map(
              ({
                _id,
                subject_title,
                courseId,
                universityId,
                exam_year,
                paper_year,
                file_link,
              }) => (
                <div
                  key={_id}
                  className="group relative flex flex-col justify-between p-1 bg-indigo-100 rounded"
                >
                  <div>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md ">
                      <div
                        alt={subject_title}
                        className="h-full w-full  flex flex-col justify-between items-center  object-cover object-center  rounded-sm"
                      >
                        <img
                          src={paperCover}
                          alt=""
                          className="w-full h-full rounded"
                        />
                      </div>
                    </div>
                    <div className=" flex flex-col justify-between ">
                      <h2 className="text-md font-semibold text-gray-700">
                        <a
                          href={`https://drive.google.com/u/0/uc?id=${idExtractor(
                            file_link
                          )}&export=download`}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {subject_title}
                        </a>
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {courseNames[courseId]} - {examYears[exam_year]}
                      </p>
                      <p className="text-sm font-semibold text-gray-500">
                        {paper_year}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
