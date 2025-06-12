import { useContext } from "react";
import { motion } from "framer-motion";
import { transition1 } from "../transition";
import { CursorContext } from "../context/CursorContext";

const About = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={transition1}
      className="w-full h-auto lg:h-screen"
    >
      <div
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        className="container mx-auto h-full relative"
      >
        {/* text & img wrapper */}
        <div className="flex flex-col lg:flex-row h-full items-center justify-center gap-x-8 lg:gap-x-24 text-center lg:text-left px-4 sm:px-6 md:px-8 lg:px-0 lg:pt-16">
          {/* image */}
          <div className="flex-1 w-full lg:w-auto h-[300px] sm:h-[400px] md:h-[500px] lg:h-full order-2 lg:order-none overflow-hidden">
            <img
              src="/images/about/About.jpg"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: "-80%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-80%" }}
            transition={transition1}
            className="flex-1 pt-24 sm:pt-28 md:pt-32 lg:pt-0 lg:w-auto z-10 flex flex-col justify-center items-center lg:items-start"
          >
            <h1 className="h1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              About me
            </h1>
            <p className="mb-8 sm:mb-10 lg:mb-12 max-w-sm text-sm sm:text-base md:text-lg">
              Photography is all about the process. It is about making her
              clients comfortable in front of the camera and giving them that
              boost of confidence.
              <b> Headshot Photography, </b> has become increasingly important
              in the social media and digital age.
              <br />
              <br />
              Experienced Photographer working in the photography and creative
              industries.
            </p>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="btn text-sm sm:text-base mb-10"
            >
              View my work
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
