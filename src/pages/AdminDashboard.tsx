import { useState, useRef } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "../components/AdminSidebar";

interface PortfolioImage {
  id: number;
  title: string;
  category: string;
  imageUrl: string; // This will now be a local URL for display
}

const CATEGORIES = [
  "Portrait",
  "Landscape",
  "Wedding",
  "Event",
  "Commercial",
  "Nature",
  "Street",
  "Architecture",
  "Fashion",
  "Sports",
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [images, setImages] = useState<PortfolioImage[]>([
    {
      id: 1,
      title: "Sample Image 1",
      category: "Nature",
      imageUrl:
        "https://szpmxhgeptgldntocwjl.supabase.co/storage/v1/object/public/images//16.png",
    },
  ]);

  const [newImage, setNewImage] = useState({
    title: "",
    category: CATEGORIES[0],
    file: null as File | null, // To store the actual file object
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // To display image preview

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

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImage.title && newImage.file) {
      const imageToAdd: PortfolioImage = {
        id: Date.now(),
        title: newImage.title,
        category: newImage.category,
        imageUrl: URL.createObjectURL(newImage.file), // Use local URL for display
      };
      setImages([...images, imageToAdd]);
      setNewImage({ title: "", category: CATEGORIES[0], file: null });
      setImagePreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
      // In a real application, you would upload `newImage.file` to a server here
      // and store the actual server URL in `imageUrl`.
    }
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className=" w-[275px] min-h-screen bg-white border-r border-gray-200">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-8">Admin Dashboard</h1>

            {activeTab === 0 && (
              <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">Add New Image</h2>
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
                  <button type="submit" className="btn">
                    Add Image
                  </button>
                </form>
              </div>
            )}

            {activeTab === 1 && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Portfolio Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg">{image.title}</h3>
                        <p className="text-gray-600">{image.category}</p>
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="mt-2 text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
