import React, { useEffect, useState } from "react";
import GuestProfileDashboard from "./GuestProfileDashboard";
import UserProfileDashboard from "./UserProfileDashboard";

const StudentProfileDashboard = () => {
  const [role, setRole] = useState(() => {
    return (localStorage.getItem("userRole") || localStorage.getItem("role") || "student").toLowerCase();
  });

  if (role === "guest") {
    return <GuestProfileDashboard />;
  }

  return <UserProfileDashboard />;
};

export default StudentProfileDashboard;
