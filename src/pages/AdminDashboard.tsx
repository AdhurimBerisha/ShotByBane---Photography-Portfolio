import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "../components/AdminSidebar";
import AddImageForm from "../components/AddImageForm";
import ViewImagesList from "../components/ViewImagesList";
import { transition1 } from "../transition";
import { CursorContext } from "../context/CursorContext";
import ThemeToggle from "../components/ThemeToggle";

const CATEGORIES = [
  "Nature",
  "Portrait",
  "Architecture",
  "Street",
  "Animals",
  "Abstract",
];

const AdminDashboard = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    // Add event listener for popstate
    window.addEventListener("popstate", handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition1}
      className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]"
    >
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ...transition1, delay: 0.2 }}
          className="w-full lg:w-[275px] min-h-[200px] lg:min-h-screen bg-white dark:bg-[#0a0a0a] border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800"
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ...transition1, delay: 0.3 }}
          className="flex-1 p-4 sm:p-6 lg:p-8"
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition1, delay: 0.4 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition1, delay: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-black dark:text-white"
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              Admin Dashboard
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...transition1, delay: 0.6 }}
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              {activeTab === 0 && <AddImageForm CATEGORIES={CATEGORIES} />}
              {activeTab === 1 && <ViewImagesList />}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <ThemeToggle />
    </motion.section>
  );
};

export default AdminDashboard;
