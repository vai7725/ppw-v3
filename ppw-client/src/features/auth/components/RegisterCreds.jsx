import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.webp';
import { Toaster, toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerRestCredentialsAsync,
  registerUserEmailAsync,
  updateVerificationSession,
} from '../authSlice';
import { useEffect } from 'react';

export default function RegisterCreds() {
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
  const { user } = useSelector((state) => state.auth);

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
            Complete your profile
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              toast
                .promise(
                  dispatch(registerRestCredentialsAsync({ ...data, ...user })),
                  {
                    loading: 'Saving credentials...',
                    success: (
                      <h3 className="toast-msg">
                        Your account created successfully
                      </h3>
                    ),
                    error: <h3 className="toast-err">Some error occured</h3>,
                  }
                )
                .then(() => {
                  return navigate('/');
                });
            })}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register('name', {
                    required: 'Name is reaquired',
                  })}
                  type="text"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.name ? 'ring-red-800' : ''
                  }`}
                />
                {errors.name && (
                  <p className="text-sm text-red-800">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  {...register('username', {
                    required: 'username is required',
                  })}
                  type="text"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.username ? 'ring-red-800' : ''
                  }`}
                />
                {errors.username && (
                  <p className="text-sm text-red-800">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must contain at least 6 characters',
                    },
                  })}
                  type="text"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.password ? 'ring-red-800' : ''
                  }`}
                />
                {errors.password && (
                  <p className="text-sm text-red-800">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="profession"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profession
              </label>
              <div className="mt-2">
                <input
                  id="profession"
                  {...register('profession', {
                    required: 'Profession is required',
                  })}
                  type="text"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.profession ? 'ring-red-800' : ''
                  }`}
                  placeholder="Teacher / Student ..."
                />
                {errors.profession && (
                  <p className="text-sm text-red-800">
                    {errors.profession.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="university"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your university{' '}
                <span className="text-gray-400">(optional)</span>
              </label>
              <div className="mt-2">
                <input
                  id="university"
                  {...register('university')}
                  type="text"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.university ? 'ring-red-800' : ''
                  }`}
                />
                {errors.university && (
                  <p className="text-sm text-red-800">
                    {errors.university.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enrolled course{' '}
                <span className="text-gray-400">(optional)</span>
              </label>
              <div className="mt-2">
                <input
                  id="course"
                  {...register('course')}
                  type="text"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.course ? 'ring-red-800' : ''
                  }`}
                  placeholder="B.Sc / B.Ed ..."
                />
                {errors.course && (
                  <p className="text-sm text-red-800">
                    {errors.course.message}
                  </p>
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
