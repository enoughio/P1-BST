import { learningImg, notesImg, podcastImg } from "@/lib/data/images";


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
    name: "Golden Gate Toastmasters",
    address: "456 Market St, San Francisco, CA",
    city: "San Francisco",
    meetingTime: "Wednesdays, 7:00 PM",
    position: [37.7749, -122.4194],
    dmsPosition: "37°46'29.64\"N, 122°25'09.84\"W",
    members: 45,
    image: "",
    description: "Golden Gate Toastmasters is a dynamic club dedicated to helping members enhance their communication and leadership skills in a supportive environment.",
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






