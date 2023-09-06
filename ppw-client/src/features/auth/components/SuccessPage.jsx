import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.webp';
import { Toaster, toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export default function SuccessPage() {
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-24 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-14 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Check your email
          </h2>
          <p className="text-center  text-gray-600 font-semibold">
            A verification link has been sent to your email
          </p>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="mt-3 text-center text-sm text-gray-500">
            Didn't get mail?{' '}
            <Link className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Send again
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
