import { useContext } from "react";
import { motion } from "framer-motion";
import { transition1 } from "../transition";
import { CursorContext } from "../context/CursorContext";

const Contact = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={transition1}
      className="section min-h-screen py-20"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 pt-96 sm:pt-[32rem] md:pt-[10rem] lg:pt-0">
          {/* text & form */}
          <div
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className="w-full lg:w-1/2 px-4 lg:px-0"
          >
            <h1 className="h1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 lg:mb-8">
              Contact me
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 lg:mb-12 text-gray-600">
              Interested in a plan? Reach out and i’ll be happy to help
            </p>
            {/* form */}
            <form className="flex flex-col gap-y-6">
              <div className="flex flex-col sm:flex-row gap-y-6 sm:gap-x-8">
                <input
                  className="outline-none border-b border-b-primary h-[50px] sm:h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879] text-sm sm:text-base"
                  type="text"
                  placeholder="Your name"
                />
                <input
                  className="outline-none border-b border-b-primary h-[50px] sm:h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879] text-sm sm:text-base"
                  type="text"
                  placeholder="Your email address"
                />
              </div>
              <input
                className="outline-none border-b border-b-primary h-[50px] sm:h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879] text-sm sm:text-base"
                type="text"
                placeholder="Your message"
              />
              <button
                className="btn w-full sm:w-auto text-sm sm:text-base px-8 py-3 mt-4"
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
              >
                Send it
              </button>
            </form>
          </div>
          {/* image */}
          <motion.div
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ transition: transition1, duration: 1.5 }}
            className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <div className=" h-full w-full rounded-lg overflow-hidden">
              <img
                src="/images/contact/Contact.jpg"
                alt="Contact"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
