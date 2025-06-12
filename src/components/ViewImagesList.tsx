import React, { useState, useEffect } from "react";
import { getAllImages, deleteImage } from "../services/apiImages";
import type { Image } from "../services/apiImages";
import { supabase } from "../supabase/supabaseClient";

const ViewImagesList: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    fetchImages();
  }, []);

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
      // Delete from storage first
      const { error: storageError } = await supabase.storage
        .from("images")
        .remove([image.image_path]);

      if (storageError) {
        console.error("Error deleting from storage:", storageError);
        throw storageError;
      }

      // Then delete from database
      await deleteImage(image.id);

      // Update local state
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

  const categories = Array.from(new Set(images.map((img) => img.category)));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              !selectedCategory
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                selectedCategory === category
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((image) => {
          console.log("Rendering image:", image);
          return (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={getImageUrl(image.image_path)}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", image.image_path);
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                {image.description && (
                  <p className="text-gray-600 text-sm mb-2">
                    {image.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {image.category}
                  </span>
                  <button
                    onClick={() => handleDeleteImage(image)}
                    disabled={isDeleting}
                    className="text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No images found{selectedCategory ? ` in ${selectedCategory}` : ""}
        </div>
      )}
    </div>
  );
};

export default ViewImagesList;
