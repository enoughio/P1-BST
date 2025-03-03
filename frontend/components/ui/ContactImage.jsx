// components/ContactImage.js
import { contactUs } from '@/lib/data/images';
import Image from 'next/image';

export default function ContactImage() {
  return (
    <div className="bg-blue-100 rounded-lg overflow-hidden relative max-h-[500px] h-full max-w-[450px]">
      <Image
        src={contactUs}
        alt="Customer Support Representative"
        fill
        objectFit="cover"
        className="object-center"
        priority
      />
    </div>
  );
}