import { useContext } from "react";
import { motion } from "framer-motion";
import { transition1 } from "../transition";
import { CursorContext } from "../context/CursorContext";

const Home = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition1}
      className="section"
    >
      <div className="container mx-auto h-full relative">
        {/* text & img wrapper */}
        <div className="flex flex-col justify-center min-h-screen">
          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-50%" }}
            transition={transition1}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className="w-full px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 lg:pt-0 pb-14 lg:pb-0 lg:w-auto z-10 lg:absolute flex flex-col justify-center items-center lg:items-start"
          >
            <h1 className="h1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              photographer <br /> & film maker
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-primary mb-4 lg:mb-12">
              Los Angeles, USA
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn mb-[30px] text-sm sm:text-base"
            >
              hire me
            </button>
          </motion.div>
          {/* image */}
          <div className="flex justify-center lg:justify-end w-full lg:absolute lg:right-0 lg:top-0 lg:h-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={transition1}
              className="relative lg:-right-40 overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-full"
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={transition1}
                src="/images/home/woman.png"
                alt=""
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Home;
