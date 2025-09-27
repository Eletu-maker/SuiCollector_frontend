import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { LogoIcon, SearchIcon } from "./icons/Icons";
import { useAppContext } from "@/contexts/AppContext";
import {
    useCurrentAccount,
    useConnectWallet,
    useDisconnectWallet,
    useWallets,
} from "@mysten/dapp-kit";
import { Link, useNavigate } from "react-router-dom";

interface User {
    name: string;
    email: string;
    username: string;
    walletAddress: string;
    profession: string,
    bio: string,
    socialTwitter: string,
    socialDiscord: string,
    socialWebsite: string,
}

// interface ApiResponse {
//     exists: boolean;
//     user?: User;
//     message: string;
//     walletAddress: string;
// }

export const Header: React.FC = () => {
    const { openWalletModal } = useAppContext();
    const navigate = useNavigate();

    const currentAccount = useCurrentAccount();
    const { mutate: connect } = useConnectWallet();
    const { mutate: disconnect } = useDisconnectWallet();
    const wallets = useWallets();

    const [searchTerm, setSearchTerm] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingUser, setIsCheckingUser] = useState(false);

    const currentWallet = wallets.find((w) =>
        w.accounts.some((acc) => acc.address === currentAccount?.address)
    );

    // Check if user exists in backend when wallet connects
    useEffect(() => {
        const checkUserExists = async () => {
            if (currentAccount?.address) {
                setIsCheckingUser(true);

                // Save wallet address to localStorage
                localStorage.setItem("walletAddress", currentAccount.address);
                const walletAddress = currentAccount.address;

                try {
                    // Call your backend API to check if user exists
                    console.log(walletAddress);
                    const response = await fetch(`https://sui-collect.onrender.com/users/verify-wallet`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ walletAddress })
                    });
                    const data = await response.json();
                    console.log(data)

                    if (data.exists && data.user) {
                        setUser(data.user);
                        // User exists, navigate to dashboard
                        navigate("/profile");
                    } else {
                        setUser(null);
                        // User doesn't exist, navigate to profile
                        console.log("user doesnt exist")
                        navigate("/create-profile");
                    }
                } catch (error) {
                    console.error("Error checking user:", error);
                    // If API fails, navigate to profile page
                    navigate("/profile");
                } finally {
                    setIsCheckingUser(false);
                }
            }
        };

        checkUserExists();
    }, [currentAccount?.address, navigate]);

    // Check for existing wallet connection on component mount
    useEffect(() => {
        const savedAddress = localStorage.getItem("walletAddress");
        if (savedAddress && !currentAccount) {
            // If we have a saved address but no current account,
            // the user might need to reconnect their wallet
            console.log("Found saved wallet address:", savedAddress);
        }
    }, [currentAccount]);

    // const handleExplore = () => {
    //     if (currentAccount) {
    //         navigate("/marketplace");
    //     } else {
    //         openWalletModal();
    //     }
    // };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm("");
        }
    };

    const handleWalletConnect = async () => {
        try {
            if (wallets.length > 0) {
                await connect({ wallet: wallets[0] });
            } else {
                console.warn("No wallets available");
                openWalletModal();
            }
        } catch (err) {
            console.error("Wallet connection failed:", err);
        }
    };

    const handleDisconnect = () => {
        // Clear all auth data
        localStorage.removeItem("walletAddress");
        setUser(null);
        disconnect();
        // Navigate to home after disconnect
        navigate("/");
    };

    const getDisplayName = () => {
        if (user?.name) return user.name;
        if (currentWallet?.name) return currentWallet.name;
        return "Wallet";
    };

    const getDisplayEmail = () => {
        if (user?.email) return user.email;
        if (currentAccount) {
            return `${currentAccount.address.slice(0, 6)}...${currentAccount.address.slice(-4)}`;
        }
        return "";
    };

    const getUserAvatar = () => {
        if (user?.avatar) return user.avatar;
        if (currentAccount) {
            return `https://avatar.vercel.sh/${currentAccount.address}.svg`;
        }
        return "";
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-xl z-50 shadow-lg">
            <div className="max-w-screen-2xl mx-auto px-8 h-24 flex items-center border-b border-gray-700">

                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <LogoIcon className="w-10 h-10 text-primary"/>
                    <span className="text-2xl font-extrabold text-text-primary">
                        SuiCollect
                    </span>
                </Link>

                <div className="flex-grow flex justify-center">
                    <div className="relative flex items-center hidden md:flex w-full max-w-md">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-[25%] w-5 h-5 text-text-secondary"/>
                        <input
                            type="text"
                            placeholder="Search assets, collections..."
                            className="bg-surface border border-secondary rounded-full pl-12 pr-4 py-3 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button
                            onClick={handleSearch}
                            className="ml-2 px-5 py-2.5 rounded-full"
                        >
                            Search
                        </Button>
                    </div>
                </div>


                <div className="flex items-center gap-5 shrink-0">
                    {currentAccount ? (
                        <div className="flex items-center gap-4 bg-surface px-4 py-2 rounded-full shadow-md">
                            {/* User Avatar */}
                            {(user?.avatar || currentAccount) && (
                                <img
                                    src={getUserAvatar()}
                                    alt={getDisplayName()}
                                    className="w-8 h-8 rounded-full"
                                />
                            )}

                            {/* User Info */}
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold text-text-primary">
                                    {isCheckingUser ? "Checking..." : getDisplayName()}
                                </span>
                                <span className="text-xs text-text-secondary">
                                    {getDisplayEmail()}
                                </span>
                            </div>

                            {/* Navigation button based on user status */}
                            {user ? (
                                <Button
                                    onClick={() => navigate("/dashboard")}
                                    className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-full"
                                >
                                    Dashboard
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => navigate("/profile")}
                                    className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                                >
                                    Complete Profile
                                </Button>
                            )}

                            {/* Disconnect Button */}
                            <Button
                                onClick={handleDisconnect}
                                className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-full"
                                disabled={isCheckingUser}
                            >
                                Disconnect
                            </Button>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Button
                                onClick={handleWalletConnect}
                                className="px-6 py-3 rounded-full shadow-md border border-primary"
                                variant="outline"
                                disabled={isLoading}
                            >
                                {isLoading ? "Connecting..." : "Connect Wallet"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
