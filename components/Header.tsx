import React, { useState } from "react";
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
import { loginWithZk, startZkLogin } from "@/services/authService";

interface User {
    name: string;
    email: string;
    avatar?: string;
}

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

    const currentWallet = wallets.find((w) =>
        w.accounts.some((acc) => acc.address === currentAccount?.address)
    );

    // Check for existing zkLogin session on component mount
    React.useEffect(() => {
        const checkExistingZkLogin = async () => {
            const idToken = window.localStorage.getItem("zk_id_token");
            if (idToken && currentAccount) {
                setIsLoading(true);
                try {
                    const data = await loginWithZk(idToken);
                    setUser(data.user);

                    // 👇 redirect to profile after successful login
                    navigate("/profile");
                } catch (err) {
                    console.error("zkLogin failed:", err);
                    window.localStorage.removeItem("zk_id_token");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        checkExistingZkLogin();
    }, [currentAccount, navigate]);


    const handleExplore = () => {
        if (currentAccount) {
            navigate("/marketplace");
        } else {
            openWalletModal();
        }
    };

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

    const handleZkLogin = async () => {
        try {
            setIsLoading(true);
            // Start zkLogin flow - this should redirect to OAuth provider
            await startZkLogin();
        } catch (err) {
            console.error("zkLogin initiation failed:", err);
            setIsLoading(false);
        }
    };

    const handleConnectWithZk = async () => {
        // First connect wallet, then initiate zkLogin
        await handleWalletConnect();
        // Give a small delay for wallet connection to establish
        setTimeout(() => {
            handleZkLogin();
        }, 1000);
    };

    const handleDisconnect = () => {
        // Clear all auth data
        window.localStorage.removeItem("zk_id_token");
        window.localStorage.removeItem("zk_login_state");
        setUser(null);
        disconnect();
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
                {/* Left: Logo */}
                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <LogoIcon className="w-10 h-10 text-primary" />
                    <span className="text-2xl font-extrabold text-text-primary">
                        SuiCollect
                    </span>
                </Link>

                {/* Middle: Search */}
                <div className="flex-grow flex justify-center">
                    <div className="relative flex items-center hidden md:flex w-full max-w-md">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-[25%] w-5 h-5 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search assets, collections..."
                            className="bg-surface border border-secondary rounded-full pl-12 pr-4 py-3 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <Button
                            onClick={handleSearch}
                            className="ml-2 px-5 py-2.5 rounded-full"
                        >
                            Search
                        </Button>
                    </div>
                </div>

                {/* Right: Wallet + Identity */}
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
                                    {isLoading ? "Loading..." : getDisplayName()}
                                </span>
                                <span className="text-xs text-text-secondary">
                                    {getDisplayEmail()}
                                </span>
                            </div>

                            {/* Additional zkLogin button if wallet connected but no zkLogin */}
                            {!user && (
                                <Button
                                    onClick={handleZkLogin}
                                    className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "..." : "Add Identity"}
                                </Button>
                            )}

                            {/* Disconnect Button */}
                            <Button
                                onClick={handleDisconnect}
                                className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-full"
                                disabled={isLoading}
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
                            >
                                Connect Wallet
                            </Button>
                            <Button
                                onClick={handleConnectWithZk}
                                className="px-6 py-3 rounded-full shadow-md"
                                disabled={isLoading}
                            >
                                {isLoading ? "Connecting..." : "zkLogin"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};