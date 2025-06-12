import React from "react";
import { FaPlusSquare, FaImages, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface AdminSidebarProps {
  activeTab: number;
  setActiveTab: (tabIndex: number) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // In a real application, you would implement your logout logic here,
    // e.g., clearing local storage, redirecting to login page, calling an API.
    navigate("/admin");
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md py-4 flex flex-col justify-between">
      {/* Logo Section */}
      <div className="flex justify-center items-center py-6 px-4 mb-4">
        <img
          src="/images/header/logo.svg"
          alt="Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      <nav className="space-y-2 px-4 flex-1">
        <button
          onClick={() => setActiveTab(0)}
          className={`flex items-center w-full p-2 rounded-md transition-colors duration-200
            ${
              activeTab === 0
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
        >
          <FaPlusSquare className="mr-3 text-lg" />
          <span className="font-medium">Add New Images</span>
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`flex items-center w-full p-2 rounded-md transition-colors duration-200
            ${
              activeTab === 1
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
        >
          <FaImages className="mr-3 text-lg" />
          <span className="font-medium">View Images</span>
        </button>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto px-4 py-2">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-2 rounded-md text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors duration-200"
        >
          <FaSignOutAlt className="mr-3 text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
