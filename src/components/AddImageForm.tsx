import React, { useState, useRef, useContext } from "react";
import { supabase } from "../supabase/supabaseClient";
import { createImage } from "../services/apiImages";
import { motion } from "framer-motion";
import { transition1 } from "../transition";
import { CursorContext } from "../context/CursorContext";

interface AddImageFormProps {
  CATEGORIES: string[];
}

const AddImageForm: React.FC<AddImageFormProps> = ({ CATEGORIES }) => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;

  const [newImage, setNewImage] = useState({
    title: "",
    description: "",
    category: CATEGORIES[0],
    file: null as File | null,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setNewImage({ ...newImage, file: selectedFile });
    if (selectedFile) {
      setImagePreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setImagePreviewUrl(null);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.title || !newImage.file) return;

    setIsUploading(true);
    setError(null);
    const file = newImage.file;
    const fileName = `${Date.now()}_${file.name}`;

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(uploadData.path);

      console.log("Uploaded file path:", uploadData.path);
      console.log("Public URL data:", publicUrlData);

      const savedImage = await createImage({
        title: newImage.title,
        description: newImage.description,
        category: newImage.category,
        image_path: uploadData.path,
      });

      console.log("Saved image data:", savedImage);

      setNewImage({
        title: "",
        description: "",
        category: CATEGORIES[0],
        file: null,
      });
      setImagePreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      alert("Image uploaded and saved successfully!");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition1}
      className="bg-white dark:bg-[#0a0a0a] p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-black dark:text-white">
        Add New Image
      </h2>
      {error && (
        <div className="mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-lg border border-red-200 dark:border-red-800 text-sm sm:text-base">
          {error}
        </div>
      )}
      <form onSubmit={handleAddImage} className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={newImage.title}
            onChange={(e) =>
              setNewImage({ ...newImage, title: e.target.value })
            }
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-300 text-sm sm:text-base bg-white dark:bg-[#0a0a0a] text-black dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={newImage.description}
            onChange={(e) =>
              setNewImage({ ...newImage, description: e.target.value })
            }
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-300 text-sm sm:text-base bg-white dark:bg-[#0a0a0a] text-black dark:text-white"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={newImage.category}
            onChange={(e) =>
              setNewImage({ ...newImage, category: e.target.value })
            }
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-300 bg-white dark:bg-[#0a0a0a] text-black dark:text-white text-sm sm:text-base"
            required
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all duration-300 text-sm sm:text-base file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black dark:file:bg-white file:text-white dark:file:text-black hover:file:bg-gray-800 dark:hover:file:bg-gray-200"
            required
          />
          {imagePreviewUrl && (
            <div className="mt-4">
              <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image Preview:
              </p>
              <img
                src={imagePreviewUrl}
                alt="Image Preview"
                className="max-w-full sm:max-w-xs h-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isUploading}
          className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isUploading ? "Uploading..." : "Add Image"}
        </button>
      </form>
    </motion.div>
  );
};

export default AddImageForm;
