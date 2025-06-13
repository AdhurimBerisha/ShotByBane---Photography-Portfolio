import React, { useContext } from "react";
import { FaPlusSquare, FaImages, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { transition1 } from "../transition";
import { supabase } from "../supabase/supabaseClient";
import { CursorContext } from "../context/CursorContext";
import { useTheme } from "../context/ThemeContext";

interface AdminSidebarProps {
  activeTab: number;
  setActiveTab: (tabIndex: number) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;
  const { theme } = useTheme();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/admin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={transition1}
      className="w-full h-full bg-white dark:bg-[#0a0a0a] py-4 flex flex-col justify-between"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {/* Logo Section */}
      <div className="flex justify-center items-center py-6 px-4 mb-4">
        <img
          src={
            theme === "light"
              ? "/images/header/logo.svg"
              : "/images/header/logo2.svg"
          }
          alt="Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      <nav className="space-y-2 px-4 flex-1">
        <button
          onClick={() => setActiveTab(0)}
          className={`flex items-center w-full p-3 rounded-lg transition-all duration-300
            ${
              activeTab === 0
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            }`}
        >
          <FaPlusSquare className="mr-3 text-lg" />
          <span className="font-medium">Add New Images</span>
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`flex items-center w-full p-3 rounded-lg transition-all duration-300
            ${
              activeTab === 1
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            }`}
        >
          <FaImages className="mr-3 text-lg" />
          <span className="font-medium">View Images</span>
        </button>
      </nav>

      {/* Logout Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-800 dark:hover:text-red-300 transition-all duration-300"
        >
          <FaSignOutAlt className="mr-3 text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
