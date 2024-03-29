import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.webp';
import { Toaster, toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { forgotPasswordAsync, resetPasswordAsync } from '../authSlice';

export default function ResetPassword() {
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-14 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              try {
                toast
                  .promise(dispatch(resetPasswordAsync(data)), {
                    loading: 'Changing your password...',
                    success: (
                      <h3 className="toast-msg">
                        Password has been reset successfully
                      </h3>
                    ),
                    error: <h3 className="toast-err">Some error occured</h3>,
                  })
                  .then((res) => {});
              } catch (error) {
                toast.error(error.message);
              }
            })}
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Set password
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Do not go back or close the website
          </p>
        </div>
      </div>
    </>
  );
}
