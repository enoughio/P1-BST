import Image from "next/image";
import BookPrebookingForm from "@/components/BookPrebookingForm";

const amazonUrl = "https://www.amazon.in/dp/B0HGR8NQ55";

const principles = [
  ["Attract, rather than force", "Influence begins with creating a reason to move, not applying pressure."],
  ["Build trust through consistency", "Small, dependable actions become the foundation for meaningful relationships."],
  ["Lead through character", "The way we show up teaches more powerfully than any instruction we give."],
  ["Adapt without abandoning purpose", "Like nature, we can change our approach while staying true to what matters."],
  ["Create room to flourish", "The best environments help people become more capable, confident, and alive."],
];

export default function BookPage() {
  return (
    <main className="book-page">
      <section className="book-hero">
        <div className="book-hero__texture" aria-hidden="true" />
        <div className="book-wrap book-hero__grid">
          <div className="book-copy">
            <p className="book-eyebrow">A new book by Pratap Verma</p>
            <h1>
              The Decoy <span>Principle</span>
            </h1>
            <p className="book-subtitle">
              Timeless nature secrets that will change the way you think, lead, and live.
            </p>
            <p className="book-intro">
              What if nature has already solved many of the problems we struggle with every day?
            </p>
            <p className="book-edition">Hardcover · ₹559 · Kindle edition · ₹296 · Pre-orders deliver 17 October 2026</p>
            <div className="book-actions">
              <a className="book-button" href={amazonUrl} target="_blank" rel="noreferrer">
                Find the book on Amazon <span aria-hidden="true">↗</span>
              </a>
              <a className="book-text-link" href="#the-story">Read the story behind it</a>
            </div>
          </div>

          <div className="book-cover-wrap">
            <div className="book-cover-shadow" aria-hidden="true" />
            <Image
              className="book-cover"
              src="/book-image.avif"
              alt="The Decoy Principle book cover by Pratap Verma"
              width={640}
              height={1024}
              priority
            />
            <p className="book-cover-note">Hardcover ₹559 · Kindle ₹296 · Pratap Verma</p>
          </div>    
        </div>
      </section>

      <section className="book-definition" id="what-is-a-decoy">
        <div className="book-wrap definition-grid">
          <div className="definition-heading">
            <p className="book-eyebrow book-eyebrow--dark">The idea behind the book</p>
            <h2>What is a decoy?</h2>
          </div>
          <div className="definition-copy">
            <p className="definition-lead">
              A decoy is something we deliberately place in the environment to attract attention. But what if a decoy could teach us how to live better?
            </p>
            <p>
              Inspired by the late mentor Shri R.P. Noronha, ICS, and his remarkable use of wooden decoys while photographing geese, Pratap Verma discovered a simple life lesson:
            </p>
            <blockquote>You don&apos;t always need more resources. You need a better perspective.</blockquote>
            <p>
              The Decoy Principle carries that insight from nature into leadership, education, relationships, careers, and everyday decisions.
            </p>
          </div>
        </div>
        <div className="book-wrap definition-takeaway">
          <p className="book-eyebrow book-eyebrow--dark">A practical approach to purposeful living</p>
          <h3>Stories of character, judgement, and doing more with less.</h3>
        </div>
      </section>

      <section className="book-story" id="the-story">
        <div className="book-wrap story-grid">
          <div>
            <p className="book-eyebrow book-eyebrow--dark">From observation to wisdom</p>
            <h2>A quiet lake. A few wooden geese. A lifetime of lessons.</h2>
          </div>
          <div className="story-body">
            <p>
              The Decoy Principle is a journey inspired by the lifelong mentorship of R.P. Noronha, remembered as “Ron Uncle”. What began beside a quiet lake became a powerful philosophy of leadership, trust, relationships, purpose, and human behaviour.
            </p>
            <p>
              Through stories of geese, rivers, trees, flowers, seasons, and everyday encounters, Pratap Verma reveals timeless principles that invite us to look beyond what we see and discover what it means.
            </p>
          </div>
        </div>
      </section>

      <section className="book-principles">
        <div className="book-wrap">
          <div className="principles-heading">
            <p className="book-eyebrow book-eyebrow--dark">Lessons from nature</p>
            <h2>Simple observations. Practical ways to live.</h2>
            <p>Each chapter turns a moment in nature into a reflection for everyday life.</p>
          </div>
          <div className="principles-grid">
            {principles.map(([title, description], index) => (
              <article className="principle" key={title}>
                <span className="principle-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="book-invitation">
        <div className="book-wrap invitation-inner">
          <p className="book-eyebrow">For anyone seeking a more purposeful life</p>
          <h2>Observe more deeply. Inspire rather than control.</h2>
          <p>
            Written for students, parents, teachers, leaders, entrepreneurs, administrators, and curious minds everywhere.
          </p>
          <a className="book-button book-button--light" href={amazonUrl} target="_blank" rel="noreferrer">
            Explore The Decoy Principle <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="book-prebooking" id="pre-book">
        <div className="book-wrap prebooking-grid">
          <div className="prebooking-copy">
            <p className="book-eyebrow book-eyebrow--dark">Reserve your copy</p>
            <h2>Be among the first to read it.</h2>
            <p>
              Send us your details and our team will follow up to confirm your pre-booking and delivery arrangements.
            </p>
            <p className="book-institutional-contact">
              Institutional / bulk orders: <a href="tel:+918871317382">+91 8871317382</a>
            </p>
            <div className="prebooking-summary">
              <div><span>Book</span><strong>The Decoy Principle</strong></div>
              <div><span>Hardcover</span><strong>₹549</strong></div>
              <div><span>Paperback</span><strong>449</strong></div>
              <div><span>Kindle</span><strong>₹296</strong></div>
              <div><span>Delivery</span><strong>₹40 extra</strong></div>
              <div><span>Release</span><strong>17 October 2026</strong></div>
            </div>
          </div>
          <BookPrebookingForm />
        </div>
      </section>
    </main>
  );
}

export const metadata = {
  title: "The Decoy Principle | Bharat Storytellers",
  description:
    "Discover The Decoy Principle by Bharat Storytellers board member Pratap Verma: timeless nature secrets for how we think, lead, and live.",
};
