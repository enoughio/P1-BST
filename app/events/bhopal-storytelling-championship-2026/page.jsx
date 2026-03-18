'use client'

import Link from "next/link"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

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

const highlights = [
  {
    title: "Mentorship First",
    copy: "Coaching that turns curious kids into confident narrators.",
    accent: "#FFD166",
  },
  {
    title: "Live Stages",
    copy: "Semi-finals and finale hosted in Bhopal with a live jury.",
    accent: "#8ECAE6",
  },
  {
    title: "Real Rewards",
    copy: "Cash prizes + certificates co-signed by ISTD.",
    accent: "#FB8500",
  },
  {
    title: "1000+ Voices",
    copy: "A city-wide platform for young storytellers.",
    accent: "#90BE6D",
  },
]

const pulseCards = [
  { label: "Creative Sparks", tone: "#FFD166" },
  { label: "Stage Confidence", tone: "#8ECAE6" },
  { label: "Story Craft", tone: "#90BE6D" },
]

// Split Text Helper for words
const SplitText = ({ children, className = "" }) => {
  return children.split(" ").map((word, i) => (
    <span key={i} className={`inline-block overflow-hidden pb-1 -mb-1 ${className}`}>
      <span className="hero-reveal-word inline-block translate-y-[120%] opacity-0 origin-bottom-left rotate-[10deg]">
        {word}
      </span>
      <span className="inline-block w-[0.25em]">&nbsp;</span>
    </span>
  ))
}

export default function BhopalStorytellingChampionshipPage() {
  const containerRef = useRef(null)
  const glowRef = useRef(null)

  useGSAP(() => {
    // 0. Mouse Follower Glow
    const glow = glowRef.current;
    if (glow && typeof window !== "undefined") {
      gsap.set(glow, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3" });

      const mouseMove = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener("mousemove", mouseMove);
    }

    // 1. Initial Hero Text Reveal
    gsap.to('.hero-reveal-word', {
      y: 0,
      opacity: 1,
      rotationZ: 0,
      stagger: 0.04,
      duration: 1,
      ease: 'back.out(1.5)',
      delay: 0.1
    });

    // 2. Hero highlight cards popping up
    gsap.fromTo('.hero-highlight-card',
        { y: 80, opacity: 0, autoAlpha: 0, rotation: () => gsap.utils.random(-8, 8) },
        { y: 0, opacity: 1, autoAlpha: 1, rotation: 0, stagger: 0.08, duration: 0.8, ease: 'back.out(1.2)', delay: 0.6, clearProps: 'transform' }
    );

    // 3. Orbs Parallax
    gsap.to('.hero-orb-1', {
      y: -150,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom start',
        scrub: true
      }
    });

    gsap.to('.hero-orb-2', {
      x: 100,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom start',
        scrub: true
      }
    });

    // 4. Section titles & blocks slide in
    const sections = gsap.utils.toArray('.scroll-fade-up');
    sections.forEach((section) => {
      gsap.from(section, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%'
        }
      });
    });

    // 5. Cheer Meter fill animation
    gsap.to('.cheer-meter-fill', {
      width: '80%',
      duration: 1.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.cheer-meter-container',
        start: 'top 80%'
      }
    });

    // 6. Pulse / Live momentum Bar scrub
    gsap.fromTo('.pulse-bar-fill', 
      { width: '15%' }, 
      { 
        width: '100%',
        scrollTrigger: {
          trigger: '.pulse-section',
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      }
    );

    // 7. Spotlight Cards entrance
    gsap.from('.spotlight-card', {
      scale: 0.8,
      rotation: () => gsap.utils.random(-15, 15),
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.spotlight-container',
        start: 'top 80%'
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen animated-bg text-[#0E1A1F]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="hero-orb-1 absolute -top-32 left-8 h-72 w-72 rounded-full bg-[#FFE7A3] blur-3xl opacity-80" />
          <div className="hero-orb-2 absolute right-10 top-24 h-64 w-64 rounded-full bg-[#BDE3F7] blur-3xl opacity-70" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#90BE6D] opacity-30 blur-2xl" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 to-transparent z-10" />
        </div>

        <div className="relative container mx-auto px-4 pt-20 pb-2 lg:pt-20 z-20">
          <p className="hero-reveal-word text-xs uppercase tracking-[0.35em] text-[#1C4E6E] font-bold">
            Bharat Storytellers Foundation
          </p>
          
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-serif max-w-4xl leading-[1.1]">
            <SplitText>Bhopal Storytelling</SplitText>
            <br className="hidden md:block" />
            <SplitText>Championship 2026</SplitText>
          </h1>
          
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-[#33454F] font-medium leading-relaxed">
            <SplitText>A city-wide celebration of young voices, stage</SplitText>
            <br className="hidden md:block" />
            <SplitText>confidence, and unforgettable stories.</SplitText>
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 md:gap-3">
            {[
              "Mentorship + Masterclasses",
              "1000+ young storytellers",
              "Grand Finale in Bhopal",
            ].map((item, index) => (
              <span
                key={item}
                className="hero-highlight-card rounded-full border-2 border-[#0E1A1F] bg-white/90 px-5 py-2.5 text-xs font-black uppercase tracking-[0.1em] text-[#0E1A1F] shadow-[0_4px_0_#0E1A1F] hover:-translate-y-1 hover:shadow-[0_8px_0_#0E1A1F] hover:bg-[#FFD166] transition-all duration-300 cursor-default"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 scroll-fade-up">
            <Link
              href="https://www.bharatstorytellers.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#FB8500] border-2 border-[#0E1A1F] px-8 py-3.5 text-sm font-black text-[#0E1A1F] shadow-[0_6px_0_#0E1A1F] transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_0_#0E1A1F] active:translate-y-2 active:scale-95 active:shadow-none uppercase tracking-wider relative z-20"
            >
              Register Now
            </Link>
            <Link
              href="/events"
              className="rounded-full bg-white border-2 border-[#0E1A1F] px-8 py-3.5 text-sm font-black text-[#0E1A1F] shadow-[0_6px_0_#0E1A1F] transition-all hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_0_#0E1A1F] active:translate-y-2 active:scale-95 active:shadow-none uppercase tracking-wider relative z-20"
            >
              Back to Events
            </Link>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.title} className="hero-highlight-card opacity-0 invisible" style={{ visibility: 'hidden' }}>
                <div
                  className="h-full rounded-[32px] border-4 border-[#0E1A1F] p-6 shadow-[0_12px_0_#0E1A1F] hover:-translate-y-4 hover:scale-[1.03] hover:shadow-[0_20px_0_#0E1A1F] transition-all duration-300 relative z-20 cursor-crosshair group"
                  style={{ backgroundColor: item.accent }}
                >
                  <p className="inline-block px-3 py-1 bg-white border-2 border-[#0E1A1F] rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#0E1A1F] group-hover:rotate-6 transition-transform duration-300">
                    Highlight
                  </p>
                  <p className="mt-5 text-xl font-black text-[#0E1A1F] tracking-tight">{item.title}</p>
                  <p className="mt-2 text-sm text-[#0E1A1F]/80 font-bold leading-relaxed">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 pt-4 md:pt-8 pulse-section">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-10">
            <div className="scroll-fade-up rounded-[40px] border-4 border-[#0E1A1F] bg-white p-8 md:p-10 shadow-[0_16px_0_#0E1A1F]">
              <p className="inline-block px-3 py-1 bg-[#E5F2F8] border-2 border-[#0E1A1F] rounded-full text-xs font-black uppercase tracking-[0.2em] text-[#0E1A1F]">
                About the Championship
              </p>
              <h2 className="mt-6 text-3xl font-black text-[#0E1A1F] leading-tight">
                A mentorship-first platform for young voices
              </h2>
              <div className="mt-6 space-y-5 text-lg font-medium text-[#33454F] leading-relaxed">
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

            <div className="spotlight-container grid gap-6 md:grid-cols-3">
              {pulseCards.map((item) => (
                <div
                  key={item.label}
                  className="spotlight-card group rounded-[32px] border-4 border-[#0E1A1F] p-6 shadow-[0_12px_0_#0E1A1F] hover:-translate-y-3 hover:rotate-3 hover:scale-105 hover:shadow-[0_20px_0_#0E1A1F] transition-all duration-300 relative z-20 cursor-pointer"
                  style={{ backgroundColor: item.tone }}
                >
                  <div className="w-12 h-12 bg-white border-4 border-[#0E1A1F] rounded-full flex items-center justify-center mb-4 group-hover:rotate-[360deg] transition-transform duration-[800ms]">
                    <div className="w-4 h-4 bg-[#0E1A1F] rounded-full animate-bounce" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0E1A1F] bg-white/50 inline-block px-2 py-1 rounded">Spotlight</p>
                  <p className="mt-3 text-xl font-black text-[#0E1A1F] leading-tight">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="scroll-fade-up rounded-[40px] border-4 border-[#0E1A1F] bg-white p-8 md:p-10 shadow-[0_16px_0_#0E1A1F]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1C4E6E]">Story Pulse</p>
                  <h3 className="mt-2 text-2xl font-black text-[#0E1A1F]">Confidence rises with every round</h3>
                </div>
                <div className="rounded-full border-2 border-[#0E1A1F] bg-[#FFD166] px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-[#0E1A1F]">
                  Live momentum
                </div>
              </div>
              <div className="mt-8 rounded-full border-4 border-[#0E1A1F] bg-white p-2 h-10 overflow-hidden relative">
                <div className="pulse-bar-fill h-full rounded-full bg-gradient-to-r from-[#0E1A1F] via-[#219EBC] to-[#FB8500] w-[15%]" />
              </div>
              <p className="mt-5 text-sm font-bold text-[#33454F]">
                Scroll to charge the meter. Each step builds stage courage and storytelling flow.
              </p>
            </div>

            <div className="scroll-fade-up rounded-[40px] border-4 border-[#0E1A1F] bg-[#90BE6D] p-8 md:p-10 shadow-[0_16px_0_#0E1A1F]">
              <h2 className="text-3xl font-black text-[#0E1A1F]">The 4-Phase Journey</h2>
              <div className="mt-8 grid gap-5">
                {phases.map((phase, index) => (
                  <div
                    key={phase.title}
                    className="group rounded-[24px] border-4 border-[#0E1A1F] bg-white p-6 shadow-[0_8px_0_#0E1A1F] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_16px_0_#0E1A1F] hover:bg-[#F6F2EA] transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <span className="inline-block bg-[#0E1A1F] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                          Step {index + 1}
                        </span>
                        <h3 className="text-xl font-black text-[#0E1A1F]">{phase.title}</h3>
                        <p className="mt-2 text-[#33454F] font-medium">{phase.description}</p>
                      </div>
                      <span className="shrink-0 rounded-full border-2 border-[#0E1A1F] bg-[#FFD166] px-4 py-2 text-xs font-black text-[#0E1A1F] text-center">
                        {phase.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="cheer-meter-container scroll-fade-up rounded-[32px] border-4 border-[#0E1A1F] bg-[#0E1A1F] p-8 text-white shadow-[8px_8px_0_#FFD166]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFD166]">Cheer Meter</p>
              <p className="mt-3 text-4xl font-black tracking-tight">80% Energy</p>
              <div className="mt-6 h-4 w-full rounded-full border-2 border-white/20 bg-white/10 overflow-hidden">
                <div className="cheer-meter-fill h-full rounded-full bg-[#FFD166] w-[10%]" />
              </div>
              <p className="mt-5 text-sm font-medium text-white/80">Confidence grows with every story shared.</p>
            </div>

            <div className="scroll-fade-up rounded-[32px] border-4 border-[#0E1A1F] bg-white p-8 shadow-[8px_8px_0_#8ECAE6]">
              <h3 className="text-2xl font-black text-[#0E1A1F] mb-6">Important Timeline</h3>
              <ul className="space-y-4">
                {timeline.map((item, i) => (
                  <li key={item.label} className="flex flex-col gap-2 pb-4 border-b-2 border-dashed border-[#0E1A1F]/10 last:border-0 last:pb-0 group hover:translate-x-2 transition-transform duration-300 cursor-default">
                    <span className="inline-block w-max rounded-full border-2 border-[#0E1A1F] bg-[#e1f1f8] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#0E1A1F] group-hover:bg-[#FFD166] transition-colors">
                      {item.date}
                    </span>
                    <span className="text-sm font-bold text-[#33454F] ml-1">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="scroll-fade-up rounded-[32px] border-4 border-[#0E1A1F] bg-[#FFE7A3] p-8 shadow-[8px_8px_0_#0E1A1F]">
              <h3 className="text-2xl font-black text-[#0E1A1F]">Contact Us</h3>
              <div className="mt-6 space-y-3 font-bold text-[#0E1A1F]">
                <p>Bharat Storytellers Foundation</p>
                <div className="h-0.5 w-full bg-[#0E1A1F]/20 rounded" />
                <p>Phone: +91 8871317382, 6268244196</p>
                <div className="h-0.5 w-full bg-[#0E1A1F]/20 rounded" />
                <p className="break-all">Email: bharatstorytellers@gmail.com</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="scroll-fade-up rounded-[40px] border-4 border-[#0E1A1F] bg-white p-8 md:p-10 shadow-[0_16px_0_#0E1A1F]">
            <h2 className="text-3xl font-black text-[#0E1A1F] mb-6">Participation Categories</h2>
            <div className="space-y-5">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="group rounded-[24px] border-4 border-[#0E1A1F] bg-[#F6F2EA] p-6 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_8px_0_#0E1A1F] hover:bg-white transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-white border-2 border-[#0E1A1F] rounded-md text-xs font-black uppercase tracking-wider group-hover:rotate-3 transition-transform">
                      {category.name}
                    </span>
                    <span className="text-lg font-black text-[#0E1A1F]">{category.age}</span>
                  </div>
                  <p className="text-sm font-bold text-[#33454F]">{category.focus}</p>
                </div>
              ))}
              <div className="mt-6 p-5 bg-[#FFD166] border-4 border-[#0E1A1F] rounded-[24px]">
                <p className="text-sm font-black text-[#0E1A1F]">
                  Fee: Rs 350 per student (includes workshop access, contest entry, and joint certification).
                </p>
              </div>
            </div>
          </div>

          <div className="scroll-fade-up rounded-[40px] border-4 border-[#0E1A1F] bg-[#ffffff] p-8 md:p-10 shadow-[0_16px_0_#0E1A1F]">
            <h2 className="text-3xl font-black text-[#0E1A1F]">Rewards & Recognition</h2>
            <div className="mt-8 bg-white border-4 border-[#0E1A1F] rounded-[24px] p-6">
              <p className="text-sm font-black uppercase tracking-wider text-[#1C4E6E] mb-4">Total Cash Prize Pool</p>
              <p className="text-4xl font-black text-[#0E1A1F]">Up to Rs 60,000</p>
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {rewards.map((reward) => (
                <li key={reward} className="flex items-center gap-3 bg-white/50 border-2 border-[#0E1A1F] p-3 rounded-xl font-bold text-[#0E1A1F] hover:bg-white hover:scale-[1.02] hover:shadow-[4px_4px_0_#0E1A1F] transition-all cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-[#FB8500] border-2 border-[#0E1A1F]" />
                  {reward}
                </li>
              ))}
            </ul>
            <div className="mt-6 bg-[#0E1A1F] text-white p-6 rounded-[24px] border-4 border-[#0E1A1F]">
              <p className="text-xs font-black uppercase tracking-wider text-[#FFD166] mb-2">Joint Certification</p>
              <p className="text-sm font-bold leading-relaxed">
                Every participant receives an official certificate from the Bharat Storytellers
                Foundation and ISTD recognizing their professional training.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="scroll-fade-up overflow-hidden rounded-[48px] border-4 border-[#0E1A1F] bg-white shadow-[0_20px_0_#0E1A1F] relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD166] blur-3xl rounded-full opacity-50 translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative p-8 md:p-16 grid gap-10 md:grid-cols-[1fr_250px] items-center">
            <div>
              <p className="inline-block px-4 py-1.5 bg-[#0E1A1F] text-white rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
                Special Incentive for Schools
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-[#0E1A1F] leading-[1.1] mb-6">
                Bring the masterclass to your campus
              </h2>
              <p className="text-xl font-medium text-[#33454F] max-w-2xl leading-relaxed">
                For schools with 100 or more participants, Bharat Storytellers Foundation will organize a special
                in-person storytelling workshop on the school campus for all registered students at no additional cost.
              </p>
            </div>
            
            <div className="flex justify-center md:justify-end">
              <div className="relative h-40 w-40 md:h-52 md:w-52">
                <div className="absolute inset-0 rounded-full border-4 border-[#0E1A1F] animate-[spin_10s_linear_infinite] border-t-[#FB8500] border-r-[#000000]" />
                <div className="absolute inset-4 rounded-full border-4 border-dashed border-[#0E1A1F] animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-10 rounded-full bg-[#90BE6D] border-4 border-[#0E1A1F] flex items-center justify-center animate-pulse">
                  <span className="font-black text-[#0E1A1F] text-2xl">FREE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="scroll-fade-up rounded-[40px] border-4 border-[#0E1A1F] bg-[#FFD166] p-8 md:p-10 shadow-[8px_8px_0_#0E1A1F]">
            <h2 className="text-3xl font-black text-[#0E1A1F] mb-6">Why Participate?</h2>
            <div className="grid gap-4">
              {[
                ["Overcome Stage Fright", "Build the confidence to speak before large audiences."],
                ["Master Public Speaking", "Learn to articulate ideas clearly and persuasively."],
                ["Enhance Creativity", "Develop original story arcs and character depth."],
                ["Professional Training", "Masterclasses usually reserved for corporate leaders."]
              ].map(([title, desc]) => (
                <div key={title} className="group bg-white border-4 border-[#0E1A1F] rounded-2xl p-5 hover:translate-x-3 hover:-translate-y-1 hover:shadow-[4px_4px_0_#0E1A1F] transition-all duration-300 cursor-pointer">
                  <h4 className="font-black text-[#0E1A1F] text-lg group-hover:text-[#FB8500] transition-colors">{title}</h4>
                  <p className="mt-1 text-sm font-bold text-[#33454F]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-fade-up space-y-8">
            <div className="rounded-[40px] border-4 border-[#0E1A1F] bg-white p-8 md:p-10 shadow-[8px_8px_0_#0E1A1F]">
              <h2 className="text-3xl font-black text-[#0E1A1F] mb-6">How to Register</h2>
              <ol className="space-y-4 font-bold text-[#33454F]">
                <li className="flex gap-4 items-start">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-[#0E1A1F] text-white flex items-center justify-center font-black">1</span>
                  <span className="pt-1">Visit: www.bharatstorytellers.com</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-[#0E1A1F] text-white flex items-center justify-center font-black">2</span>
                  <span className="pt-1">Fill details: Select category (Junior/Senior) and school.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-[#0E1A1F] text-white flex items-center justify-center font-black">3</span>
                  <span className="pt-1">Payment: Complete the Rs 350 registration fee.</span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-[#0E1A1F] text-white flex items-center justify-center font-black">4</span>
                  <span className="pt-1">Confirmation: Receive your workshop link and student kit via email.</span>
                </li>
              </ol>
            </div>

            <div className="rounded-[40px] border-4 border-[#0E1A1F] bg-[#F6F2EA] p-8 md:p-10 shadow-[8px_8px_0_#0E1A1F]">
              <h2 className="text-2xl font-black text-[#0E1A1F] mb-4">Quick Guidelines</h2>
              <ul className="space-y-2 text-sm font-bold text-[#33454F] list-disc pl-5">
                <li>Narrate in Hindi, English, or Hinglish.</li>
                <li>Audition story duration: 1-2 minutes.</li>
                <li>Age brackets apply as of April 1, 2026.</li>
                <li>Prizes subject to total registrations.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .animated-bg {
          background: linear-gradient(-45deg, #F6F2EA, #FFE7A3, #F6F2EA, #E5F2F8);
          background-size: 400% 400%;
          animation: gradientBG 20s ease infinite;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </div>
  )
}
