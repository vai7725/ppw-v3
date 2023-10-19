import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { saveUniversityAsync } from '../homeSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AddUniversity() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className=" bg-white px-6 py-12  lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Add university
        </h2>
      </div>
      <form
        className="mx-auto mt-12 max-w-xl "
        onSubmit={handleSubmit((data) => {
          toast.promise(dispatch(saveUniversityAsync(data)), {
            loading: 'Saving university...',
            success: (
              <h3 className="toast-msg">University saved successfully</h3>
            ),
            error: (
              <h3 className="toast-err">
                Some error occured. Please try again later
              </h3>
            ),
          });
        })}
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Title
            </label>

            <div className="mt-2.5">
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                id="title"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.title && (
              <p className="text-sm text-red-800">{errors.title.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label
              htmlFor="cover"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Cover link
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                {...register('cover', { required: 'Cover link is required' })}
                id="cover"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.cover && (
              <p className="text-sm text-red-800">{errors.cover.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 20,
                    message: 'Write at least 20 characters',
                  },
                })}
                id="description"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.description && (
              <p className="text-sm text-red-800">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
