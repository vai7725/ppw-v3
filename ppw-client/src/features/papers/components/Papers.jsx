import { useDispatch, useSelector } from 'react-redux';
import paperCover from '../../../assets/paper-cover.jpeg';
import { useEffect } from 'react';
import {
  clearPapers,
  clearUniversity,
  editPaperAsync,
  fetchPapersAsync,
  removeDeletedPaper,
  resetPage,
  updatePaperViewsAsync,
} from '../papersSlice';
import LoadingPage from '../../../pages/LoadingPage';
import { examYearObj, idExtractor } from '../../../utils/helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  ExclamationTriangleIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Papers({ universityId, papers }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, university, page, hasMorePages, errorMsg } = useSelector(
    (state) => state.papers
  );
  const { user } = useSelector((state) => state.auth);

  const courseNames = courses.reduce((acc, course) => {
    acc[course._id] = course.title;
    return acc;
  }, {});

  useEffect(() => {
    return () => {
      dispatch(clearUniversity());
      dispatch(resetPage());
    };
  }, [universityId]);

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
                exam_year,
                paper_year,
                file_link,
                views,
              }) => (
                <a
                  key={_id}
                  className="group relative  justify-between p-1 bg-indigo-100 rounded cursor-pointer"
                  onClick={(e) => {
                    dispatch(
                      updatePaperViewsAsync({ paperId: _id, file_link })
                    );
                  }}
                  href={file_link}
                  target="_blank"
                >
                  <div className="flex h-full flex-col">
                    <div className="aspect-h-1  aspect-w-1 w-full overflow-hidden rounded-md ">
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
                    <div className=" flex flex-col justify-between   h-full">
                      <h2 className="text-md text-left font-semibold text-gray-700">
                        {subject_title}
                      </h2>
                      <div>
                        <p className="mt-1 w-1/2 text-sm text-gray-500">
                          {courseNames[courseId]} - {examYears[exam_year]}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-semibold text-gray-500">
                            {paper_year}
                          </p>
                          <div className="flex justify-end w-1/2">
                            <p className="text-sm  text-gray-500">
                              {views > 0 && `${views} views`}
                            </p>
                            {user && user?.role === 'ADMIN' && (
                              <div className="flex">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    navigate(`/edit-paper/${_id}`);
                                  }}
                                >
                                  <PencilSquareIcon className="h-5 w-5 text-indigo-800 hover:text-indigo-600" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    dispatch(
                                      editPaperAsync({
                                        paperId: _id,
                                        data: { deleted: true },
                                      })
                                    ).then((res) => {
                                      if (res?.payload?.success) {
                                        toast.success(res?.payload?.msg);
                                        dispatch(removeDeletedPaper(_id));
                                      } else {
                                        toast.error(res?.payload?.msg);
                                      }
                                    });
                                  }}
                                >
                                  <TrashIcon className="h-5 w-5 text-red-800 hover:text-red-600" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              )
            )}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
