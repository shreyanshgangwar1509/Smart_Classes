import Navbar from '@/components/Navbar';
import pic1 from '@/image/pic1.webp';

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${pic1.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar />
      <div className="flex-grow flex flex-col justify-end items-center mb-10">
        <h1 className='text-center text-white text-4xl font-extrabold transition-transform duration-300 hover:scale-105 hover:text-gray-300 text-shadow'>
          Education is the most powerful weapon which you can use to change the world.
          <br />
          <span className='text-2xl font-light'>
            — Nelson Mandela
          </span>
        </h1>
        <p className='text-center mt-4 text-gray-200 text-xl font-semibold'>
          Keep pushing forward, and remember that every bit of knowledge you gain has the potential to make a difference!
        </p>
      </div>
    </div>
  );
}
