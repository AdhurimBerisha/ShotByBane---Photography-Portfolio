import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Package } from "../services/apiPackages";

interface PackageContextType {
  selectedPackage: Package | null;
  setSelectedPackage: (pkg: Package | null) => void;
}

const PackageContext = createContext<PackageContextType | null>(null);

export const PackageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  return (
    <PackageContext.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = () => {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error("usePackage must be used within a PackageProvider");
  }
  return context;
};
