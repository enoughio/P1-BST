// pages/programmes.js
import Head from "next/head";
import { BubbleCard } from "@/components/ui/BubbleCard";
import Link from "next/link";
import { cardData } from "@/lib/data/data";

 

export default function Programmes() {
  return (
    <>
      <Head>
        <title>Our Programmes | Bharat Storytellers</title>
        <meta
          name="description"
          content="Explore our programmes at Bharat Storytellers"
        />
      </Head>
      <main className="min-h-screen py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-1">Resources</h1>
          <p className="text-gray-700 max-w-3xl mx-auto font-xl font-medium">
            Explore our resources to help you improve your communication skills
            and become a better storyteller
          </p>
        </div>

        <div className=" w-[85%] mx-auto">
          {cardData.map((card) => (
            <Link href="/programmes/[type]" as={`/programmes/${card.type}`} key={card.id}>
              <BubbleCard
                key={card.id}
                cardSize="large" // "large" or "small"
                bubbleVariant="default" // "default", "small", or "normal"
                title={card.title}
                subHeading={card.subHeading}
                BubbleColor={card.BubbleColor}
                cardColor={card.cardColor}
                image={card.image}
                bold={true}
                className="mb-10 h-72"
                type="resources"
              />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
