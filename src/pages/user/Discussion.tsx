// import React, { useState, useRef, useEffect } from "react";
// import { FaUser } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// import Sidebar from "@/components/sidebar";
// import Profileheader from "@/components/ui/Profileheader";
// import Icon4 from '@/assets/java1.jpg";
// import Icon5 from '@/assets/java1.jpg";
// import Icon6 from '@/assets/java1.jpg";
// import { Menu, X } from "lucide-react";
 
// const Discussion = () => {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [active, setActive] = useState("Discussion");
//   const [activeSection, setActiveSection] = useState("today");
//   const sidebarRef = useRef(null);

  
 
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setSidebarOpen(false);
//       }
//     };
 
//     if (sidebarOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [sidebarOpen]);
 
//   return (
//     <div className="flex bg-[#f7fafd] min-h-screen overflow-x-hidden">
 
//       {/* SIDEBAR */}
//       <div ref={sidebarRef} className="flex-shrink-0">
//         <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />
//       </div>
 
//       {/* MAIN */}
//       <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

//         <Profileheader />
 
//         {/* HEADER */}
//         <div className="flex items-center justify-between lg:justify-end px-2 py-2 sticky top-0 z-20 bg-[#f7fafd]">
//           <button
//             type="button"
//             className="p-2 rounded-md text-gray-700 hover:bg-gray-100 lg:hidden"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <GiHamburgerMenu className="w-6 h-6" />
//           </button>
 
          
            
         

//         </div>
                
// <div className="lg:hidden py-4 flex justify-end">
//   <button
//     onClick={() => setSidebarOpen(!sidebarOpen)}
//     className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 
//                text-white rounded-lg shadow-md hover:shadow-lg 
//                transition-all duration-300"
//   >
//     {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
//   </button>
// </div>
 
//         {/* BODY */}
//         <div className="p-4 sm:p-6 overflow-y-auto min-w-0">
//           <h2 className="font-bold text-2xl my-4">Discussion Room</h2>
 
//           {/* TOP SECTION */}
//           <div className="w-full max-w-xl">
//             <section className="border border-blue-200 flex flex-col md:flex-row p-5 rounded-xl gap-6 md:gap-0 md:h-28">
 
//               {/* Discussions */}
//               <div className="flex gap-4 md:w-1/2">
//                 <FaUser className="w-10 h-10 p-2 bg-white rounded-full" />
//                 <div>
//                   <h4 className="text-gray-600 mb-2">Discussions</h4>
//                   <button
//                     onClick={() => setActiveSection("today")}
//                     className="rounded-full w-36 h-9 bg-blue-500 text-white"
//                   >
//                     Click Here
//                   </button>
//                 </div>
//               </div>

              
 
//               <div className="hidden md:block border-r mx-4"></div>
 
//               {/* Schedule */}
//               <div className="flex gap-4 md:w-1/2">
//                 <FaUser className="w-10 h-10 p-2 bg-white rounded-full" />
//                 <div>
//                   <h4 className="text-gray-600 mb-2">Schedule Discussions</h4>
//                   <button
//                     onClick={() => setActiveSection("schedule")}
//                     className="rounded-full w-36 h-9 bg-blue-500 text-white"
//                   >
//                     Click Here
//                   </button>
//                 </div>
//               </div>
//             </section>

            
//           </div>
          
 
//           {/* TODAY */}
//           {activeSection === "today" && (
//             <>
//               <h2 className="font-bold mt-10 mb-7 text-2xl">Today's Discussion</h2>
 
//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   sm:grid-cols-2
//                   lg:grid-cols-3
//                   2xl:grid-cols-4
//                   gap-6 sm:gap-6 lg:gap-8
//                   w-full
//                   min-w-0
//                 "
//               >
//                 <TodayCard img={Icon4} name="Srinivas" email="ahsankhan12@gmail.com" time="10 : 30 AM" going="9" pending="2" more="+ 4 more" />
//                 <TodayCard img={Icon5} name="Ashok" email="vireng434@hotmail.com" time="11 : 00 AM" going="14" pending="9" more="+ 7 more" />
//                 <TodayCard img={Icon6} name="Bhavya" email="aliyazafar269@ymail.com" time="2 : 30 PM" going="12" pending="5" more="+ 6 more" />
//               </div>
//             </>
//           )}
 
//           {/* SCHEDULE */}
//           {activeSection === "schedule" && (
//             <>
//               <h2 className="font-bold mt-10 mb-7 text-2xl">Schedule Discussion</h2>
 
//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   sm:grid-cols-2
//                   lg:grid-cols-3
//                   2xl:grid-cols-4
//                   gap-6 sm:gap-6 lg:gap-8
//                   w-full
//                   min-w-0
//                 "
//               >
//                 <TodayCard img={Icon4} name="Srinivas" email="ahsankhan12@gmail.com" time="10 : 30 AM" going="9" pending="2" more="+ 4 more" />
//                 <TodayCard img={Icon5} name="Ashok" email="vireng434@hotmail.com" time="11 : 00 AM" going="14" pending="9" more="+ 7 more" />
//                 <TodayCard img={Icon6} name="Bhavya" email="aliyazafar269@ymail.com" time="2 : 30 PM" going="12" pending="5" more="+ 6 more" />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


 
// /* CARD */
// const TodayCard = ({ img, name, email, time, going, pending, more }) => {
//   return (
//     <div className="px-4 py-6 rounded-3xl border border-blue-300 bg-white shadow-sm w-full min-w-0">
 
//       <div className="flex items-center gap-4 sm:gap-6 md:gap-8 mb-8 justify-center text-center">
//         <img src={img} alt="profile" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover" />
//         <div>
//           <h2 className="text-md sm:text-lg md:text-xl font-semibold">{name}</h2>
//           <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm break-all">{email}</p>
//           <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium">{time}</p>
//         </div>
//       </div>
 
//       <div className="border-t border-gray-50 mb-12"></div>
 
//       <div className="flex justify-between mb-8 px-2 sm:px-4 md:px-6 text-[10px] sm:text-xs md:text-sm lg:text-[12px]">
//         <p className="text-blue-500 font-semibold">{going} members going</p>
//         <p className="text-red-500 font-semibold">{pending} pending</p>
//       </div>
 
//       <div className="flex items-center justify-center mb-10">
//         {[...Array(4)].map((_, idx) => (
//           <img
//             key={idx}
//             src={img}
//             alt="person"
//             className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white ${idx !== 0 ? "-ml-3" : ""}`}
//           />
//         ))}
//         <p className="ml-3 text-xs sm:text-sm text-gray-600">{more}</p>
//       </div>
 
//       <div className="flex justify-center mt-10">
//         <button className="w-full sm:w-56 md:w-64 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-xl shadow-md transition">
//           View details
//         </button>
//       </div>
//     </div>
//   );
// };
 
// export default Discussion;


// import React, { useState, useRef } from "react";
// import { FaUser } from "react-icons/fa";
// import Sidebar from "@/components/sidebar";
// import Profileheader from "@/components/ui/Profileheader";
// import Icon4 from '@/assets/java1.jpg";
// import Icon5 from '@/assets/java1.jpg";
// import Icon6 from '@/assets/java1.jpg";
// import {  X, Send } from "lucide-react";
// import { Menu } from "lucide-react";

// const Discussion = () => {
//  const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [active, setActive] = useState(" Discussion");

//   const [activeSection, setActiveSection] = useState("today");
//   const [detailsOpen, setDetailsOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   /* FILTER STATE (RESTORED) */
//   const [date, setDate] = useState("");
//   const [hour, setHour] = useState("10");
//   const [minute, setMinute] = useState("00");
//   const [ampm, setAmpm] = useState("AM");

//   const openDetails = (user) => {
//     setSelectedUser(user);
//     setDetailsOpen(true);
//   };

//   return (
//     <div className="flex bg-[#f7fafd] min-h-screen">
//       <Sidebar sidebarOpen={sidebarOpen} setActive={setActive} active={active} />

//       <div className="flex-1">
//         <Profileheader />

//         <div className="lg:hidden py-4 flex justify-end">
//   <button
//     onClick={() => setSidebarOpen(!sidebarOpen)}
//     className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 
//                text-white rounded-lg shadow-md hover:shadow-lg 
//                transition-all duration-300"
//   >
//     {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
//   </button>
// </div>
        

//         <div className="p-4 sm:p-6">
//           <h2 className="text-2xl font-bold mb-8">Discussion Room</h2>

//           {/* 🔹 TOP SECTION (RESTORED) */}
//           <div className="border border-blue-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 max-w-4xl">
//             <TopBox
//               title="Discussions"
//               onClick={() => setActiveSection("today")}
//             />
//             <div className="hidden md:block w-px bg-gray-300" />
//             <TopBox
//               title="Schedule Discussions"
//               onClick={() => setActiveSection("schedule")}
//             />
//           </div>

          

//           {/* 🔹 FILTER BAR (RESTORED) */}
//           <div className="flex flex-wrap gap-3 mt-8">
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="border border-blue-400 rounded-xl px-4 py-2 w-full sm:w-52"
//             />

//             <select
//               value={hour}
//               onChange={(e) => setHour(e.target.value)}
//               className="border border-blue-400 rounded-xl px-3 py-2"
//             >
//               {Array.from({ length: 12 }, (_, i) => (
//                 <option key={i}>{String(i + 1).padStart(2, "0")}</option>
//               ))}
//             </select>

//             <span className="hidden sm:inline">:</span>

//             <select
//               value={minute}
//               onChange={(e) => setMinute(e.target.value)}
//               className="border border-blue-400 rounded-xl px-3 py-2"
//             >
//               <option>00</option>
//               <option>30</option>
//             </select>

//             <select
//               value={ampm}
//               onChange={(e) => setAmpm(e.target.value)}
//               className="border border-blue-400 rounded-xl px-3 py-2"
//             >
//               <option>AM</option>
//               <option>PM</option>
//             </select>

//             <select
//               value={activeSection}
//               onChange={(e) => setActiveSection(e.target.value)}
//               className="border rounded-xl px-4 py-2"
//             >
//               <option value="today">Today</option>
//               <option value="schedule">Schedule</option>
//             </select>

//             <button className="bg-blue-500 text-white px-6 py-2 rounded-xl">
//               Search
//             </button>
//           </div>

//           {/* 🔹 CARDS */}
//           <h2 className="text-xl font-bold mt-10 mb-6">
//             {activeSection === "today"
//               ? "Today's Discussion"
//               : "Schedule Discussion"}
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <DiscussionCard
//               img={Icon4}
//               name="Srinivas"
//               email="ahsankhan12@gmail.com"
//               time="10 : 30 AM"
//               going={9}
//               pending={2}
//               more="+ 4 more"
//               onView={() =>
//                 openDetails({
//                   img: Icon4,
//                   name: "Srinivas",
//                   email: "ahsankhan12@gmail.com",
//                 })
//               }
//             />

//             <DiscussionCard
//               img={Icon5}
//               name="Ashok"
//               email="vireng434@hotmail.com"
//               time="11 : 00 AM"
//               going={14}
//               pending={9}
//               more="+ 7 more"
//               onView={() =>
//                 openDetails({
//                   img: Icon5,
//                   name: "Ashok",
//                   email: "vireng434@hotmail.com",
//                 })
//               }
//             />

//             <DiscussionCard
//               img={Icon6}
//               name="Bhavya"
//               email="aliyazafar269@ymail.com"
//               time="2 : 30 PM"
//               going={12}
//               pending={5}
//               more="+ 6 more"
//               onView={() =>
//                 openDetails({
//                   img: Icon6,
//                   name: "Bhavya",
//                   email: "aliyazafar269@ymail.com",
//                 })
//               }
//             />
//           </div>
//         </div>
//       </div>

//       {detailsOpen && (
//         <DetailsChatPopup
//           user={selectedUser}
//           onClose={() => setDetailsOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// /* 🔹 TOP BOX */
// const TopBox = ({ title, onClick }) => (
//   <div className="flex gap-4 flex-1 items-center">
//     <FaUser className="w-10 h-10 p-2 bg-white rounded-full" />
//     <div>
//       <p className="text-gray-600 mb-2">{title}</p>
//       <button
//         onClick={onClick}
//         className="bg-blue-500 text-white px-6 py-2 rounded-full"
//       >
//         Click Here
//       </button>
//     </div>
//   </div>
// );

// /* 🔹 DISCUSSION CARD */
// const DiscussionCard = ({
//   img,
//   name,
//   email,
//   time,
//   going,
//   pending,
//   more,
//   onView,
// }) => (
//  <div
//   className="
//     border border-blue-300
//     rounded-[32px]
//     bg-white
//     p-6
//     flex flex-col
//     shadow-sm
//     h-full
//   "
// >
//   {/* TOP ROW */}
//   <div className="flex justify-center w-full">
//   <div className="flex items-center gap-4 w-full max-w-[260px] sm:max-w-[320px]">
//     <img
//       src={img}
//       alt={name}
//       className="w-20 h-20 rounded-full flex-shrink-0"
//     />

//     <div className="min-w-0 text-center sm:text-left">
//       <h3 className="font-semibold truncate">{name}</h3>

//       {/* EMAIL — FIXED */}
//       <p className="text-sm text-gray-500 break-words overflow-hidden text-ellipsis">
//         {email}
//       </p>

//       <p className="font-medium mt-1">{time}</p>
//     </div>
//   </div>
// </div>



//   {/* DIVIDER */}
//   <hr className="my-5" />

//   {/* CONTENT (flex-grow zone) */}
//   <div className="flex-1 flex flex-col justify-center">

//     {/* STATS */}
//     <div className="flex justify-between mb-8 text-sm px-6">
//       <span className="text-blue-600">{going} members going</span>
//       <span className="text-red-500">{pending} pending</span>
//     </div>

//     {/* AVATARS */}
//     <div className="flex items-center justify-center mt-6">
//       {[1, 2, 3, 4].map((i) => (
//         <img
//           key={i}
//           src={img}
//           className={`w-10 h-10 rounded-full border-2 border-white ${
//             i !== 1 ? "-ml-3" : ""
//           }`}
//         />
//       ))}
//       <span className="ml-3 text-sm text-gray-600">{more}</span>
//     </div>
//   </div>

//   {/* BUTTON (always bottom) */}
//   <button
//     onClick={onView}
//     className="mt-24 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl"
//   >
//     View details
//   </button>
// </div>

// );


// /* 🔹 CHAT POPUP */
// const DetailsChatPopup = ({ user, onClose }) => {
//   const [msg, setMsg] = useState("");

//   return (
//     <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-2">
//       <div className="bg-white w-full max-w-md h-[90vh] rounded-2xl flex flex-col">
//         <div className="flex items-center gap-4 p-4 border-b">
//           <img src={user.img} className="w-12 h-12 rounded-full" />
//           <div className="min-w-0">
//             <p className="font-semibold">{user.name}</p>
//             <p className="text-xs text-gray-500 break-all">{user.email}</p>
//           </div>
//           <button onClick={onClose} className="ml-auto">
//             <X />
//           </button>
//         </div>

//         <div className="flex-1 p-4 space-y-3 overflow-y-auto">
//           <div className="bg-purple-100 p-3 rounded-xl w-2/3">
//             Hello 👋
//           </div>
//           <div className="bg-blue-100 p-3 rounded-xl w-2/3 ml-auto">
//             Hi, let’s discuss.
//           </div>
//         </div>

//         <div className="flex items-center gap-3 p-4 border-t">
//           <input
//             value={msg}
//             onChange={(e) => setMsg(e.target.value)}
//             placeholder="Type a message"
//             className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none"
//           />
//           <button className="bg-blue-500 text-white p-3 rounded-full">
//             <Send size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Discussion;




