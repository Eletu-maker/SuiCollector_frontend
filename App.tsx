import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SuiClientProvider, WalletProvider, createNetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider, useAppContext } from "./contexts/AppContext";

import { Header } from "./components/Header";
import { ConnectWalletModal } from "./components/ConnectWalletModal";

import { HomePage } from "./pages/HomePage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { CreateItemPage } from "./pages/CreateItemPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import ClubsListPage from "./pages/ClubsListPage";
import { ClubDetailPage } from "./pages/ClubDetailPage";
import { AssetDetailPage } from "./pages/AssetDetailPage";
import { EditProfilePage } from "./pages/EditProfilePage";
import "@mysten/dapp-kit/dist/index.css"

// Create a query client for React Query
const queryClient = new QueryClient();

// Sui network configuration
const { networkConfig } = createNetworkConfig({
    devnet: { url: getFullnodeUrl("devnet") },
    testnet: { url: getFullnodeUrl("testnet") },
    mainnet: { url: getFullnodeUrl("mainnet") },
    localnet: { url: getFullnodeUrl("localnet") },
});

/**
 * Protects routes that require authentication.
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAppContext();
    return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
                <WalletProvider autoConnect>
                    <AppContextProvider>
                        <Router>
                            <Header />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/marketplace" element={<MarketplacePage />} />
                                <Route
                                    path="/mint"
                                    element={
                                        <ProtectedRoute>
                                            <CreateItemPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <ProtectedRoute>
                                            <ProfilePage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/settings"
                                    element={
                                        <ProtectedRoute>
                                            <SettingsPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="/clubs" element={<ClubsListPage />} />
                                <Route path="/clubs/:id" element={<ClubDetailPage />} />
                                <Route path="/asset/:id" element={<AssetDetailPage />} />
                                <Route
                                    path="/edit-profile"
                                    element={
                                        <ProtectedRoute>
                                            <EditProfilePage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                            <ConnectWalletModal />
                        </Router>
                    </AppContextProvider>
                </WalletProvider>
            </SuiClientProvider>
        </QueryClientProvider>
    );
}

export default App;
