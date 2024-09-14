import Navbar from '@/components/Navbar';
import pic1 from '@/image/pic1.webp';
export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundImage: `url(${pic1.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Navbar />
      
    </div>
  );
}
