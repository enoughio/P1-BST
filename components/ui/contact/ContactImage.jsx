// components/ContactImage.js
import { contactUs } from '@/lib/data/images';
import Image from 'next/image';

export default function ContactImage() {
  return (
    <div className="bg-blue-100 rounded-lg overflow-hidden relative  h-full max-w-[450px]">
      <Image
        src={contactUs}
        alt="Customer Support Representative"
        fill
        className='object-cover rounded-sm'
        priority
      />
    </div>
  );
}