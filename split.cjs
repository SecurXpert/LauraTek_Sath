const fs = require('fs');

const originalContent = fs.readFileSync('src/components/ui/StudentProfileDashboard.tsx', 'utf-8');

// --- Create GuestProfileDashboard.tsx ---
let guestContent = originalContent
  .replace(/const StudentProfileDashboard = \(\) => \{/, 'const GuestProfileDashboard = () => {')
  .replace(/export default StudentProfileDashboard;/, 'export default GuestProfileDashboard;')
  .replace(/const \[role, setRole\] = useState\("student"\);/, 'const role = "guest";')
  .replace(/setRole\(data\.role \|\| \(isGuest \? "Guest" : "student"\)\);/, '');

fs.writeFileSync('src/components/ui/GuestProfileDashboard.tsx', guestContent);

// --- Create UserProfileDashboard.tsx ---
let userContent = originalContent
  .replace(/const StudentProfileDashboard = \(\) => \{/, 'const UserProfileDashboard = () => {')
  .replace(/export default StudentProfileDashboard;/, 'export default UserProfileDashboard;')
  .replace(/const \[role, setRole\] = useState\("student"\);/, 'const role = "student";')
  .replace(/setRole\(data\.role \|\| \(isGuest \? "Guest" : "student"\)\);/, '');

fs.writeFileSync('src/components/ui/UserProfileDashboard.tsx', userContent);

// --- Update StudentProfileDashboard.tsx as Wrapper ---
const wrapperContent = `import React, { useEffect, useState } from "react";
import GuestProfileDashboard from "./GuestProfileDashboard";
import UserProfileDashboard from "./UserProfileDashboard";

const StudentProfileDashboard = () => {
  const [role, setRole] = useState("student");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole") || localStorage.getItem("role") || "student";
    setRole(userRole.toLowerCase());
  }, []);

  if (role === "guest") {
    return <GuestProfileDashboard />;
  }

  return <UserProfileDashboard />;
};

export default StudentProfileDashboard;
`;

fs.writeFileSync('src/components/ui/StudentProfileDashboard.tsx', wrapperContent);

console.log('Split completed!');
