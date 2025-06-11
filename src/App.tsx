import Header from "./components/Header";
import AnimRoutes from "./components/AnimRoutes";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AnimRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
