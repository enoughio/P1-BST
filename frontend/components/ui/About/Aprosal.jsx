"use client"

// pages/index.js
import { storyTellingImage } from '@/lib/data/images';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from '../button';

export default function Aprosal() {
  return (
    <div>
      <Head>
        <title>Storytelling Community</title>
        <meta name="description" content="Join our storytelling community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-purple-50 py-8 md:py-12 md:px-4 min-h-[50vh] flex items-center justify-center">
        <div className="container max-w-6xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/2 h-64 md:h-auto relative">
               <Image 
              src={storyTellingImage}  
              alt="Teacher reading a book to children" 
              width={200} 
              height={200}
              
              className="w-full h-full object-cover bg-purple-400"
            />
            </div>
            
            {/* Content Section */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                Become Part of Our Storytelling Community!
              </h1>
              <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
              Ready to enhance your public speaking, share your stories, and connect with a supportive community? Join Bharat Storytellers today for exclusive workshops, events, and a platform to make your voice heard!              </p>
              <Button href='/member' className="bg-pink-200 text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-pink-300 transition duration-300 ease-in-out transform hover:-translate-y-1 self-start">
                BECOME A MEMBER
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}