import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.webp';
import { Toaster, toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import {
  checkUsernameAsync,
  loginAsync,
  registerUserAsync,
  updatePasswordVisibility,
  updateUsernameValue,
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
  const { status, username_input, user, showPassword, usernameValidationMsg } =
    useSelector((state) => state.auth);

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(checkUsernameAsync(username_input));
    }, 1000);

    return () => clearTimeout(delay);
  }, [username_input]);

  useEffect(() => {
    dispatch(updateVerificationSession(false));
  }, []);

  return (
    <>
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
                toast
                  .promise(dispatch(registerUserAsync(data)), {
                    loading: 'Saving info...',
                    success: (
                      <h3 className="toast-msg">Verification email sent</h3>
                    ),
                    error: <h3 className="toast-err">Some error occured</h3>,
                  })
                  .then((res) => {
                    if (res.payload.success) {
                      dispatch(loginAsync());
                      navigate('/email-verification-success');
                    }
                  });
              } catch (error) {
                toast.error(error.message);
              }
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
              <div className="flex justify-between items-center ">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <p className="text-sm text-indigo-700 font-semibold">
                  {username_input ? usernameValidationMsg : ''}
                </p>
              </div>
              <div className="mt-2">
                <input
                  id="username"
                  {...register('username', {
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message:
                        'Username must be at least three characters long',
                    },
                  })}
                  type="text"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.username ? 'ring-red-800' : ''
                  }`}
                  value={username_input}
                  onChange={(e) =>
                    dispatch(updateUsernameValue(e.target.value.trim()))
                  }
                  placeholder="Spaces are not allowed"
                />

                {errors?.username && (
                  <p className="text-sm text-indigo-800">
                    {errors?.username?.message}
                  </p>
                )}
              </div>
            </div>

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
                    required: 'Email is required',
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
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must contain at least 6 characters',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.password ? 'ring-red-800' : ''
                  }`}
                />
                <div
                  onClick={() => dispatch(updatePasswordVisibility())}
                  className="w-6 h-6 absolute right-2 top-[20%] text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                </div>
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
                Create account
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
