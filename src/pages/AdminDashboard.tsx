import { useState } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "../components/AdminSidebar";
import AddImageForm from "../components/AddImageForm";
import ViewImagesList from "../components/ViewImagesList";

const CATEGORIES = [
  "Portrait",
  "Landscape",
  "Wedding",
  "Event",
  "Commercial",
  "Nature",
  "Street",
  "Architecture",
  "Fashion",
  "Sports",
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-[275px] min-h-[200px] lg:min-h-screen bg-white border-b lg:border-b-0 lg:border-r border-gray-200">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
              Admin Dashboard
            </h1>

            {activeTab === 0 && <AddImageForm CATEGORIES={CATEGORIES} />}

            {activeTab === 1 && <ViewImagesList />}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
