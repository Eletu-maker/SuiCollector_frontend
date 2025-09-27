import React, { createContext, useContext, useState, useCallback } from "react";

interface AppContextType {
  openWalletModal: () => void;
  closeWalletModal: () => void;
  isWalletModalOpen: boolean;
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Open wallet modal
  const openWalletModal = useCallback(() => setWalletModalOpen(true), []);
  // Close wallet modal
  const closeWalletModal = useCallback(() => setWalletModalOpen(false), []);
  // Set authentication state
  const setAuthenticated = useCallback((auth: boolean) => setIsAuthenticated(auth), []);

  return (
    <AppContext.Provider
      value={{
        openWalletModal,
        closeWalletModal,
        isWalletModalOpen,
        isAuthenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ✅ This hook is what fixes your Header.tsx error
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
