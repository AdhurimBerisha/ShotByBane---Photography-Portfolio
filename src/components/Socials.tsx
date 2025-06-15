import { useContext } from "react";
import { FaTiktok, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import { CursorContext } from "../context/CursorContext";

const Socials = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className="hidden xl:flex ml-24"
    >
      <ul className="flex gap-x-4">
        <li>
          <a
            href="https://www.instagram.com/shotbybanee?igsh=MTl4cmFqdjB1M3R4ag=="
            target="_blank"
          >
            <FaInstagram />
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/@shotbybanee" target="_blank">
            <FaTiktok />
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/share/1YxwPSZJfw/?mibextid=wwXIfr"
            target="_blank"
          >
            <FaFacebook />
          </a>
        </li>
        <li>
          <a
            href="https://x.com/shotbybane?s=21&t=NR57yCDcfimCXvBXN4u9yg"
            target="_blank"
          >
            <FaTwitter />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Socials;
