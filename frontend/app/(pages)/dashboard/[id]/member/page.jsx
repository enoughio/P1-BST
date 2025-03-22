import BasicInfo from "@/components/ui/dashboard/BasicInfo";
import MyClub from "@/components/ui/dashboard/MyClub";
import AdditionalInfo from "@/components/ui/dashboard/AdditionalInfo";
import PrivercyPolicy from "@/components/ui/dashboard/PrivercyPolicy";
import MembershipHistor from "@/components/ui/dashboard/membership-history";

const baseApiUrl = "http://127.0.0.1:8000/api/accounts/members/";

export default async function Page({ params }) {

  const { id } = await params; // Extract userID from the URL
  let userData;

  try {
    const response = await fetch(`${baseApiUrl}${id}`, {
      cache: "no-store", // Ensures fresh data on every request
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    userData = await response.json();
    console.log("User data fetched successfully", userData);

  } catch (error) {
    console.error("Error fetching user data:", error);
    userData = { club: {} }; // Fallback data
  }

  return (
    <div className="flex flex-col md:flex-row gap-5 mx-8 my-5">
      {/* Left Section */}
      <div className="flex flex-col gap-5">
        <BasicInfo user={userData} />
        <MyClub club={userData.club} />
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-5">
        <AdditionalInfo user={userData} />
        <MembershipHistor />
        <PrivercyPolicy />
      </div>
    </div>
  );
}
