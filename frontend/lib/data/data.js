import { BISF, learningImg, notesImg, podcastImg } from "@/lib/data/images";

const people = [
  {
    id: 1,
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg',
    name: 'maria ferguson',
    title: 'office manager',
    quote:
      'Fingerstache umami squid, kinfolk subway tile selvage tumblr man braid viral kombucha gentrify fanny pack raclette pok pok mustache.',
  },
  {
    id: 2,
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',
    name: 'john doe',
    title: 'regular guy',
    quote:
      'Gastropub sustainable tousled prism occupy. Viral XOXO roof party brunch actually, chambray listicle microdosing put a bird on it paleo subway tile squid umami.',
  },
  {
    id: 3,
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959121/person-1_aufeoq.jpg',
    name: 'peter smith',
    title: 'product designer',
    quote:
      'Drinking vinegar polaroid street art echo park, actually semiotics next level butcher master cleanse hammock flexitarian ethical paleo.',
  },
  {
    id: 4,
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg',
    name: 'susan andersen',
    title: 'the boss',
    quote:
      'Marfa af yr 3 wolf moon kogi, readymade distillery asymmetrical seitan kale chips fingerstache cloud bread mustache twee messenger bag. ',
  },
];

export default people;

// feq questions data
export const faq = [
  { id: 1, question: "Who Can Join Bharat Storytellers ?", answer: "Bharat Storytellers is open to all who are interested in improving their communication skills and becoming better storytellers. We welcome people from all walks of life, including students, professionals, and homemakers." },
  { id: 2, question: "What are the benefits of joining Bharat Storytellers ?", answer: "Bharat Storytellers offers a range of benefits, including access to expert-led workshops, resources to improve your communication skills, and opportunities to practice and receive feedback on your storytelling abilities. Members also have the chance to participate in storytelling events and competitions." },
  { id: 3, question: "How often do meetings or sessions take place?", ansers: "There are generally 1-2 offline meetings weekly, which last for 2-3 hours and other then that we can also have 1 online learnig session every week." },
  { id: 4, question: "How can I join Bharat Storytellers ?", answer: "To join Bharat Storytellers, simply fill out the inquary form for your respective club on our website. Once we verify that you will recive an email for the club leader for the membership, the membership registartion process is done on at the club office." },
  { id: 5, question: "Can I attend a session before becoming a member?", answer: "Yes, you can attend one session as a guest before deciding to become a member. This will give you a chance to experience what Bharat Storytellers has to offer and decide if it is right for you." },
]

// card data for resources page 
export const cardData = [
  {
    id: 1,
    title: "Podacst",
    subHeading: "Live Expert Sessions at Bharat Storytellers",
    BubbleColor: { background: "rgba(92, 149, 255, 0.3)" },
    cardColor: { background: "rgba(92, 149, 255, 0.3)" },
    image: podcastImg, // image path
    type: "podcast"
  },
  {
    id: 2,
    title: "Learning",
    subHeading: "Learning resources to improve your communication skills",
    BubbleColor: { background: "rgba(193, 18, 31, .1)" },
    cardColor: { background: "rgba(193, 18, 31, .1)" },
    image: learningImg, // image path
    type: "learning"
  },
  {
    id: 3,
    title: "Notes & PDFs",
    subHeading: "Notes and resources to help you prepare for your next speech",
    BubbleColor: { background: "rgba(92, 149, 255, 0.3)" },
    cardColor: { background: "rgba(92, 149, 255, 0.3)" },
    image: notesImg, // image path
    type: "notes"
  },
];

// Sample club data
export const clubsData = [
  {
    id: 1,
    name: "Bhopal Storytellers",
    address: `First Floor, Bharat Storytellers, B-66, near Chetak Bridge, Housing Board Colony, Kasturba Nagar, Bhopal, Madhya Pradesh 462022`,
    city: "Bhopal ",
    meetingTime: "Tuesdays, 6:30 PM",
    position:  [23.2339, 77.4401],   // it accetps the loaction in DD format not in DMS  
    dmsPosition: "40°42'46.08\"N, 74°00'21.6\"W",
    members: 32,
    image: "",
    description: "Downtown Speakers is a friendly and supportive club that helps members improve their public speaking and leadership skills. We meet every Tuesday at 6:30 PM at 123 Main St, New York, NY. Join us to practice your speaking skills, receive feedback, and connect with other members.",
    Admin: "John Doe",
    email: "jhondoe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Golden Gate ",
    address: "456 Market St, San Francisco, CA",
    city: "San Francisco",
    meetingTime: "Wednesdays, 7:00 PM",
    position: [37.7749, -122.4194],
    dmsPosition: "37°46'29.64\"N, 122°25'09.84\"W",
    members: 45,
    image: "",
    description: "Golden Gate is a dynamic club dedicated to helping members enhance their communication and leadership skills in a supportive environment.",
    Admin: "Sarah Lee",
    email: "sarah.lee@example.com",
    phone: "234-567-8901",
  },
  {
    id: 3,
    name: "Windy City Speakers",
    address: "789 Michigan Ave, Chicago, IL",
    city: "Chicago",
    meetingTime: "Mondays, 6:00 PM",
    position: [41.8781, -87.6298],
    dmsPosition: "41°52'41.16\"N, 87°37'47.28\"W",
    members: 28,
    image: "",
    description: "Windy City Speakers is a vibrant community that fosters personal and professional growth through public speaking and networking.",
    Admin: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "345-678-9012",
  },
  {
    id: 4,
    name: "Hollywood Speakers Club",
    address: "101 Hollywood Blvd, Los Angeles, CA",
    city: "Los Angeles",
    meetingTime: "Thursdays, 7:30 PM",
    position: [34.0522, -118.2437],
    dmsPosition: "34°03'07.92\"N, 118°14'37.32\"W",
    members: 50,
    image: "",
    description: "Hollywood Speakers Club provides a space for aspiring speakers and professionals to refine their public speaking skills with expert guidance.",
    Admin: "Emma Watson",
    email: "emma.w@example.com",
    phone: "456-789-0123",
  },
  {
    id: 5,
    name: "Emerald City Orators",
    address: "202 Pike St, Seattle, WA",
    city: "Seattle",
    meetingTime: "Tuesdays, 5:30 PM",
    position: [47.6062, -122.3321],
    dmsPosition: "47°36'22.32\"N, 122°19'55.56\"W",
    members: 35,
    image: "",
    description: "Emerald City Orators is dedicated to helping members become effective communicators through interactive workshops and coaching.",
    Admin: "Olivia Brown",
    email: "olivia.b@example.com",
    phone: "567-890-1234",
  },
  {
    id: 6,
    name: "Lone Star Speakers",
    address: "303 Congress Ave, Austin, TX",
    city: "Austin",
    meetingTime: "Wednesdays, 6:00 PM",
    position: [30.2672, -97.7431],
    dmsPosition: "30°16'01.92\"N, 97°44'35.16\"W",
    members: 40,
    image: "",
    description: "Lone Star Speakers is a welcoming group that encourages members to develop confidence and leadership through public speaking.",
    Admin: "William Davis",
    email: "william.d@example.com",
    phone: "678-901-2345",
  },
  {
    id: 7,
    name: "Mile High Toastmasters",
    address: "404 16th St Mall, Denver, CO",
    city: "Denver",
    meetingTime: "Thursdays, 12:00 PM",
    position: [39.7392, -104.9903],
    dmsPosition: "39°44'21.12\"N, 104°59'25.08\"W",
    members: 25,
    image: "",
    description: "Mile High Toastmasters helps members achieve their communication goals while fostering a fun and engaging learning environment.",
    Admin: "James Wilson",
    email: "james.w@example.com",
    phone: "789-012-3456",
  },
  {
    id: 8,
    name: "Magic City Speakers",
    address: "505 Ocean Dr, Miami, FL",
    city: "Miami",
    meetingTime: "Mondays, 7:00 PM",
    position: [25.7617, -80.1918],
    dmsPosition: "25°45'42.12\"N, 80°11'30.48\"W",
    members: 38,
    image: "",
    description: "Magic City Speakers is a vibrant club that focuses on storytelling and communication skills to help members succeed in various fields.",
    Admin: "Sophia Martinez",
    email: "sophia.m@example.com",
    phone: "890-123-4567",
  },
];

export const benefits = [
  {
    icon: '👩‍💼', // You could replace with actual image imports or SVG components
    title: 'Boost confidence',
    description: 'Gain the self-assurance to speak in any situation'
  },
  {
    icon: '📈',
    title: 'Advance your career',
    description: 'Open new opportunities through powerful presentations'
  },
  {
    icon: '🤝',
    title: 'Improve networking skills',
    description: 'Build connections through effective communication'
  },
  {
    icon: '🎤',
    title: 'Deliver impactful speeches',
    description: 'Inspire and influence your audience with confidence'
  }
];

// This file simulates data that would come from a backend API
import { format, addDays, subDays } from "date-fns"

// Current date for comparison
const currentDate = new Date()

// Helper to format dates consistently
const formatDate = (date) => format(date, "MMMM d, yyyy")
const formatTime = (date) => format(date, "h:mm a")

// Generate event dates relative to current date
const upcomingDate1 = addDays(currentDate, 15)
const upcomingDate2 = addDays(currentDate, 30)
const upcomingDate3 = addDays(currentDate, 45)
const presentDate1 = addDays(currentDate, 2)
const presentDate2 = addDays(currentDate, 5)
const pastDate1 = subDays(currentDate, 30)
const pastDate2 = subDays(currentDate, 60)
const pastDate3 = subDays(currentDate, 90)

export const events = [
  {
    id: "1",
    title: "Bhopal International Storytelling Fest",
    slug: "BISF",
    description:
      "Join us for an evening of captivating stories that bridge cultures and generations. Our expert storytellers will take you on a journey through time and tradition.",
    date: upcomingDate1,
    formattedDate: formatDate(upcomingDate1),
    time: `${formatTime(upcomingDate1)} - ${formatTime(new Date(upcomingDate1.setHours(upcomingDate1.getHours() + 3)))}`,
    location: "Cultural Center, New Delhi",
    image: BISF,
    highlighted: true,
    content: [
      {
        type: "heading",
        content: "About the Event",
      },
      {
        type: "paragraph",
        content:
          "The Art of Storytelling is a premier event that brings together master storytellers from across India. This immersive experience will transport you through the rich tapestry of Indian folklore, mythology, and contemporary narratives.",
      },
      {
        type: "image",
        src: BISF,
        alt: "Storytelling session",
      },
      {
        type: "heading",
        content: "Featured Storytellers",
      },
      {
        type: "paragraph",
        content:
          "Our event features renowned storytellers who have dedicated their lives to preserving and evolving the ancient art of storytelling. Each brings their unique style and cultural perspective to create an unforgettable experience.",
      },
      {
        type: "quote",
        content:
          "Stories are the creative conversion of life itself into a more powerful, clearer, more meaningful experience.",
        author: "Robert McKee",
      },
      {
        type: "heading",
        content: "What to Expect",
      },
      {
        type: "list",
        items: [
          "Interactive storytelling sessions",
          "Cultural performances",
          "Networking with fellow story enthusiasts",
          "Refreshments inspired by the stories being told",
          "A commemorative booklet of featured stories",
        ],
      },
    ],
    speakers: [
      {
        id: "s1",
        name: "Anita Sharma",
        bio: "Award-winning storyteller specializing in folk tales from Northern India with over 15 years of experience performing internationally.",
        image: "/placeholder.svg?height=200&width=200&text=Anita",
        role: "Master Storyteller",
      },
      {
        id: "s2",
        name: "Rajesh Kumar",
        bio: "Author and oral historian documenting tribal narratives from central India, with a focus on preserving endangered cultural stories.",
        image: "/placeholder.svg?height=200&width=200&text=Rajesh",
        role: "Cultural Historian",
      },
      {
        id: "s3",
        name: "Priya Nair",
        bio: "Performance artist blending traditional stories with modern themes, creating innovative narrative experiences for contemporary audiences.",
        image: "/placeholder.svg?height=200&width=200&text=Priya",
        role: "Performance Artist",
      },
    ],
    attendees: 120,
    maxCapacity: 200,
    ticketPrice: "₹500-1500",
    categories: ["Cultural", "Performance", "Educational"],
  },
  {
    id: "2",
    title: "Digital Storytelling Workshop",
    slug: "digital-storytelling-workshop",
    description:
      "Learn how to craft compelling digital narratives using modern tools and techniques. This hands-on workshop will equip you with skills to tell your stories across digital platforms.",
    date: presentDate1,
    formattedDate: formatDate(presentDate1),
    time: `${formatTime(presentDate1)} - ${formatTime(new Date(presentDate1.setHours(presentDate1.getHours() + 6)))}`,
    location: "Tech Hub, Bangalore",
    image: "/placeholder.svg?height=600&width=1200&text=Digital+Workshop",
    highlighted: true,
    content: [
      {
        type: "heading",
        content: "Workshop Overview",
      },
      {
        type: "paragraph",
        content:
          "The Digital Storytelling Workshop is designed for content creators, marketers, and storytellers who want to leverage digital platforms effectively. You'll learn practical techniques for creating engaging narratives across various digital formats.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800&text=Workshop+Session",
        alt: "Workshop session",
      },
      {
        type: "heading",
        content: "What You'll Learn",
      },
      {
        type: "list",
        items: [
          "Fundamentals of digital narrative structure",
          "Visual storytelling techniques for social media",
          "Interactive storytelling for web platforms",
          "Audio storytelling for podcasts and voice platforms",
          "Data-driven storytelling for business communications",
        ],
      },
      {
        type: "quote",
        content: "In the digital age, everyone has the tools to tell their story. What matters is how you use them.",
        author: "Vikram Seth",
      },
    ],
    speakers: [
      {
        id: "s4",
        name: "Arjun Mehta",
        bio: "Digital content strategist with experience working with major brands on storytelling campaigns across platforms.",
        image: "/placeholder.svg?height=200&width=200&text=Arjun",
        role: "Digital Strategist",
      },
      {
        id: "s5",
        name: "Sonia Desai",
        bio: "Award-winning filmmaker specializing in short-form digital content for emerging platforms.",
        image: "/placeholder.svg?height=200&width=200&text=Sonia",
        role: "Digital Filmmaker",
      },
    ],
    attendees: 45,
    maxCapacity: 50,
    ticketPrice: "₹2000",
    categories: ["Workshop", "Digital", "Professional Development"],
  },
  {
    id: "3",
    title: "Mythological Tales: Epic Storytelling",
    slug: "mythological-tales",
    description:
      "Experience the grandeur of Indian mythology through immersive storytelling. This event brings ancient epics to life through traditional and contemporary narrative techniques.",
    date: upcomingDate2,
    formattedDate: formatDate(upcomingDate2),
    time: `${formatTime(upcomingDate2)} - ${formatTime(new Date(upcomingDate2.setHours(upcomingDate2.getHours() + 4)))}`,
    location: "Heritage Hall, Mumbai",
    image: "/placeholder.svg?height=600&width=1200&text=Mythology+Event",
    highlighted: true,
    content: [
      {
        type: "heading",
        content: "Epic Narratives",
      },
      {
        type: "paragraph",
        content:
          "Mythological Tales is a special event dedicated to the rich tradition of epic storytelling in Indian culture. From the Mahabharata to the Ramayana, these stories have shaped our understanding of morality, duty, and human relationships for millennia.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800&text=Epic+Performance",
        alt: "Epic performance",
      },
      {
        type: "paragraph",
        content:
          "Our storytellers will present these ancient tales with a fresh perspective, highlighting their relevance to contemporary life while honoring their traditional significance.",
      },
    ],
    speakers: [
      {
        id: "s6",
        name: "Dr. Lakshmi Iyer",
        bio: "Scholar of Sanskrit literature and mythology with 25 years of experience in translating and interpreting ancient texts.",
        image: "/placeholder.svg?height=200&width=200&text=Lakshmi",
        role: "Mythology Scholar",
      },
      {
        id: "s7",
        name: "Karan Singhania",
        bio: "Performance artist specializing in contemporary interpretations of mythological narratives through movement and voice.",
        image: "/placeholder.svg?height=200&width=200&text=Karan",
        role: "Performance Artist",
      },
    ],
    attendees: 0,
    maxCapacity: 300,
    ticketPrice: "₹750",
    categories: ["Cultural", "Mythology", "Performance"],
  },
  {
    id: "4",
    title: "Corporate Storytelling Masterclass",
    slug: "corporate-storytelling",
    description:
      "Learn how to use storytelling techniques to enhance your business communications, marketing, and leadership presence.",
    date: presentDate2,
    formattedDate: formatDate(presentDate2),
    time: `${formatTime(presentDate2)} - ${formatTime(new Date(presentDate2.setHours(presentDate2.getHours() + 8)))}`,
    location: "Business Center, Gurgaon",
    image: "/placeholder.svg?height=600&width=1200&text=Corporate+Masterclass",
    highlighted: false,
    content: [
      {
        type: "heading",
        content: "Business Narratives",
      },
      {
        type: "paragraph",
        content:
          "The Corporate Storytelling Masterclass is designed for business professionals who want to leverage the power of narrative to enhance their communications, presentations, and leadership presence.",
      },
      {
        type: "heading",
        content: "Key Topics",
      },
      {
        type: "list",
        items: [
          "Brand storytelling for authentic marketing",
          "Leadership narratives that inspire teams",
          "Data storytelling for impactful presentations",
          "Customer journey mapping through narrative",
          "Crisis communication through strategic storytelling",
        ],
      },
    ],
    speakers: [
      {
        id: "s8",
        name: "Vikram Malhotra",
        bio: "Former CMO with expertise in brand storytelling and narrative marketing strategies for Fortune 500 companies.",
        image: "/placeholder.svg?height=200&width=200&text=Vikram",
        role: "Brand Strategist",
      },
    ],
    attendees: 35,
    maxCapacity: 40,
    ticketPrice: "₹5000",
    categories: ["Professional", "Business", "Masterclass"],
  },
  {
    id: "5",
    title: "Children's Storytelling Festival",
    slug: "childrens-festival",
    description:
      "A magical day of storytelling designed especially for young audiences, featuring interactive performances, workshops, and activities.",
    date: upcomingDate3,
    formattedDate: formatDate(upcomingDate3),
    time: `${formatTime(upcomingDate3)} - ${formatTime(new Date(upcomingDate3.setHours(upcomingDate3.getHours() + 6)))}`,
    location: "Children's Park, Chennai",
    image: "/placeholder.svg?height=600&width=1200&text=Children's+Festival",
    highlighted: false,
    content: [
      {
        type: "heading",
        content: "A Day of Wonder",
      },
      {
        type: "paragraph",
        content:
          "The Children's Storytelling Festival creates a magical world where stories come alive through interactive performances, puppet shows, and creative activities. This family-friendly event is designed to spark imagination and foster a love of reading and storytelling in children of all ages.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800&text=Children's+Activities",
        alt: "Children's activities",
      },
      {
        type: "heading",
        content: "Festival Activities",
      },
      {
        type: "list",
        items: [
          "Interactive storytelling sessions",
          "Character meet-and-greets",
          "Puppet making workshops",
          "Story illustration stations",
          "Book exchange corner",
          "Parent-child storytelling workshops",
        ],
      },
    ],
    speakers: [
      {
        id: "s9",
        name: "Maya Krishnan",
        bio: "Children's book author and puppeteer specializing in interactive storytelling for young audiences.",
        image: "/placeholder.svg?height=200&width=200&text=Maya",
        role: "Children's Author",
      },
      {
        id: "s10",
        name: "Ravi Patel",
        bio: "Illustrator and storyteller who creates live drawings during narrative performances.",
        image: "/placeholder.svg?height=200&width=200&text=Ravi",
        role: "Illustrator",
      },
    ],
    attendees: 0,
    maxCapacity: 200,
    ticketPrice: "₹300 (Children), ₹500 (Adults)",
    categories: ["Children", "Family", "Festival"],
  },
  {
    id: "6",
    title: "Oral History Project: Partition Stories",
    slug: "partition-stories",
    description:
      "A powerful evening of personal narratives from families affected by the Partition, preserving crucial historical testimonies through storytelling.",
    date: pastDate1,
    formattedDate: formatDate(pastDate1),
    time: `${formatTime(pastDate1)} - ${formatTime(new Date(pastDate1.setHours(pastDate1.getHours() + 3)))}`,
    location: "National Museum, Delhi",
    image: "/placeholder.svg?height=600&width=1200&text=Partition+Stories",
    highlighted: false,
    content: [
      {
        type: "heading",
        content: "Preserving History Through Personal Narratives",
      },
      {
        type: "paragraph",
        content:
          "The Oral History Project: Partition Stories event brings together families and individuals who experienced the 1947 Partition of India. Through personal testimonies and narratives, this project aims to preserve crucial historical perspectives that might otherwise be lost to time.",
      },
      {
        type: "quote",
        content: "History is not just what is written in books; it lives in the stories of those who experienced it.",
        author: "Dr. Amrita Sen, Project Director",
      },
    ],
    speakers: [
      {
        id: "s11",
        name: "Dr. Amrita Sen",
        bio: "Historian specializing in South Asian oral history and founder of the Partition Memory Project.",
        image: "/placeholder.svg?height=200&width=200&text=Amrita",
        role: "Project Director",
      },
      {
        id: "s12",
        name: "Fareed Ahmed",
        bio: "Documentary filmmaker recording oral histories of Partition survivors across the subcontinent.",
        image: "/placeholder.svg?height=200&width=200&text=Fareed",
        role: "Documentarian",
      },
    ],
    attendees: 175,
    maxCapacity: 175,
    ticketPrice: "Free (Registration Required)",
    categories: ["Historical", "Cultural", "Educational"],
  },
  {
    id: "7",
    title: "Folk Tales from Northeast India",
    slug: "northeast-folk-tales",
    description:
      "Discover the rich storytelling traditions of Northeast India through performances, discussions, and cultural exchanges.",
    date: pastDate2,
    formattedDate: formatDate(pastDate2),
    time: `${formatTime(pastDate2)} - ${formatTime(new Date(pastDate2.setHours(pastDate2.getHours() + 4)))}`,
    location: "Arts Center, Guwahati",
    image: "/placeholder.svg?height=600&width=1200&text=Northeast+Folk+Tales",
    highlighted: false,
    content: [
      {
        type: "heading",
        content: "Cultural Heritage of the Northeast",
      },
      {
        type: "paragraph",
        content:
          "The Folk Tales from Northeast India event celebrates the diverse storytelling traditions of the Seven Sister states. From the animistic narratives of Nagaland to the origin myths of Assam, these stories offer unique insights into the cultural heritage of the region.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=400&width=800&text=Northeast+Cultural+Performance",
        alt: "Cultural performance",
      },
    ],
    speakers: [
      {
        id: "s13",
        name: "Bina Boro",
        bio: "Cultural preservationist working to document and share the oral traditions of the Bodo community.",
        image: "/placeholder.svg?height=200&width=200&text=Bina",
        role: "Cultural Preservationist",
      },
      {
        id: "s14",
        name: "Tashi Wangchuk",
        bio: "Storyteller from Arunachal Pradesh specializing in the myths and legends of the Monpa people.",
        image: "/placeholder.svg?height=200&width=200&text=Tashi",
        role: "Traditional Storyteller",
      },
    ],
    attendees: 120,
    maxCapacity: 150,
    ticketPrice: "₹400",
    categories: ["Cultural", "Regional", "Traditional"],
  },
  {
    id: "8",
    title: "Science Storytelling: Making Complex Ideas Accessible",
    slug: "science-storytelling",
    description:
      "Learn how to communicate complex scientific concepts through effective storytelling techniques from expert science communicators.",
    date: pastDate3,
    formattedDate: formatDate(pastDate3),
    time: `${formatTime(pastDate3)} - ${formatTime(new Date(pastDate3.setHours(pastDate3.getHours() + 5)))}`,
    location: "Science Center, Hyderabad",
    image: "/placeholder.svg?height=600&width=1200&text=Science+Storytelling",
    highlighted: false,
    content: [
      {
        type: "heading",
        content: "The Art of Science Communication",
      },
      {
        type: "paragraph",
        content:
          "Science Storytelling explores how narrative techniques can make complex scientific concepts accessible and engaging to general audiences. This event brings together scientists, educators, and communicators to share best practices for translating technical information into compelling stories.",
      },
      {
        type: "heading",
        content: "Workshop Topics",
      },
      {
        type: "list",
        items: [
          "Using metaphor and analogy in science communication",
          "Visual storytelling for scientific concepts",
          "Narrative structures for explaining research",
          "Ethical considerations in science storytelling",
          "Digital tools for interactive science narratives",
        ],
      },
    ],
    speakers: [
      {
        id: "s15",
        name: "Dr. Sunita Rao",
        bio: "Astrophysicist and science communicator known for making complex cosmic concepts understandable to general audiences.",
        image: "/placeholder.svg?height=200&width=200&text=Sunita",
        role: "Science Communicator",
      },
      {
        id: "s16",
        name: "Aditya Sharma",
        bio: "Science journalist and podcast host specializing in environmental storytelling.",
        image: "/placeholder.svg?height=200&width=200&text=Aditya",
        role: "Science Journalist",
      },
    ],
    attendees: 85,
    maxCapacity: 100,
    ticketPrice: "₹1200",
    categories: ["Science", "Educational", "Workshop"],
  },
]



// Helper to check if two dates are the same day
function isSameDay(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

// TODO: get event data form API
// Get a single event by ID
export const getEventById = (id, event) => {
  return events.find((event) => event.id === id)
}

