import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CursorProvider from "./context/CursorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <CursorProvider>
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </CursorProvider>
);
