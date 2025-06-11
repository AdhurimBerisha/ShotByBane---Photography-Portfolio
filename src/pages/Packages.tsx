import { motion } from "framer-motion";
import { transition1 } from "../transition";
import { useContext } from "react";
import { CursorContext } from "../context/CursorContext";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Pricing = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;
  const packages = [
    {
      name: "Starter",
      price: "$299",
      features: [
        "2 Hour Photo Session",
        "20 Digital Images",
        "Basic Editing",
        "Online Gallery",
      ],
      popular: false,
    },
    {
      name: "Intermediate",
      price: "$499",
      features: [
        "4 Hour Photo Session",
        "40 Digital Images",
        "Advanced Editing",
        "Online Gallery",
        "2 Outfit Changes",
      ],
      popular: true,
    },
    {
      name: "Professional",
      price: "$799",
      features: [
        "Full Day Session",
        "80 Digital Images",
        "Premium Editing",
        "Online Gallery",
        "Unlimited Outfits",
        "Priority Delivery",
      ],
      popular: false,
    },
  ];

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
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
              className={`bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col h-[400px] sm:h-[450px] lg:h-[500px] ${
                pkg.popular ? "transform scale-105 relative" : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 sm:px-4 sm:py-1 rounded-bl-lg text-sm sm:text-base">
                  Popular
                </div>
              )}
              <div className="flex flex-col h-full">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                    {pkg.name}
                  </h3>
                  <div className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                    {pkg.price}
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
