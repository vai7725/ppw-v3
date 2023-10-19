import logo from '../../../assets/logo.webp';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import successGif from '../../../assets/successful.gif';

export default function SuccessPage() {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-24 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-14 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Verification link has been sent to email
          </h2>
          <p className="text-center  text-gray-600 font-semibold">
            In case you don't find the mail, check the{' '}
            <span className="text-black font-semibold underline">spam</span>{' '}
            folder in your inbox
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img src={successGif} alt="Successfull.gif" className="w-32" />
        </div>

        {/* <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="mt-3 text-center text-sm text-gray-500">
            Didn't get mail?{' '}
            <button
              onClick={() =>
                toast.promise(dispatch(resendVerificationEmailAsync()), {
                  loading: 'Sending...',
                  success: 'Email has been sent successfully',
                  error: 'Something went wrong',
                })
              }
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Send again
            </button>
          </p>
        </div> */}
      </div>
    </>
  );
}
