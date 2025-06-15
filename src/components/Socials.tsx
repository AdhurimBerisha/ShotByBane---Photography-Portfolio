import { useContext } from "react";
import { FaTiktok, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import { CursorContext } from "../context/CursorContext";

interface SocialsProps {
  variant?: "desktop" | "mobile";
}

const Socials = ({ variant = "desktop" }: SocialsProps) => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className={variant === "desktop" ? "hidden xl:flex ml-24" : "flex"}
    >
      <ul className="flex gap-x-4">
        <li>
          <a
            href="https://www.instagram.com/shotbybanee?igsh=MTl4cmFqdjB1M3R4ag=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaInstagram />
          </a>
        </li>
        <li>
          <a
            href="https://www.tiktok.com/@shotbybanee"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaTiktok />
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/share/1YxwPSZJfw/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaFacebook />
          </a>
        </li>
        <li>
          <a
            href="https://x.com/shotbybane?s=21&t=NR57yCDcfimCXvBXN4u9yg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <FaTwitter />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Socials;
