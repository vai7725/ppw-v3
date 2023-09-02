import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.webp';
import { Toaster, toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerUserEmailAsync, verifyOTPAsync } from '../authSlice';

export default function VerifyOTP() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-14 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Verify OTP
          </h2>
          <p className="text-center text-sm text-gray-600 font-semibold">
            Check span folder if did not get otp
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              toast
                .promise(dispatch(verifyOTPAsync(data)), {
                  loading: 'verifying otp...',
                  success: (
                    <h3 className="toast-msg">OTP verified successfully</h3>
                  ),
                  error: <h3 className="toast-err">Invalid OTP! Try again</h3>,
                })
                .then(() => {
                  return navigate('/register-creds', { replace: true });
                });
            })}
          >
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                OTP
              </label>
              <div className="mt-2">
                <input
                  id="otp"
                  {...register('otp', {
                    required: true,
                  })}
                  type="number"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.otp ? 'ring-red-800' : ''
                  }`}
                />
                {errors.otp && (
                  <p className="text-sm text-red-800">{errors.otp.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Verify
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Didn't get OTP?{' '}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Send again
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
