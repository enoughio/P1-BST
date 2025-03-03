// pages/programmes.js
import Head from 'next/head';
import { BubbleCard } from '@/components/ui/BubbleCard';
import { learningImg, notesImg, podcastImg } from '@/lib/data/images';


const cardData = [

    {   
        id: 1,
        title:"Podacst",
        subHeading:"Live Expert Sessions at Bharat Storytellers",
        BubbleColor: { background: "rgba(92, 149, 255, 0.3)" },
        cardColor : { background: "rgba(92, 149, 255, 0.3)" },
        image:{podcastImg} // image path
    },
    {   
        id: 2,
        title:"Learning",
        subHeading:"Learning resources to improve your communication skills",
        BubbleColor: { background: "rgba(92, 149, 255, 0.3)" },
        cardColor : { background: "rgba(92, 149, 255, 0.3)" },
        image:{learningImg} // image path
    },
    {   
        id: 3,
        title:"Notes",
        subHeading:"Notes and resources to help you prepare for your next speech",
        BubbleColor: { background: "rgba(92, 149, 255, 0.3)" },
        cardColor : { background: "rgba(92, 149, 255, 0.3)" },
        image:{notesImg} // image path
    },
   
  ];



export default function Programmes() {
  return (
    <>
      <Head>
        <title>Our Programmes | Bharat Storytellers</title>
        <meta name="description" content="Explore our programmes at Bharat Storytellers" />
      </Head>
      <main className="min-h-screen py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Programmes</h1>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Whether you're an adult looking to build confidence or a young speaker
            eager to find your voice, our programs cater to all skill levels and age groups.
          </p>
        </div>
        
        <div className="space-y-6 w-[85%] mx-auto">


        {
            cardData.map((card) => (
                <BubbleCard 
                key={card.id}
                cardSize="large" // "large" or "small"
                bubbleVariant="default" // "default", "small", or "normal"
                title={card.title}
                subHeading={card.subHeading}
                BubbleColor={card.BubbleColor}
                cardColor={card.cardColor}
                image={card.image}
                />
            ))
        }

    </div>


      </main>
    </>
  );
}

