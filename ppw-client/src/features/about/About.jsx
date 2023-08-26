import { AiFillLinkedin } from 'react-icons/ai';
const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <main className=" mx-auto py-8 px-4 sm:px-9">
        {/* Our Mission */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">About us</h2>
          <p className="text-gray-700">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Team members */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src="https://avatars.githubusercontent.com/u/107029078?v=4"
                alt="Team Member 1"
                className="mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold">Vaibhav Prajapat</h3>
              <p className="text-gray-600">Founder & Developer</p>
              <a
                href="https://www.linkedin.com/in/vaibhav-prajapat-52b773232/"
                target="_blank"
              >
                <AiFillLinkedin className="h-8 w-8 text-gray-800" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2023 Previous Papers. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
