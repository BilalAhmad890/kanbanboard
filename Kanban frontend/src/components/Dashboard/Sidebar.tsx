import React, { useState } from "react";
import {
  Home,
  Layout,
  User,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { NavItemProps } from "@/Types/types";
import { useDashboardContext } from "@/components/Dashboard/DashboardContext"; // Adjust the import path as necessary
import { UserAvatar } from "./UserAvatar";
import { convertFirstNameToLowerCase } from "@/lib/FirstNameConverterToLowerCase";

const Sidebar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, isLoading } = useDashboardContext();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 />
      </div>
    );
  }
  const name =
    user && typeof user?.userName === "string"
      ? convertFirstNameToLowerCase(user?.userName)
      : "";

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };
  return (
    <div
      className={`shadow-sm shadow-gray-800 transition-all duration-300 ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && <h2 className="text-xl font-bold">KanFlow</h2>}
          <button onClick={toggleSidebar} className="p-2 rounded-full">
            {sidebarCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
        <div className="flex-1">
          <nav className="mt-8">
            <NavItem
              icon={<Home size={20} />}
              label="Home"
              collapsed={sidebarCollapsed}
              route={"/"}
            />
            <NavItem
              icon={<Layout size={20} />}
              label="Boards"
              collapsed={sidebarCollapsed}
              route={"/dashboard/board"}
            />
            <NavItem
              icon={<User size={20} />}
              label="Profile"
              collapsed={sidebarCollapsed}
              route={"/dashboard/profile"}
            />
          </nav>
        </div>
        <div className="p-4">
          <div className="flex items-center">
            <UserAvatar seed={name} name={name} />
            {!sidebarCollapsed && (
              <span className="ml-3 font-medium">{user?.userName}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, collapsed, route }) => {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 ${isActive ? "text-blue-500" : ""}`
      }
    >
      <span className="mr-3">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
