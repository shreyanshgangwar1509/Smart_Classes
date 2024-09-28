import Chatbot from '@/components/Chatbot';
import Navbar from '@/components/Navbar';
import AnalyticsDashboard from './(app)/AnalyticsDashboeard/page';

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      // style={{
      //   backgroundImage: `url(${pic1.src})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      // }}
    >
      <Navbar />

      {/* Main content area */}
      <div className="flex-grow flex flex-col justify-end items-center mb-10">
        {/* Analytics Dashboard with fade-in effect */}
        <div data-aos="fade-up" className="w-full max-w-6xl">
          <AnalyticsDashboard />
        </div>

        {/* Interactive Quote */}
        <h1 className="text-center text-white text-4xl font-extrabold transition-transform duration-300 hover:scale-105 hover:text-gray-300 text-shadow">
          Education is the most powerful weapon which you can use to change the world.
          <br />
          <span className="text-2xl font-light">— Nelson Mandela</span>
        </h1>

        {/* Inspirational Message */}
        <p className="text-center mt-4 text-gray-200 text-xl font-semibold">
          Keep pushing forward, and remember that every bit of knowledge you gain has the potential to make a difference!
        </p>

        {/* Chatbot with fade-in effect */}
        <div data-aos="fade-up" className="w-full max-w-3xl mt-10">
          <Chatbot />
        </div>

        {/* Button with hover animation */}
        <button className="mt-8 px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-400 transition duration-300 transform hover:scale-105">
          Explore More
        </button>
      </div>
    </div>
  );
}
