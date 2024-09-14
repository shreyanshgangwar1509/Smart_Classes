'use client'
import pic1 from '@/image/picsmart.webp'
function page() {
  return (
      <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{ backgroundImage: `url(${pic1.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>page</div>
  )
}

export default page