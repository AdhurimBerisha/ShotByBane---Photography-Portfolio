import React, { useState, useEffect, useContext } from "react";
import { getAllImages, deleteImage } from "../services/apiImages";
import type { Image } from "../services/apiImages";
import { supabase } from "../supabase/supabaseClient";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { IoClose } from "react-icons/io5";
import "react-photo-view/dist/react-photo-view.css";
import { motion } from "framer-motion";
import { transition1 } from "../transition";
import { CursorContext } from "../context/CursorContext";
import OptimizedImage from "./OptimizedImage";

const ITEMS_PER_PAGE = 8;

const ViewImagesList: React.FC = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;

  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (images.length > 0) {
      const imagesToPreload = images.slice(0, 4);
      imagesToPreload.forEach((image) => {
        const img = new window.Image();
        img.src = getImageUrl(image.image_path);
      });
    }
  }, [images]);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getAllImages();
      console.log("Fetched images:", data);
      setImages(data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching images:", err);
      setError("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (image: Image) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      setIsDeleting(true);
      const { error: storageError } = await supabase.storage
        .from("images")
        .remove([image.image_path]);

      if (storageError) {
        console.error("Error deleting from storage:", storageError);
        throw storageError;
      }

      await deleteImage(image.id);

      setImages(images.filter((img) => img.id !== image.id));
    } catch (err: any) {
      console.error("Error deleting image:", err);
      setError("Failed to delete image");
    } finally {
      setIsDeleting(false);
    }
  };

  const getImageUrl = (imagePath: string) => {
    const { data } = supabase.storage.from("images").getPublicUrl(imagePath);
    return data.publicUrl;
  };

  const filteredImages = selectedCategory
    ? images.filter((image) => image.category === selectedCategory)
    : images;

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedImages = filteredImages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const categories = Array.from(new Set(images.map((img) => img.category)));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 dark:text-red-400 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition1}
      className="space-y-6 sm:space-y-8"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-black dark:text-white">
        Current Images
      </h2>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
            ${
              !selectedCategory
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${
                selectedCategory === category
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {paginatedImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-[#0a0a0a] rounded-lg shadow-lg overflow-hidden"
            >
              <PhotoView src={getImageUrl(image.image_path)}>
                <div className="relative aspect-[4/3] group">
                  <OptimizedImage
                    src={getImageUrl(image.image_path)}
                    alt={image.title}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error("Image failed to load:", image.image_path);
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                </div>
              </PhotoView>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg mb-1 text-black dark:text-white">
                  {image.title}
                </h3>
                {image.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    {image.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {image.category}
                  </span>
                  <button
                    onClick={() => handleDeleteImage(image)}
                    disabled={isDeleting}
                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium disabled:opacity-50 transition-colors duration-300"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </PhotoProvider>

      {filteredImages.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-6 sm:py-8">
          No images found{selectedCategory ? ` in ${selectedCategory}` : ""}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 sm:px-6 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base"
          >
            Previous
          </button>
          <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 sm:px-6 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base"
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ViewImagesList;
