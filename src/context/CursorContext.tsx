import React, { useState, useEffect, createContext } from "react";
import type { ReactNode } from "react";

type CursorContextType = {
  cursorVariants: Record<string, any>;
  cursorBG: string;
  mouseEnterHandler: () => void;
  mouseLeaveHandler: () => void;
};

export const CursorContext = createContext<CursorContextType | null>(null);

type CursorProviderProps = {
  children: ReactNode;
};

const CursorProvider = ({ children }: CursorProviderProps) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorBG, setCursorBG] = useState("default");

  const mobileViewportIsActive =
    typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (!mobileViewportIsActive) {
      const move = (e: MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    } else {
      setCursorBG("none");
    }
  }, [mobileViewportIsActive]);

  const cursorVariants = {
    default: {
      x: cursorPos.x - 16,
      y: cursorPos.y - 16,
      backgroundColor: "#0e1112",
    },
    text: {
      width: "150px",
      height: "150px",
      x: cursorPos.x - 72,
      y: cursorPos.y - 72,
      backgroundColor: "#fff",
      mixBlendMode: "difference",
    },
    none: {
      width: 0,
      height: 0,
      backgroundColor: "rgba(255,255,255, 1)",
    },
  };

  const mouseEnterHandler = () => setCursorBG("text");
  const mouseLeaveHandler = () => setCursorBG("default");

  return (
    <CursorContext.Provider
      value={{ cursorVariants, cursorBG, mouseEnterHandler, mouseLeaveHandler }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export default CursorProvider;
