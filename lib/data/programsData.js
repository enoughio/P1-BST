import {
  aspiringProfessionalsImg,
  bhopalStorytellersImg,
  oratoFestImg,
  podcastImg,
  youngOratersImg,
} from "@/lib/data/images";

export const programsData = [
  // {
  //   cardSize: "large",
  //   bubbleVariant: "default",
  //   title: "Young Orators",
  //   subHeading: "School Students",
  //   BubbleColor: { background: "rgba(193, 18, 31, .08)" },
  //   cardColor: { background: "rgba(193, 18, 31, .08)" },
  //   image: youngOratersImg,
  //   className: "cursor-pointer inline-block md:hidden",
  //   details: {
  //     images: [youngOratersImg],
  //     heading: "Young Orators",
  //     duration: "6 months",
  //     age: "8-12 years",
  //     description: [
  //       "The Young Leaders’ Club is a youth leadership programme and a supportive weekly space for school students aged 10 to 17 to build genuine confidence on stage, in conversation, and as leaders. Through storytelling, public speaking, and the experience of running their own club, members develop skills that stay with them for life.",
  //       "The Club is genuinely run by its members. A student leadership team plans and conducts every meeting, and leaders are elected every six months in accordance with the Club’s own written constitution, giving young members a first-hand experience of real elections, real responsibility, and real leadership.",
  //       "The Club meets every week. In each session, members present their prepared stories, deliver impromptu speeches on the spot, and evaluate one another through kind, constructive feedback, developing leadership, communication, public speaking, and storytelling in equal measure. The result is a community of confident communicators and capable young leaders.",
  //     ],
  //     additionalDetails: ["Interactive sessions", "Fun activities"],
  //   },
  // },

  {
    cardSize: "small",
    bubbleVariant: "normal",
    title: "Bhopal Storytellers",
    subHeading: "For Adults",
    BubbleColor: { background: "rgba(92, 149, 255, 0.3)" },
    cardColor: { background: "rgba(92, 149, 255, 0.3)" },
    image: bhopalStorytellersImg,
    className: "cursor-pointer",
    details: {
      images: [bhopalStorytellersImg],
      heading: "Bhopal Storytellers",
      duration: "1 Year",
      age: "18+ years",
      description:[
        "The founding initiative of the Foundation, the Bhopal Storytellers Club is a community for adults who wish to develop and refine their storytelling, public speaking, and communication. Through regular gatherings, structured practice, and constructive peer feedback, members build the confidence and craft to express themselves with impact, whether on stage, in the workplace, or in everyday life.",

        "Tracing its origins to 2017, the Club remains the beating heart of the Foundation’s community and the environment in which many of its storytellers first find their voice. "
      ],

      additionalDetails: ["Workshops", "Practical exercises"],
    },
  },
  {
    cardSize: "large",
    bubbleVariant: "default",
    title: "Young Leaders",
    subHeading: "For School Students",
    BubbleColor: { background: "rgba(193, 18, 31, .12)" },
    cardColor: { background: "rgba(193, 18, 31, .12)" },
    image: youngOratersImg,
    className: "cursor-pointer hidden md:inline-block",
    details: {
      images: [youngOratersImg],
      heading: "Young Leaders",
      duration: "6 months",
      age: "10-17 years",
       description: [
        "The Young Leaders’ Club is a youth leadership programme and a supportive weekly space for school students aged 10 to 17 to build genuine confidence on stage, in conversation, and as leaders. Through storytelling, public speaking, and the experience of running their own club, members develop skills that stay with them for life.",
        "The Club is genuinely run by its members. A student leadership team plans and conducts every meeting, and leaders are elected every six months in accordance with the Club’s own written constitution, giving young members a first-hand experience of real elections, real responsibility, and real leadership.",
        "The Club meets every week. In each session, members present their prepared stories, deliver impromptu speeches on the spot, and evaluate one another through kind, constructive feedback, developing leadership, communication, public speaking, and storytelling in equal measure. The result is a community of confident communicators and capable young leaders.",
      ],
      additionalDetails: ["Interactive sessions", "Fun activities"],
    },
  },
  {
    cardSize: "small",
    bubbleVariant: "normal",
    title: "Confident Speakers",
    subHeading: "For Students",
    BubbleColor: { background: "rgba(193, 18, 31, .12)" },
    cardColor: { background: "rgba(193, 18, 31, .12)" },
    image: aspiringProfessionalsImg,
    className: "cursor-pointer",
    details: {
      images: [aspiringProfessionalsImg],
      heading: "Aspiring Professionals",
      duration: "4 months",
      age: "16+ years",
      description:[
        "Aspiring Professionals program is designed for college students and young professionals looking to enhance their public speaking and communication skills. Participants learn to craft compelling messages, deliver engaging presentations, and connect with audiences in a meaningful way, setting them up for success in their careers."
      ],
      additionalDetails: ["Career-focused", "Presentation skills"],
    },
  },
  {
    cardSize: "small",
    bubbleVariant: "default",
    title: "Bhopal International Storytelling festival",
    subHeading: "Annual Public Festival ",
    BubbleColor: { background: "rgba(92, 149, 255, 0.3)" },
    cardColor: { background: "rgba(92, 149, 255, 0.3)" },
    image: oratoFestImg,
    className: "cursor-pointer",
    details: {
      images: [oratoFestImg],
      heading: "Orato Fest",
      duration: "3 day",
      age: "All ages",
      description:[
        "The Bhopal International Storytelling Festival, also known as the Bhopal Story Fest, is the Foundation’s flagship public celebration of the spoken word. Bringing together storytellers, performers, and audiences from across the region and beyond, the Festival showcases storytelling in its many forms and affirms its place in public and cultural life.",

        "Two editions have been successfully delivered, and the third is planned for 2027, establishing the Festival as a growing landmark on Bhopal’s cultural calendar."
      ],
      
      additionalDetails: ["performances", "Art", "Competitions", "Workshops"],
    },
  },
  {
    cardSize: "small",
    bubbleVariant: "normal",
    title: "Expert Sessions",
    subHeading: "Panel Discussions",
    BubbleColor: { background: "rgba(92, 149, 255, 0.3)" },
    cardColor: { background: "rgba(92, 149, 255, 0.3)" },
    image: podcastImg,
    className: "cursor-pointer",
    details: {
      images: [podcastImg],
      heading: "Expert Sessions",
      duration: "Varies",
      age: "All ages",
      description:
        "Expert Sessions feature panel discussions and podcasts with industry leaders, entrepreneurs, and public speaking experts. Participants gain valuable insights and practical tips to help them succeed in their personal and professional lives.",
      additionalDetails: ["Podcasts", "Industry insights"],
    },
  },
];
