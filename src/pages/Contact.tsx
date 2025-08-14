import { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { transition1 } from "../transition";
import { CursorContext } from "../context/CursorContext";
import { usePackage } from "../context/PackageContext";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;
  const { selectedPackage, setSelectedPackage } = usePackage();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setSelectedPackage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const packageInfo = selectedPackage
        ? `Selected Package: ${selectedPackage.name} (€${
            selectedPackage.price
          })\n\nFeatures:\n${selectedPackage.features
            .map((feature) => `- ${feature}`)
            .join("\n")}\n\n`
        : "No package selected\n\n";

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: packageInfo + formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success(
        "Message sent! Thank you for your message. I'll get back to you soon."
      );
      resetForm();
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <p className="text-base sm:text-lg md:text-xl mb-8 lg:mb-12 text-gray-600 dark:text-white">
              Interested in a plan? Reach out and i'll be happy to help
            </p>
            {/* form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
              <div className="flex flex-col sm:flex-row gap-y-6 sm:gap-x-8">
                <input
                  className="outline-none border-b border-b-primary h-[50px] sm:h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879] text-sm sm:text-base"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="outline-none border-b border-b-primary h-[50px] sm:h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879] text-sm sm:text-base"
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {selectedPackage && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Selected Package:</h3>
                  <p className="text-lg font-semibold">
                    {selectedPackage.name}
                  </p>
                  <p className="text-primary font-bold">
                    €{selectedPackage.price}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {selectedPackage.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <textarea
                ref={textareaRef}
                className="resize-none outline-none border-b border-b-primary min-h-[50px] sm:min-h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879] text-sm sm:text-base"
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleArea}
                required
                rows={1}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-full sm:w-auto text-sm sm:text-base px-8 py-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
              >
                {isSubmitting ? "Sending..." : "Send it"}
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
                loading="eager"
                decoding="sync"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </motion.section>
  );
};

export default Contact;
