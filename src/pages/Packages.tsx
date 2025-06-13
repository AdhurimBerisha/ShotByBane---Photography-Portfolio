import { motion } from "framer-motion";
import { transition1 } from "../transition";
import { useContext, useState, useEffect } from "react";
import { CursorContext } from "../context/CursorContext";
import {
  getAllPackages,
  subscribeToPackages,
  type Package,
} from "../services/apiPackages";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Pricing = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();

    // Subscribe to package changes
    const subscription = subscribeToPackages((payload) => {
      console.log("Package change:", payload);
      fetchPackages(); // Refresh packages when changes occur
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const data = await getAllPackages();
      setPackages(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <motion.section
      id="packages"
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={transition1}
      className="section min-h-screen"
    >
      <div className="container mx-auto h-full relative">
        <h1
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          className="h1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-8 sm:mb-10 lg:mb-12 pt-16 sm:pt-20 md:pt-24"
        >
          Packages
        </h1>
        {/* Packages Section */}
        <div
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-0 mb-12 sm:mb-16 lg:mb-20"
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
              className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col h-[400px] sm:h-[450px] lg:h-[500px]"
            >
              <div className="flex flex-col h-full">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                    {pkg.name}
                  </h3>
                  <div className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                    €{pkg.price}
                  </div>
                  <ul className="space-y-2 sm:space-y-4 text-sm sm:text-base">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="py-2 sm:py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors duration-300 mt-auto w-[160px] sm:w-[200px] mx-auto text-sm sm:text-base"
                  onMouseEnter={mouseEnterHandler}
                  onMouseLeave={mouseLeaveHandler}
                >
                  Choose Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Pricing;
