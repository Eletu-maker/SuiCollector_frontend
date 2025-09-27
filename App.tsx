import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SuiClientProvider, WalletProvider, createNetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./contexts/AppContext";

import { Header } from "./components/Header";
import { ConnectWalletModal } from "./components/ConnectWalletModal";

import { HomePage } from "./pages/HomePage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { CreateItemPage } from "./pages/CreateItemPage";
import { SettingsPage } from "./pages/SettingsPage";
import ClubsListPage from "./pages/ClubsListPage";
import { ClubDetailPage } from "./pages/ClubDetailPage";
import { AssetDetailPage } from "./pages/AssetDetailPage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { PortfolioTrackerPage } from "./pages/PortfolioTrackerPage";

import ProfileLayout from "./pages/ProfilePage";
import OwnedAssetsTab from "./pages/ProfileTabs/OwnedAssetsTab";
import CreatedAssetsTab from "./pages/ProfileTabs/CreatedAssetsTab";
import ActivityFeedTab from "./pages/ProfileTabs/ActivityFeedTab";

import "@mysten/dapp-kit/dist/index.css";

const queryClient = new QueryClient();

const { networkConfig } = createNetworkConfig({
    devnet: { url: getFullnodeUrl("devnet") },
    testnet: { url: getFullnodeUrl("testnet") },
    mainnet: { url: getFullnodeUrl("mainnet") },
    localnet: { url: getFullnodeUrl("localnet") },
});

// ✅ Demo user data
const mockUser = {
    id: "1",
    displayName: "John Doe",
    username: "johnny",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    isVerifiedArtist: true,
};

const mockWallet = {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    balance: 125.45,
};

function App() {
    const disconnectWallet = () => {
        console.log("Mock disconnect wallet");
    };

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
                                

                                {/* ✅ Profile now receives mock props */}
                                <Route
                                    path="/profile"
                                    element={
                                        <ProfileLayout
                                            user={mockUser}
                                            wallet={mockWallet}
                                            disconnectWallet={disconnectWallet}
                                        />
                                    }
                                >
                                    <Route index element={<OwnedAssetsTab />} />
                                    <Route path="owned" element={<OwnedAssetsTab />} />
                                    <Route path="created" element={<CreatedAssetsTab />} />
                                    <Route path="activity" element={<ActivityFeedTab />} />
                                    <Route path="portfolio" element={<PortfolioTrackerPage />} />
                                    <Route path="mint" element={<CreateItemPage />} />
                                    <Route path="settings" element={<SettingsPage />} />
                                </Route>

                                
                                <Route path="/clubs" element={<ClubsListPage />} />
                                <Route path="/clubs/:id" element={<ClubDetailPage />} />
                                <Route path="/asset/:id" element={<AssetDetailPage />} />
                                <Route path="/edit-profile" element={<EditProfilePage />} />

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
