import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Packages from "./pages/Packages";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { motion } from "framer-motion";
import { CursorContext } from "./context/CursorContext";
import { PackageProvider } from "./context/PackageContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ThemeToggle from "./components/ThemeToggle";

const AppContent = () => {
  const { cursorVariants, cursorBG } = useContext(CursorContext)!;

  return (
    <PackageProvider>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Header />
              <main className="relative">
                <Home />
                <About />
                <Portfolio />
                <Packages />
                <Contact />
              </main>
              <ThemeToggle />
            </>
          }
        />
      </Routes>
      {/* cursor */}
      <motion.div
        variants={cursorVariants}
        animate={cursorBG}
        className="w-[32px] h-[32px] bg-primary dark:bg-white fixed top-0 left-0 pointer-events-none z-50 rounded-full"
      ></motion.div>
    </PackageProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
