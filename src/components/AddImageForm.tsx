import React, { useState, useRef } from "react";
import { supabase } from "../supabase/supabaseClient";
import { createImage } from "../services/apiImages";

interface AddImageFormProps {
  CATEGORIES: string[];
}

const AddImageForm: React.FC<AddImageFormProps> = ({ CATEGORIES }) => {
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
      // 1. Upload the file to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }

      // 2. Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(uploadData.path);

      console.log("Uploaded file path:", uploadData.path);
      console.log("Public URL data:", publicUrlData);

      // 3. Save the image information to the database using our API
      const savedImage = await createImage({
        title: newImage.title,
        description: newImage.description,
        category: newImage.category,
        image_path: uploadData.path,
      });

      console.log("Saved image data:", savedImage);

      // Reset form
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
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Add New Image</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleAddImage} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Title
          </label>
          <input
            type="text"
            value={newImage.title}
            onChange={(e) =>
              setNewImage({ ...newImage, title: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Description
          </label>
          <textarea
            value={newImage.description}
            onChange={(e) =>
              setNewImage({ ...newImage, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Category
          </label>
          <select
            value={newImage.category}
            onChange={(e) =>
              setNewImage({ ...newImage, category: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
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
          <label className="block text-sm font-medium text-primary mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {imagePreviewUrl && (
            <div className="mt-4">
              <p className="block text-sm font-medium text-primary mb-2">
                Image Preview:
              </p>
              <img
                src={imagePreviewUrl}
                alt="Image Preview"
                className="max-w-xs h-auto rounded-md shadow"
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Add Image"}
        </button>
      </form>
    </div>
  );
};

export default AddImageForm;
