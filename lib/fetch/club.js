const fetchClubData = async (clubId) => {
  // fetch club data from backend by clubId
  try {
    const response = await fetch(`https://api.example.com/clubs/${clubId}`);
    if (!response.ok) {
      throw new Error(`Error fetching club data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching club data:", error);
    throw error;
  }
};

export default fetchClubData;