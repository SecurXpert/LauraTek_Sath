import { Outlet } from "react-router-dom";
import GuestSidebar from "@/pages/guest/GuestSidebar";
import GuestHeader from "@/pages/guest/GuestHeader";
import { useState } from "react";
import { cn } from "@/lib/utils";

const GuestLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-slate-50 overflow-x-hidden">
      <GuestSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <GuestHeader 
          setSidebarOpen={setSidebarOpen} 
          isCollapsed={isCollapsed}
        />
        <main className={cn(
          "transition-all duration-300 pt-20 min-h-screen bg-[#F8F9FB] min-w-0 overflow-x-hidden",
          isCollapsed ? "ml-0 lg:ml-[96px]" : "ml-0 lg:ml-[288px]"
        )}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default GuestLayout;
