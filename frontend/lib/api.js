import Error from "next/error"

const API_BASE_URL = "https://api.example.com/v1"

// Generic function to handle API requests
async function handleRequest(
  endpoint,
  method = "GET",
  data = null,
  customHeaders = {},
) {
  // In a real app, this would make actual API calls
  // For the demo, we'll simulate responses with a delay

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer kjaslkdfjlaskdjflkas`,
    ...customHeaders,
  }

  const options = {
    method,
    headers,
  }

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(data)
  }

  // For demo purposes, simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // This is where the real fetch would happen
  // const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  // For demo, return mock data based on the endpoint and method
  return getMockResponse(endpoint, method, data)
}

function getMockResponse(endpoint, method, data) {
  // Mock responses based on endpoint
  if (endpoint.includes("/members") && method === "GET") {
    return mockMembers
  }

  if (endpoint.includes("/clubs") && method === "GET") {
    return mockClubs
  }

  if (endpoint.includes("/events") && method === "GET") {
    return mockEvents
  }

  if (endpoint.includes("/meetings") && method === "GET") {
    return mockMeetings
  }

  if (endpoint.includes("/projects") && method === "GET") {
    return mockProjects
  }

  if (endpoint.includes("/requests") && method === "GET") {
    return mockRequests
  }

  // For POST/PUT operations, return the data that was sent with an id
  if (method === "POST") {
    return { id: Math.floor(Math.random() * 1000), ...data, createdAt: new Date().toISOString() }
  }

  if (method === "PUT" || method === "PATCH") {
    return { ...data, updatedAt: new Date().toISOString() }
  }

  if (method === "DELETE") {
    return { success: true, message: "Resource deleted successfully" }
  }

  return { message: "No mock data available for this endpoint" }
}

// Mock data
const mockMembers = [
  {
    "id": "fba36fee-077f-4a29-b6b9-ee8f35b211dc",
    "username": "u000",
    "name": "Vikikumar",
    "email": "u000@example.com",
    "mobile": "9594548313",
    "club_name": "Bharat Storytellers",
    "membership_expiry_date": null
},
{
    "id": "e8f3240f-36ad-4dd9-a4a5-058323d271a0",
    "username": "u001",
    "name": "abc def",
    "email": "u001@example.com",
    "mobile": "9594548313",
    "club_name": "Bharat Storytellers",
    "membership_expiry_date": null
},
{
    "id": "a5bff85e-b680-469c-822d-6ebedcd1d830",
    "username": "u002",
    "name": "abc def",
    "email": "u002@example.com",
    "mobile": "9594548313",
    "club_name": "XYZ Storytellers",
    "membership_expiry_date": null
}
]

const mockClubs = [
  {
    id: "C0001",
    name: "Bhopal Storytellers",
    address:
      "First Floor, Bharat Storytellers, B-66, near Chetak Bridge, Housing Board Colony, Kasturba Nagar, Bhopal, Madhya Pradesh 462022",
    city: "Bhopal",
    meetingTime: "Tuesdays, 6:30 PM",
    position: [23.2339, 77.4401],
    dmsPosition: "40°42'46.08\"N, 74°00'21.6\"W",
    members: 32,
    image: "",
    description:
      "Downtown Speakers is a friendly and supportive club that helps members improve their public speaking and leadership skills. We meet every Tuesday at 6:30 PM at 123 Main St, New York, NY. Join us to practice your speaking skills, receive feedback, and connect with other members.",
    Admin: "John Doe",
    email: "jhondoe@example.com",
    phone: "123-456-7890",
  },
  {
    id: "C0002",
    name: "Delhi Orators",
    address: "123 MG Road, Connaught Place, New Delhi",
    city: "New Delhi",
    meetingTime: "Wednesdays, 7:00 PM",
    position: [28.6139, 77.209],
    dmsPosition: "28°36'50.0\"N 77°12'32.0\"E",
    members: 45,
    image: "",
    description:
      "Delhi Orators is one of the oldest and most established public speaking clubs in the capital region. We focus on developing communication and leadership skills in a supportive environment.",
    Admin: "Priya Sharma",
    email: "priya@example.com",
    phone: "999-888-7777",
  },
  {
    id: "C0003",
    name: "Mumbai Speakers",
    address: "Andheri West, Mumbai, Maharashtra",
    city: "Mumbai",
    meetingTime: "Fridays, 6:00 PM",
    position: [19.076, 72.8777],
    dmsPosition: "19°4'33.6\"N 72°52'39.7\"E",
    members: 38,
    image: "",
    description:
      "Mumbai Speakers welcomes professionals from all backgrounds who want to improve their communication and leadership skills. Our diverse membership provides varied perspectives and feedback.",
    Admin: "Rahul Desai",
    email: "rahul@example.com",
    phone: "888-777-6666",
  },
]

const mockEvents = [
  {
    id: "1",
    title: "Bhopal International Storytelling Fest",
    slug: "BISF",
    description:
      "Join us for an evening of captivating stories that bridge cultures and generations. Our expert storytellers will take you on a journey through time and tradition.",
    longDescription: `
      <p>The Bhopal International Storytelling Fest (BISF) is a celebration of the art of storytelling from around the world. This premier event brings together master storytellers, emerging talents, and enthusiastic audiences for an unforgettable evening of narrative magic.</p>
      
      <p>This year's theme, "Stories Across Borders," emphasizes the universal power of storytelling to connect us across cultural, geographic, and generational divides. Our carefully curated lineup features traditional folk tales, personal narratives, and innovative storytelling formats that push the boundaries of the craft.</p>
      
      <p>Whether you're a seasoned storyteller or simply someone who appreciates the magic of a well-told tale, BISF offers something for everyone. Come be part of this unique celebration of one of humanity's oldest and most enduring art forms.</p>
    `,
    date: "2023-12-15",
    formattedDate: "December 15, 2023",
    time: "6:00 PM - 9:00 PM",
    location: "Cultural Center, New Delhi",
    image: "",
    type: "event" / "workshop",
    createdBy: "adminId",
    highlighted: true,
    club: "1",
    clubName: "Bhopal Storytellers",
    attendees: 120,
    maxCapacity: 200,
    ticketPrice: "₹500-1500",
    categories: ["Cultural", "Performance", "Educational"],
    speakers: [
      {
        name: "Anita Desai",
        role: "International Storyteller",
        bio: "Award-winning storyteller with 20 years of experience performing across Asia and Europe",
        image: "",
      },
      {
        name: "Rajiv Sharma",
        role: "Folk Tale Specialist",
        bio: "Expert in Indian folk tales and their cultural significance",
        image: "",
      },
      {
        name: "Sarah Johnson",
        role: "Modern Narrative Expert",
        bio: "Pushing the boundaries of storytelling through digital media and interactive narratives",
        image: "",
      },
    ],
    schedule: [
      {
        time: "6:00 PM - 6:30 PM",
        title: "Welcome Reception",
        description: "Registration and refreshments",
      },
      {
        time: "6:30 PM - 7:30 PM",
        title: "Traditional Tales",
        description: "Folk stories from across India presented by our master storytellers",
      },
      {
        time: "7:30 PM - 8:00 PM",
        title: "Intermission",
        description: "Refreshments and networking",
      },
      {
        time: "8:00 PM - 9:00 PM",
        title: "Contemporary Narratives",
        description: "Modern storytelling formats and interactive experiences",
      },
    ],
    photos: [
      { url: "", alt: "Last year's storytelling session" },
      { url: "", alt: "Audience engagement" },
      { url: "", alt: "Award ceremony from previous edition" },
    ],
  },
  {
    id: "2",
    title: "Bhopal International Storytelling Fest",
    slug: "BISF",
    description:
      "Join us for an evening of captivating stories that bridge cultures and generations. Our expert storytellers will take you on a journey through time and tradition.",
    longDescription: `
      <p>The Bhopal International Storytelling Fest (BISF) is a celebration of the art of storytelling from around the world. This premier event brings together master storytellers, emerging talents, and enthusiastic audiences for an unforgettable evening of narrative magic.</p>
      
      <p>This year's theme, "Stories Across Borders," emphasizes the universal power of storytelling to connect us across cultural, geographic, and generational divides. Our carefully curated lineup features traditional folk tales, personal narratives, and innovative storytelling formats that push the boundaries of the craft.</p>
      
      <p>Whether you're a seasoned storyteller or simply someone who appreciates the magic of a well-told tale, BISF offers something for everyone. Come be part of this unique celebration of one of humanity's oldest and most enduring art forms.</p>
    `,
    date: "2023-12-15",
    formattedDate: "December 15, 2023",
    time: "6:00 PM - 9:00 PM",
    location: "Cultural Center, New Delhi",
    image: "",
    type: "event" / "workshop",
    createdBy: "adminId",
    highlighted: true,
    club: "1",
    clubName: "Bhopal Storytellers",
    attendees: 120,
    maxCapacity: 200,
    ticketPrice: "₹500-1500",
    categories: ["Cultural", "Performance", "Educational"],
    speakers: [
      {
        name: "Anita Desai",
        role: "International Storyteller",
        bio: "Award-winning storyteller with 20 years of experience performing across Asia and Europe",
        image: "",
      },
      {
        name: "Rajiv Sharma",
        role: "Folk Tale Specialist",
        bio: "Expert in Indian folk tales and their cultural significance",
        image: "",
      },
      {
        name: "Sarah Johnson",
        role: "Modern Narrative Expert",
        bio: "Pushing the boundaries of storytelling through digital media and interactive narratives",
        image: "",
      },
    ],
    schedule: [
      {
        time: "6:00 PM - 6:30 PM",
        title: "Welcome Reception",
        description: "Registration and refreshments",
      },
      {
        time: "6:30 PM - 7:30 PM",
        title: "Traditional Tales",
        description: "Folk stories from across India presented by our master storytellers",
      },
      {
        time: "7:30 PM - 8:00 PM",
        title: "Intermission",
        description: "Refreshments and networking",
      },
      {
        time: "8:00 PM - 9:00 PM",
        title: "Contemporary Narratives",
        description: "Modern storytelling formats and interactive experiences",
      },
    ],
    
    photos: [
      { url: "", alt: "Last year's storytelling session" },
      { url: "", alt: "Audience engagement" },
      { url: "", alt: "Award ceremony from previous edition" },
    ],

  },
]

const mockMeetings = [
  {
    id: "1",
    title: "Weekly Club Meeting",
    date: "2023-11-22",
    time: "6:30 PM - 8:30 PM",
    location: "Main Club Room",
    description: "Regular weekly meeting with prepared speeches and evaluations",
    club: "1",
    roles: [
      { role: "master of ceramony", assignedTo: "1" },
      { role: "Timer", assignedTo: "2" },
      { role: "Ah Counter", assignedTo: "4" },
      { role: "Grammarian", assignedTo: null },
      { role: "Speaker 1", assignedTo: "2" },
      { role: "Speaker 2", assignedTo: "1" },
      { role: "Evaluator 1", assignedTo: "4" },
      { role: "Evaluator 2", assignedTo: null },
    ],
  },
  {
    id: "2",
    title: "Executive Committee Meeting",
    date: "2023-11-29",
    time: "5:30 PM - 6:30 PM",
    location: "Conference Room",
    description: "Monthly executive committee meeting to discuss club business",
    club: "1",
    roles: [
      { role: "President", assignedTo: "1" },
      { role: "VP Education", assignedTo: "2" },
      { role: "VP Membership", assignedTo: "4" },
      { role: "Secretary", assignedTo: null },
    ],
  },
  {
    id: "3",
    title: "Workshop: Effective Evaluations",
    date: "2023-12-06",
    time: "6:30 PM - 8:30 PM",
    location: "Main Club Room",
    description: "Special workshop on how to give effective evaluations",
    club: "1",
    roles: [
      { role: "Workshop Leader", assignedTo: "1" },
      { role: "Timer", assignedTo: "2" },
      { role: "Assistant", assignedTo: null },
    ],
  },
]

const mockProjects = [
  {
    id: "1",
    title: "Ice Breaker",
    description: "First speech project focusing on introducing yourself to the club",
    level: "Level 1",
    assignedTo: "4",
    status: "Completed",
    completedDate: "2023-10-15",
    club: "1",
    feedback: "Great first speech! Effectively introduced yourself and showed your enthusiasm.",
  },
  {
    id: "2",
    title: "Researching and Presenting",
    description: "Research a topic, organize supporting materials, and deliver a well-organized speech",
    level: "Level 2",
    assignedTo: "2",
    status: "In Progress",
    completedDate: null,
    club: "1",
    feedback: "",
  },
  {
    id: "3",
    title: "Focus on the Positive",
    description: "Practice using language that shows positivity in your speech",
    level: "Level 3",
    assignedTo: "1",
    status: "Completed",
    completedDate: "2023-09-22",
    club: "1",
    feedback: "Excellent use of positive language. Very motivational and uplifting.",
  },
  {
    id: "4",
    title: "Connect with Storytelling",
    description: "Practice storytelling techniques to connect with your audience",
    level: "Level 2",
    assignedTo: null,
    status: "Not Started",
    completedDate: null,
    club: "1",
    feedback: "",
  },
]

const mockRequests = [
  {
    id: "1",
    type: "MemberRemoval",
    requestedBy: "1",
    requestedDate: "2023-11-10",
    status: "Pending",
    club: "1",
    details: {
      memberId: "5",
      reason: "Member has relocated to another city",
    },
  },
  {
    id: "2",
    type: "FreezeClub",
    requestedBy: "1",
    requestedDate: "2023-11-05",
    status: "Approved",
    club: "1",
    details: {
      startDate: "2023-12-15",
      endDate: "2024-01-15",
      reason: "Holiday season break",
    },
  },
  {
    id: "3",
    type: "EventCancellation",
    requestedBy: "1",
    requestedDate: "2023-11-12",
    status: "Rejected",
    club: "1",
    details: {
      eventId: "2",
      reason: "Insufficient registrations",
    },
  },
]

// API functions
// Members
//TODO: try to use a single function for getMembers and getMember]
//TODO: try to do it in a more generic way

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const getAllMembers = async (clubId) => {
  const endpoint = clubId ? `/members?club=${clubId}` : "/members"
  return handleRequest(endpoint) 

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/accounts/members/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to fetch members (${response.status}): ${errText}`);
    }

    return await response.json();

  } catch (error) {
    console.error("getMembers error:", error);
    // re-throw so callers can handle/display it
    throw error;
  }

}

export const getMember = async (id) => {
  return handleRequest(`/members/${id}`)
}

export const createMember = async (data) => {
  return handleRequest("/members", "POST", data)
}

export const updateMember = async (id, data) => {
  return handleRequest(`/members/${id}`, "PUT", data)
}

export const renewMember = async (id, expiryDate) => {
  return handleRequest(`/members/${id}/renew`, "POST", { expiryDate })
}

export const reinstateMember = async (id) => {
  return handleRequest(`/members/${id}/reinstate`, "POST")
}


// Clubs
export const getClubs = async () => {

  return handleRequest("/clubs")

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/bst/clubs/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })


    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to fetch clubs (${response.status}): ${errText}`);
    }

    return await response.json();

  } catch (error) {
    console.error("getClubs error:", error);
    // re-throw so callers can handle/display it
    throw error;
  }

}

export const getClub = async (clubId) => {
  // return handleRequest(`/clubs/${id}`)

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/bst/clubs/${clubId}/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to fetch club (${response.status}): ${errText}`);
    }
    return await response.json();

  } catch (error) {
    console.error("getClub error:", error);
    throw error
  }

}

export const getClubMembers = async (clubId) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/bst/clubs/${clubId}/members/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to fetch club members (${response.status}): ${errText}`);
    }

    return await response.json();

  } catch (error) {
    console.error("getClubMembers error:", error);
    throw error
  }
}


export const createClub = async (data) => {
  // return handleRequest("/clubs", "POST", data)

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/bst/clubs/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to create club (${response.status}): ${errText}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Error creating club:", error)
    throw error
  }

}


export const updateClub = async (id, data) => {
  // return handleRequest(`/clubs/${id}`, "PUT", data)
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/bst/clubs/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
  } catch (error) {
    console.error("updateClub error:", error);
    throw error
  }
}


// Events
export const getEvents = async (clubId) => {
  // const endpoint = clubId ? `/events?club=${clubId}` : "/events"
  // return handleRequest(endpoint)

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/bst/events/`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if(!response.ok){
      const errText = await response.text();
      throw new Error(`Failed to fetch events (${response.status}): ${errText}`);
    }


    return await response.json();

  } catch (error) {
    console.error("getEvents error:", error);
    throw error  // re-throw so callers can handle/display it
  }
}



export const getEvent = async (id) => {
  return handleRequest(`/events/${id}`)
}

export const createEvent = async (data) => {
  return handleRequest("/events", "POST", data)

  try {
    
  } catch (error) {
    console.error("createEvent error:", error);
    throw error
    
  }

}

export const updateEvent = async (id, data) => {
  return handleRequest(`/events/${id}`, "PUT", data)
}

export const highlightEvent = async (id, highlighted) => {
  return handleRequest(`/events/${id}/highlight`, "POST", { highlighted })
}

export const deleteEvent = async (id) => {
  return handleRequest(`/events/${id}`, "DELETE")
}

// Meetings
export const getMeetings = async (clubId) => {
  return handleRequest(`/meetings?club=${clubId}`)
}

export const getMeeting = async (id) => {
  return handleRequest(`/meetings/${id}`)
}

export const createMeeting = async (data) => {
  return handleRequest("/meetings", "POST", data)
}

export const updateMeeting = async (id, data) => {
  return handleRequest(`/meetings/${id}`, "PUT", data)
}

export const assignRole = async (meetingId, roleIndex, memberId) => {
  return handleRequest(`/meetings/${meetingId}/roles/${roleIndex}`, "PATCH", { assignedTo: memberId })
}

// Projects
export const getProjects = async (clubId) => {
  return handleRequest(`/projects?club=${clubId}`)
}

export const getProject = async (id) => {
  return handleRequest(`/projects/${id}`)
}

export const createProject = async (data) => {
  return handleRequest("/projects", "POST", data)
}

export const updateProject = async (id, data) => {
  return handleRequest(`/projects/${id}`, "PUT", data)
}

export const assignProject = async (id, memberId) => {
  return handleRequest(`/projects/${id}/assign`, "POST", { memberId })
}

export const completeProject = async (id, feedback) => {
  return handleRequest(`/projects/${id}/complete`, "POST", {
    completedDate: new Date().toISOString(),
    feedback,
  })
}

// Requests
export const getRequests = async (clubId) => {
  const endpoint = clubId ? `/requests?club=${clubId}` : "/requests"
  return handleRequest(endpoint)
}

export const createRequest = async (data) => {
  return handleRequest("/requests", "POST", data)
}

export const updateRequestStatus = async (id, status) => {
  return handleRequest(`/requests/${id}/status`, "PATCH", { status })
}

export default {
  getMember,
  getAllMembers,
  createMember,
  updateMember,
  renewMember,
  reinstateMember,
  getClubs,
  getClub,
  createClub,
  updateClub,
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  highlightEvent,
  deleteEvent,
  getMeetings,
  getMeeting,
  createMeeting,
  updateMeeting,
  assignRole,
  getProjects,
  getProject,
  createProject,
  updateProject,
  assignProject,
  completeProject,
  getRequests,
  createRequest,
  updateRequestStatus,
}

