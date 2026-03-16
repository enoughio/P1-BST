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
    <section className="mx-auto my-8 flex w-full flex-col gap-8 md:w-[93%]">
      <div className="relative overflow-hidden rounded-[36px] border border-[#E7DCCF] bg-[#FBF4EA] px-6 py-12 shadow-sm sm:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(232,216,198,0.8),transparent_55%),radial-gradient(circle_at_85%_0%,rgba(201,220,247,0.6),transparent_50%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#8A6D4D]">Why Choose Us</p>
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
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/70 bg-white/80 p-4 text-sm text-[#5B4E44] shadow-sm"
                >
                  <h3 className="text-base font-semibold tracking-tight text-[#1F1B16]">{feature.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-[#EFE4D6] bg-white/80 p-6 shadow-sm">
              <h2 className="text-sm uppercase tracking-[0.25em] text-[#8A6D4D]">Coaching Snapshot</h2>
              <div className="mt-4 space-y-3 text-sm text-[#5B4E44]">
                <p>Expert coaches who guide your voice, structure, and stage presence.</p>
                <p>Real-world practice with supportive feedback loops.</p>
                <p>Personalized pathways that adapt to your goals.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#EFE4D6] bg-white/90 p-6 shadow-sm">
              <h2 className="text-sm uppercase tracking-[0.25em] text-[#8A6D4D]">What You Get</h2>
              <ul className="mt-4 space-y-3 text-sm text-[#5B4E44]">
                <li>Weekly practice circles with guided feedback.</li>
                <li>Story craft frameworks you can reuse anywhere.</li>
                <li>Club community for ongoing accountability.</li>
              </ul>
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
