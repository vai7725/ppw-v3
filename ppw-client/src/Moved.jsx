export default function Moved() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-semibold bg-gray-200 text-center">
      <p>
        This website is moved to{' '}
        <a href="https://previouspapers.vercel.app" className="underline">
          https://previouspapers.vercel.app
        </a>{' '}
      </p>
      <p>To visit the new version of the website</p>
      <a
        href="https://previouspapers.vercel.app"
        className="bg-gray-800 text-white px-4 py-2 rounded active:scale-95 transition"
      >
        Click here
      </a>
    </div>
  );
}
