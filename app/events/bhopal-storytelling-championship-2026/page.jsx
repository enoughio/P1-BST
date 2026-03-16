import Link from "next/link"

const timeline = [
  { date: "March 31", label: "Last Date to Register" },
  { date: "April 3-4", label: "Online Storytelling Masterclass" },
  { date: "April 10", label: "Video Submission Deadline" },
  { date: "April 15", label: "Shortlist Announcement" },
  { date: "April 20-23", label: "Semi-Final Rounds (In-person)" },
  { date: "April 26", label: "Grand Finale" },
]

const phases = [
  {
    title: "Phase 1: Registration & The Masterclass",
    description: "Intensive online workshops covering story framework, storytelling, and public speaking essentials.",
    date: "Dates: 3rd & 4th April 2026.",
  },
  {
    title: "Phase 2: Digital Auditions",
    description: "Record and submit a short video of your story via our portal.",
    date: "Deadline: 10th April 2026.",
  },
  {
    title: "Phase 3: The Semi-Finals",
    description: "Top candidates perform live before a professional jury.",
    date: "Dates: 20th to 23rd April 2026.",
  },
  {
    title: "Phase 4: The Grand Finale",
    description: "The ultimate battle for the title on a grand stage in Bhopal.",
    date: "Date: Sunday, 26th April 2026.",
  },
]

const categories = [
  { name: "Junior", age: "6 to 10 Years", focus: "Expression, Imagination & Joy" },
  { name: "Senior", age: "11 to 15 Years", focus: "Impact, Structure & Stage Presence" },
]

const rewards = [
  "Winner: Up to Rs 15,000",
  "1st Runner-up: Up to Rs 10,000",
  "2nd Runner-up: Up to Rs 5,000",
]

export default function BhopalStorytellingChampionshipPage() {
  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#1F1B16]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-[#E8D8C6] blur-3xl opacity-70" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#F3E7D8] blur-3xl opacity-80" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/80 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-16 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">Bharat Storytellers Foundation</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl font-serif">
              Bhopal Storytelling Championship - 2026
            </h1>
            <p className="mt-3 text-lg text-[#5B4E44]">The Search for the City&apos;s Best Young Storyteller</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#6E5C4C]">
              <span className="rounded-full border border-[#E7DCCF] bg-white/80 px-4 py-2">
                Organized by: Bharat Storytellers Foundation
              </span>
              <span className="rounded-full border border-[#E7DCCF] bg-white/80 px-4 py-2">
                In association with: Indian Society for Training and Development (ISTD)
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="https://www.bharatstorytellers.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#1F1B16] px-6 py-3 text-sm font-medium text-white hover:bg-[#2A231D]"
              >
                Register Now
              </Link>
              <Link
                href="/events"
                className="rounded-full border border-[#1F1B16] px-6 py-3 text-sm font-medium text-[#1F1B16] hover:bg-[#1F1B16] hover:text-white"
              >
                Back to Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-10">
            <div className="rounded-3xl border border-[#E7DCCF] bg-white/90 p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8A6D4D]">About the Championship</p>
              <h2 className="mt-3 text-2xl font-semibold text-[#1F1B16]">
                A mentorship-first platform for young voices
              </h2>
              <div className="mt-4 space-y-4 text-[#5B4E44]">
                <p>
                  In a world dominated by screens, the Bharat Storytellers Foundation, in association with the Indian
                  Society for Training and Development, is bringing back the power of the spoken word. The Bhopal
                  Storytelling Championship 2026 is the city&apos;s largest platform for young voices, designed to transform
                  1,000+ imaginative students into confident, world-class narrators.
                </p>
                <p>
                  This is not just a contest. It is an end-to-end mentorship program where every child learns the
                  professional secrets of stage presence and narrative impact.
                </p>
                <p>
                  From online masterclasses to live semi-finals and a grand finale in Bhopal, every phase is crafted to
                  help young storytellers think clearly, speak boldly, and move audiences.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#E7DCCF] bg-white/90 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#1F1B16]">Why Your Child Should Participate</h2>
              <ul className="mt-5 space-y-3 text-[#5B4E44]">
                <li><strong>Overcome Stage Fright:</strong> Build the confidence to speak before large audiences.</li>
                <li><strong>Master Public Speaking:</strong> Learn to articulate ideas clearly and persuasively.</li>
                <li><strong>Enhance Creativity:</strong> Develop original story arcs and character depth.</li>
                <li><strong>Gain Professional Training:</strong> Access to masterclasses usually reserved for corporate leaders.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[#E7DCCF] bg-white/90 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#1F1B16]">The 4-Phase Journey</h2>
              <div className="mt-6 space-y-5">
                {phases.map((phase) => (
                  <div key={phase.title} className="rounded-2xl border border-[#EFE4D6] bg-white p-4">
                    <h3 className="text-lg font-semibold text-[#1F1B16]">{phase.title}</h3>
                    <p className="mt-2 text-sm text-[#5B4E44]">{phase.description}</p>
                    <p className="mt-2 text-sm font-medium text-[#8A6D4D]">{phase.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-[#E7DCCF] bg-white/90 p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#1F1B16]">Participation Categories</h2>
                <div className="mt-5 space-y-4 text-[#5B4E44]">
                  {categories.map((category) => (
                    <div key={category.name} className="rounded-2xl border border-[#EFE4D6] bg-white p-4">
                      <p className="text-sm uppercase tracking-[0.2em] text-[#8A6D4D]">{category.name}</p>
                      <p className="mt-2 font-semibold text-[#1F1B16]">{category.age}</p>
                      <p className="text-sm text-[#5B4E44]">{category.focus}</p>
                    </div>
                  ))}
                  <p className="text-sm text-[#5B4E44]">
                    Participation Fee: Rs 350 per student (includes full workshop access, contest entry, and joint
                    certification).
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-[#E7DCCF] bg-white/90 p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#1F1B16]">Rewards & Recognition</h2>
                <p className="mt-4 text-sm text-[#5B4E44]">Total Cash Prize Pool: Up to Rs 60,000</p>
                <ul className="mt-4 space-y-3 text-[#5B4E44]">
                  {rewards.map((reward) => (
                    <li key={reward}>{reward}</li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-[#5B4E44]">
                  Joint Certification: Every participant receives an official certificate from the Bharat Storytellers
                  Foundation and ISTD recognizing their professional training.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#E7DCCF] bg-white/90 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#1F1B16]">Special Incentive for Schools</h2>
              <p className="mt-4 text-[#5B4E44]">
                Bring the masterclass to your campus. For schools with 100 or more participants, Bharat Storytellers
                Foundation will organize a special in-person storytelling workshop on the school campus for all
                registered students at no additional cost.
              </p>
            </div>

            <div className="rounded-3xl border border-[#E7DCCF] bg-white/90 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#1F1B16]">Rules & Guidelines</h2>
              <ul className="mt-5 space-y-3 text-[#5B4E44]">
                <li>The story can be narrated in Hindi, English, or Hinglish.</li>
                <li>Story duration for auditions: 1-2 minutes.</li>
                <li>Participants must be within the specified age brackets as of April 1, 2026.</li>
                <li>
                  Cash prizes are subject to the total number of registrations. The foundation reserves the right to
                  adjust prize amounts proportionately.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[#E7DCCF] bg-white/90 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[#1F1B16]">How to Register</h2>
              <ol className="mt-5 list-decimal space-y-3 pl-6 text-[#5B4E44]">
                <li>Visit: www.bharatstorytellers.com</li>
                <li>Fill details: Select category (Junior/Senior) and school.</li>
                <li>Payment: Complete the Rs 350 registration fee.</li>
                <li>Confirmation: Receive your workshop link and student kit via email.</li>
              </ol>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-[#E7DCCF] bg-white/90 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#1F1B16]">Important Timeline: 2026</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#5B4E44]">
                {timeline.map((item) => (
                  <li key={item.label} className="flex items-center justify-between gap-4">
                    <span className="font-medium text-[#8A6D4D]">{item.date}</span>
                    <span className="text-right">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-[#E7DCCF] bg-white/90 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#1F1B16]">Contact Us</h3>
              <p className="mt-4 text-sm text-[#5B4E44]">Bharat Storytellers Foundation</p>
              <p className="mt-2 text-sm text-[#5B4E44]">Phone: +91 8871317382, 6268244196</p>
              <p className="mt-2 text-sm text-[#5B4E44]">Email: bharatstorytellers@gmail.com</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
