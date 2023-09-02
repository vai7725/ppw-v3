import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.webp';
import { Toaster, toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerUserEmailAsync,
  updateUserEmail,
  updateVerificationSession,
} from '../authSlice';
import { useEffect } from 'react';

export default function Signup() {
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
  const { status, redirectToCreds, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(updateVerificationSession(false));
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-14 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              try {
                dispatch(updateUserEmail(data));
                toast
                  .promise(dispatch(registerUserEmailAsync(data)), {
                    loading: 'loading...',
                    success: <h3 className="toast-msg">👍</h3>,
                    error: <h3 className="toast-err">Some error occured</h3>,
                  })
                  .then((res) => {
                    if (res.payload.redirectToCreds) {
                      navigate('/register-creds');
                    } else {
                      dispatch(updateVerificationSession(true));
                      navigate('/verify-otp');
                    }
                  });
              } catch (error) {
                toast.error(error.message);
              }
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  type="text"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.email ? 'ring-red-800' : ''
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-800">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Next
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
