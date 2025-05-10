import Head from 'next/head';
import ContactForm from '@/components/ui/contact/ContactForm';
import ContactInfo from '@/components/ui/contact/ContactInfo';
import ContactImage from '@/components/ui/contact/ContactImage'; 


export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | Bharat Storytellers</title>
        <meta name="description" content="Get in touch with Bharat Storytellers" />
      </Head>
      <main className="min-h-screen py-2 px-4 md:px-8 lg:px-16  ">
        <h1 className="text-4xl font-bold mb-2 flex items-center">
          <span className="w-1 h-12 bg-pink-300 mr-4 inline-block"></span>
          Contact Us
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop layout */}
          <div className="hidden lg:block lg:w-1/2 ">
            <ContactImage />
          </div>
          
          <div className="w-full  flex  flex-col md:flex-row justify-between border border-pink-200 rounded-lg p-6">

              <ContactForm />
              <ContactInfo />

          </div>
          
          {/* Mobile layout - image below form */}
          <div className="block lg:hidden w-full mt-8">
            <ContactImage />
          </div>
        </div>
      </main>
    </>
  );
}