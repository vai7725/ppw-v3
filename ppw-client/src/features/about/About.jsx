import { Helmet } from 'react-helmet-async';
import { AiFillLinkedin, AiOutlineInstagram } from 'react-icons/ai';
import ogImg from '../../assets/og-img.png';
const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Helmet>
        <title>About | Previous Year Question Papers</title>
        <meta
          name="description"
          content="Boost your exam prep with our wide collection of past question papers from various universities of Rajasthan. Get ahead and excel!"
        />
        <link
          rel="canonical"
          href={`${import.meta.env.VITE_CLIENT_URI}/about`}
        />
        <meta
          name="keywords"
          content="about previous year question papers , what is previous year question papers, previous year question papers"
        />
        <meta
          property="og:title"
          content="About | Previous Year Question Papers"
        />
        <meta
          property="og:description"
          content="Access question papers of different universities of Rajasthan easily. Boost your studies. Visit now!"
        />
        <meta property="og:image" content={ogImg} />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_CLIENT_URI}/about`}
        />
        <meta property="og:type" content={`article`} />
      </Helmet>
      <main className=" mx-auto py-8 px-4 sm:px-9">
        {/* About us */}
        <section className="mb-12">
          <h1 className="text-4xl font-semibold mb-4">Get to know us better</h1>
          <p className="text-gray-700 sm:px-8">
            Our website is a valuable resource for students looking to ace their
            exams. We provide a vast collection of previous year question papers
            across different educational boards and universities. By accessing
            these papers, students can get a clear understanding of the exam
            pattern, important topics, and expected questions. This enables them
            to prepare better and perform well in their exams. Our user-friendly
            interface makes it easy to navigate and find relevant papers. Try us
            out and see the difference in your performance!
          </p>
        </section>

        {/* Team */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Team</h2>
          <div className="flex w-full justify-center sm:px-8 sm:justify-start gap-6">
            {/* Team members */}

            <div className="bg-white rounded-lg shadow-md w-[90%] sm:w-[250px] p-4">
              <img
                src="https://avatars.githubusercontent.com/u/107029078?v=4"
                alt="Team Member 1"
                className="mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold">Vaibhav Prajapat</h3>
              <p className="text-gray-600">Founder & Developer</p>
              <div className="flex">
                <a
                  href="https://www.linkedin.com/in/vaibhav-prajapat-52b773232/"
                  target="_blank"
                >
                  <AiFillLinkedin className="h-8 w-8 text-gray-800" />
                </a>
                <a
                  href="https://www.instagram.com/vaibhav_prajapat_7725/"
                  target="_blank"
                >
                  <AiOutlineInstagram className="h-8 w-8 text-gray-800" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Credits */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Credits</h2>
          <ul className="text-gray-700">
            <li className="list-disc mx-8">
              <span className="font-semibold">Components and Styles</span> -{' '}
              <a href="https://tailwindcss.com/">Tailwind CSS</a>
            </li>
            <li className="list-disc mx-8">
              <span className="font-semibold">Utility icons</span> -{' '}
              <a href="https://heroicons.com/">Hero icons</a>
            </li>
            <li className="list-disc mx-8">
              <span className="font-semibold">Social icons</span> -{' '}
              <a href="https://react-icons.github.io/react-icons/icons?name=fa">
                React icons
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default About;
