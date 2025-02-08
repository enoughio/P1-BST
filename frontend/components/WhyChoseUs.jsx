import Image from "next/image"
import { LuMoveUpRight } from "react-icons/lu";

const features = [
  {
    title: "Expert Instructors",
    description:
      "Est cupiditate ipsam aut nostrum unde At maiores nostrum ab eius odit est minima maxime. Qui odio voluptas et rerum sapiente eum voluptas praesentium et magnam iusto qui nihil natus aut perferendis maxime hic sunt galisum. Non veritatis laborum ex tempora nihil aut fugiat dolorem qui corporis fugit.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Expert Instructors",
    description:
      "Est cupiditate ipsam aut nostrum unde At maiores nostrum ab eius odit est minima maxime. Qui odio voluptas et rerum sapiente eum voluptas praesentium et magnam iusto qui nihil natus aut perferendis maxime hic sunt galisum. Non veritatis laborum ex tempora nihil aut fugiat dolorem qui corporis fugit.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Expert Instructors",
    description:
      "Est cupiditate ipsam aut nostrum unde At maiores nostrum ab eius odit est minima maxime. Qui odio voluptas et rerum sapiente eum voluptas praesentium et magnam iusto qui nihil natus aut perferendis maxime hic sunt galisum. Non veritatis laborum ex tempora nihil aut fugiat dolorem qui corporis fugit.",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export function WhyChooseUs() {
  return (
    <section className="relative pb-20 pt-16 w-full h-screen" >
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">Why Choose us?</h2>
          <p className="text-lg text-gray-600">Quo excepturi quos eum voluptas dicta ut enim deserunt</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative mb-6 h- overflow-hidden rounded-2xl">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="relative bg-[#F7EBEC] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <LuMoveUpRight className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-pink-50 to-transparent" />
    </section>
  )
}

