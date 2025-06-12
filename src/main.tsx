import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import CursorProvider from "./context/CursorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <CursorProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </CursorProvider>
);
