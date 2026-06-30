import { useState } from "react";
import { FaTimes, FaRobot } from "react-icons/fa";
interface BotMessage {
 text: string;
 reply: string;
}
const ChatBot: React.FC = () => {
 const [open, setOpen] = useState<boolean>(false);
 const [activeIndex, setActiveIndex] = useState<number | null>(null);
 const botMessages: BotMessage[] = [
   { text: "Hello! I am your LauraTek Assistant 🤖", reply: "Hi there! I am here to help you with LauraTek info." },
   { text: "We offer courses, training, and guidance.", reply: "Our courses range from beginner to advanced level, including hands-on training." },
   { text: "How can I help you today?", reply: "You can ask me about courses, schedules, or any LauraTek related queries." },
   { text: "You can check our latest courses and offers in the Recent Conversations section.", reply: "Visit the Recent Conversations tab to see current deals and courses." },
   { text: "Feel free to explore or contact us anytime!", reply: "Our team is always ready to assist you through chat or email." },
 ];
 const handleMessageClick = (index: number) => {
   setActiveIndex(activeIndex === index ? null : index);
 };
 return (
<>
     {/* Floating Chat Button */}
     {!open && (
<button
         onClick={() => setOpen(true)}
         className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
>
<FaRobot size={28} />
</button>
     )}
     {/* Chat Window */}
     {open && (
<div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden border border-gray-200">
         {/* Header */}
<div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-xl">
<span className="font-semibold text-lg">LauraTek Chat</span>
<FaTimes
             className="cursor-pointer hover:text-gray-200 transition-colors"
             onClick={() => setOpen(false)}
           />
</div>
         {/* Chat Body */}
<div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
           {botMessages.map((msg, i) => (
<div key={i} className="flex flex-col">
               {/* Question */}
<div
                 className="p-3 rounded-xl max-w-[75%] bg-gray-100 text-gray-900 cursor-pointer hover:bg-gray-200 shadow-sm transition-colors duration-200"
                 onClick={() => handleMessageClick(i)}
>
                 {msg.text}
</div>
               {/* Reply */}
               {activeIndex === i && (
<div className="p-3 rounded-xl max-w-[75%] bg-blue-50 text-gray-900 ml-auto shadow-inner transition-all duration-300 mt-5">
                   {msg.reply}
</div>
               )}
</div>
           ))}
</div>
</div>
     )}
     {/* Scrollbar Styling */}
<style>{`
       .custom-scrollbar::-webkit-scrollbar {
         width: 6px;
       }
       .custom-scrollbar::-webkit-scrollbar-track {
         background: #f1f1f1;
         border-radius: 10px;
       }
       .custom-scrollbar::-webkit-scrollbar-thumb {
         background: #c1c1c1;
         border-radius: 10px;
       }
       .custom-scrollbar::-webkit-scrollbar-thumb:hover {
         background: #999;
       }
     `}</style>
</>
 );
};
export default ChatBot;
