import { Button } from "../button";
import Link from "next/link";
import CoachingCarousel from "./WhyWedifferent";

// import { LuMoveUpRight } from "lucide-react"

const features = [
  {
    title: "Expert Coaches",
    description:
      "Learn for our expert coaches who have years of experience in public speaking",
    image: "/features/why2.jpeg",
  },
  {
    title: "Real-World Practice",
    description:
      "Practice in a safe environment with real audience and get feedback.",
    image: "/features/why3.jpeg",
  },
  {
    title: "Personilized Feedback",
    description:
      "We help you identify your strength and areas for improvements",
    image: "/features/why4.jpeg",
  },
];

// bg-[#F9F9F9]

export function WhyChooseUs() {
  return (
    <section className="mx-auto my-6 flex w-full flex-col gap-8 md:w-[93%]">
      <div className="relative overflow-hidden rounded-3xl border border-[#E7DCCF] bg-[#FAF6EF] px-6 py-10 shadow-sm sm:px-10">
        <div className="absolute -left-10 top-8 h-32 w-32 rounded-full bg-[#E8D8C6] blur-3xl opacity-70" />
        <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-[#C9DCF7] blur-3xl opacity-60" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Why Choose Us</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#1F1B16] sm:text-5xl font-serif">
              Speak with confidence, backed by coaching that sticks.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#5B4E44] sm:text-base">
              Level up your public speaking skills with expert coaching and real-world practice. We are
              here to help you turn your next presentation into a performance.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-[#1F1B16] text-white hover:bg-[#2A231D]">
                <Link href="/membership">
                  <span className="relative z-10">Register Now</span>
                  <span className="pointer-events-none absolute -right-3 -top-3 h-10 w-10 rounded-full bg-white/10" />
                  <span className="pointer-events-none absolute -bottom-4 right-6 h-12 w-12 rounded-full bg-white/10" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-[#1F1B16] text-[#1F1B16]">
                <Link href="/membership">View Membership</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-[#EFE4D6] bg-white/80 p-6 shadow-sm">
            <h2 className="text-sm uppercase tracking-[0.25em] text-[#8A6D4D]">Coaching Snapshot</h2>
            <div className="mt-4 space-y-3 text-sm text-[#5B4E44]">
              <p>Expert coaches who guide your voice, structure, and stage presence.</p>
              <p>Real-world practice with supportive feedback loops.</p>
              <p>Personalized pathways that adapt to your goals.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#E7DCCF] bg-white/80 p-6 shadow-sm">
        <CoachingCarousel />
      </div>
    </section>
  );
}
