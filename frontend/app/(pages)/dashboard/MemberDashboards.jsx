"use client";

import UserAvatar from "./user-avatar";
import InformationCard from "./information-card";
import MembershipHistory from "../member/[username]/membership-history";
import UserDetailsForm from "./user-details-form";
import PasswordForm from "./password-form";

const defaultUser = {
  name: "John Doe",
  lastName: "Smith",
  email: "john.doe@example.com",
  phone: "+1 123 456 7890",
  plan: "Basic",
  avatar: "https://via.placeholder.com/150",
};

const Dashboard = () => {
  const handleDetailsSubmit = async (data) => {
    console.log("Details updated:", data);
  };

  const handlePasswordSubmit = async (data) => {
    console.log("Password updated:", data);
  };

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <UserAvatar email={defaultUser.email} avatar={defaultUser.avatar} username={defaultUser.name} />
            <InformationCard user={defaultUser} />
            <MembershipHistory />
          </div>
          <div>
            <h1 className="mb-6 text-2xl font-bold">User Settings</h1>
            <UserDetailsForm user={defaultUser} onSubmit={handleDetailsSubmit} />
            <PasswordForm onSubmit={handlePasswordSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

