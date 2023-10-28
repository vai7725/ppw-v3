import { useDispatch, useSelector } from 'react-redux';
import DefaultAvatar from '../../profile/DefaultAvatar';
import { LinkIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { LoaderIcon } from 'react-hot-toast';
import {
  acceptContributionAsync,
  handleContributionSpecificLoader,
} from '../dashboardSlice';
import Loader from '../../contribute/components/Loader';

export default function ContributionSection({ contributions }) {
  const dispatch = useDispatch();
  const { loadStatus, status } = useSelector((state) => state.dashboard);

  return (
    <div className=" w-full border-2 border-gray-300 p-2 rounded mb-4">
      <h2 className="text-xl">
        <span className="font-semibold">Total Contributions:</span>{' '}
        {contributions?.length}
      </h2>
      {status === 'loading' ? (
        <div className="w-full flex items-center justify-center p-2">
          <LoaderIcon />
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contributions.map((cont) => (
              <div
                key={cont._id}
                className="bg-white p-4 rounded shadow-md overflow-auto"
              >
                <div className="text-3xl text-gray-600 mb-4">
                  <i className="fas fa-user-circle"></i>
                </div>
                <h2 className="text-xl font-semibold">{cont.subject}</h2>
                <p className="text-gray-600 flex items-center justify-start">
                  <span className="text-sm font-semibold">
                    {cont.course} ({cont.university}) - ({cont.exam_year} /{' '}
                    {cont.paper_year})
                  </span>
                </p>
                <a
                  href={cont.file}
                  target="_blank"
                  className="text-gray-600 w-fit text-sm flex items-center justify-start font-semibold"
                >
                  File
                  <LinkIcon className="w-3 h-3 ml-1 font-bold" />
                </a>
                <p className="text-gray-600 flex items-center justify-start text-xs">
                  <span className="font-semibold">Uploaded by -</span>
                  {cont.uploaded_by.username}
                </p>
                <div>
                  <button
                    onClick={() => {
                      dispatch(handleContributionSpecificLoader(cont._id));
                      dispatch(
                        acceptContributionAsync({
                          contributionId: cont._id,
                          userId: cont.uploaded_by.userId,
                        })
                      );
                    }}
                    className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                  >
                    {cont.status === 'loading' ? <Loader /> : 'Accept'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
