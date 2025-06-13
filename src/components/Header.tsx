import { useContext, useState, useEffect } from "react";
import Socials from "./Socials";
import MobileNav from "./MobileNav";
import { CursorContext } from "../context/CursorContext";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { mouseEnterHandler, mouseLeaveHandler } = useContext(CursorContext)!;
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed w-full px-[30px] lg:px-[100px] z-30 h-[100px] lg:h-[140px] flex items-center transition-transform duration-300 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center w-full justify-between">
        <button
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          onClick={() => scrollToSection("home")}
          className="max-w-[200px]"
        >
          <img
            src={
              theme === "light"
                ? "/images/header/logo.svg"
                : "/images/header/logo2.svg"
            }
            alt=""
          />
        </button>
        <nav
          className="hidden xl:flex gap-x-12 font-semibold"
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <button
            onClick={() => scrollToSection("home")}
            className="text-black dark:text-white hover:text-primary dark:hover:text-primary transition"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-black dark:text-white hover:text-primary dark:hover:text-primary transition"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-black dark:text-white hover:text-primary dark:hover:text-primary transition"
          >
            Portfolio
          </button>
          <button
            onClick={() => scrollToSection("packages")}
            className="text-black dark:text-white hover:text-primary dark:hover:text-primary transition"
          >
            Packages
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-black dark:text-white hover:text-primary dark:hover:text-primary transition"
          >
            Contact
          </button>
        </nav>
      </div>
      <Socials />
      <MobileNav />
    </header>
  );
};

export default Header;
