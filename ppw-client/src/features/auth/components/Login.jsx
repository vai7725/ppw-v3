import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.webp';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserAsync,
  loginAsync,
  updatePasswordVisibility,
} from '../authSlice';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Login() {
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

  const { status, showPassword } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(loginAsync(data));
      if (res?.payload?.success) {
        dispatch(fetchUserAsync());
        navigate('/');
        toast.success(res?.payload?.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-14 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            // onSubmit={handleSubmit((data) => {
            //   dispatch(loginAsync(data)).then((res) => {
            //     if (res?.payload?.success) {
            //       toast.success(
            //         <p className="toast-msg">{res?.payload?.msg}</p>
            //       );
            //       dispatch(fetchUserAsync());
            //       navigate('/');
            //     } else {
            //       toast.error(<p className="toast-err">{res?.payload?.msg}</p>);
            //     }
            //   });
            // })}
            onSubmit={handleSubmit(onSubmit)}
          >
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to={'/forgot-password'}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Do not have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
