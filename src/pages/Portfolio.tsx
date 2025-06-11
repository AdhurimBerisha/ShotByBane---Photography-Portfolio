import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { transition1 } from "../transition";
import { CursorContext } from "../context/CursorContext";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { IoClose } from "react-icons/io5";
import "react-photo-view/dist/react-photo-view.css";

interface ImageItem {
  src: string;
  category: string;
}

const images: ImageItem[] = [
  { src: "/images/portfolio/1.png", category: "Nature" },
  { src: "/images/portfolio/2.png", category: "Street" },
  { src: "/images/portfolio/3.png", category: "Portrait" },
  { src: "/images/portfolio/4.png", category: "Wedding" },
  { src: "/images/portfolio/5.png", category: "Animals" },
  { src: "/images/portfolio/6.png", category: "Nature" },
  { src: "/images/portfolio/7.png", category: "Street" },
  { src: "/images/portfolio/8.png", category: "Portrait" },
  { src: "/images/portfolio/9.png", category: "Wedding" },
  { src: "/images/portfolio/10.png", category: "Animals" },
  { src: "/images/portfolio/11.png", category: "Nature" },
  { src: "/images/portfolio/12.png", category: "Street" },
  { src: "/images/portfolio/13.png", category: "Portrait" },
  { src: "/images/portfolio/14.png", category: "Wedding" },
  { src: "/images/portfolio/15.png", category: "Animals" },
  { src: "/images/portfolio/16.png", category: "Nature" },
  { src: "/images/portfolio/17.png", category: "Street" },
  { src: "/images/portfolio/18.png", category: "Portrait" },
];

const categories = ["All", ...new Set(images.map((img) => img.category))];
const ITEMS_PER_PAGE = 8;

const Portfolio = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const displayedImages = filteredImages.slice(0, visibleItems);
  const hasMoreImages = visibleItems < filteredImages.length;
  const showSeeLess =
    visibleItems >= filteredImages.length && visibleItems > ITEMS_PER_PAGE;

  const loadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  const seeLess = () => {
    setVisibleItems(ITEMS_PER_PAGE);
  };

  return (
    <div id="portfolio" className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition1}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-center mb-8"
      >
        Portfolio
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition1}
        className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setVisibleItems(ITEMS_PER_PAGE);
            }}
            className={`btn text-sm sm:text-base ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
          >
            {category}
          </button>
        ))}
      </motion.div>

      <PhotoProvider
        maskOpacity={0.8}
        photoClosable={true}
        bannerVisible={false}
        overlayRender={({ onClose }) => (
          <button
            onClick={onClose}
            className="fixed top-4 right-4 z-50 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all duration-300"
            aria-label="Close"
          >
            <IoClose className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>
        )}
      >
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {displayedImages.map((image, index) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <PhotoView src={image.src}>
                  <div
                    className="relative group"
                    onMouseEnter={mouseEnterHandler}
                    onMouseLeave={mouseLeaveHandler}
                  >
                    <img
                      src={image.src}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 sm:h-40 md:h-48 object-cover cursor-pointer rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 rounded-lg" />
                  </div>
                </PhotoView>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </PhotoProvider>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center gap-4 mt-8"
      >
        {hasMoreImages && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={loadMore}
            className="btn bg-black text-white hover:bg-gray-800 text-sm sm:text-base"
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
          >
            Load More
          </motion.button>
        )}
        {showSeeLess && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={seeLess}
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 text-sm sm:text-base"
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
          >
            See Less
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Portfolio;
