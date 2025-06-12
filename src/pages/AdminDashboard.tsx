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
      <div className="flex">
        {/* Sidebar */}
        <div className=" w-[275px] min-h-screen bg-white border-r border-gray-200">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-8">Admin Dashboard</h1>

            {activeTab === 0 && <AddImageForm CATEGORIES={CATEGORIES} />}

            {activeTab === 1 && <ViewImagesList />}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
