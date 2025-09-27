import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { LogoIcon, SearchIcon } from "./icons/Icons";
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
    const navigate = useNavigate();

    // Wallet state
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

    // Restore zkLogin session
    useEffect(() => {
        const checkExistingZkLogin = async () => {
            const idToken = window.localStorage.getItem("zk_id_token");
            if (idToken && currentAccount) {
                setIsLoading(true);
                try {
                    const data = await loginWithZk(idToken);
                    setUser(data.user);
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

    // Helpers
    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm("");
        }
    };

    const handleWalletConnect = async () => {
        if (wallets.length > 0) {
            await connect({ wallet: wallets[0] });
        }
    };

    const handleZkLogin = async () => {
        try {
            setIsLoading(true);
            await startZkLogin(); // redirects to Google
        } catch (err) {
            console.error("zkLogin initiation failed:", err);
            setIsLoading(false);
        }
    };

    const handleConnectWithZk = async () => {
        await handleWalletConnect();
        setTimeout(() => handleZkLogin(), 1000);
    };

    const handleDisconnect = () => {
        window.localStorage.removeItem("zk_id_token");
        setUser(null);
        disconnect();
    };

    const getDisplayName = () => user?.name || currentWallet?.name || "Wallet";
    const getDisplayEmail = () =>
        user?.email ||
        (currentAccount
            ? `${currentAccount.address.slice(0, 6)}...${currentAccount.address.slice(-4)}`
            : "");
    const getUserAvatar = () =>
        user?.avatar ||
        (currentAccount ? `https://avatar.vercel.sh/${currentAccount.address}.svg` : "");

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
                        <Button onClick={handleSearch} className="ml-2 px-5 py-2.5 rounded-full">
                            Search
                        </Button>
                    </div>
                </div>

                {/* Right: Wallet + Identity */}
                <div className="flex items-center gap-5 shrink-0">
                    {currentAccount ? (
                        <div className="flex items-center gap-4 bg-surface px-4 py-2 rounded-full shadow-md">
                            {currentAccount && (
                                <img
                                    src={getUserAvatar()}
                                    alt={getDisplayName()}
                                    className="w-8 h-8 rounded-full"
                                />
                            )}
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-semibold text-text-primary">
                                    {isLoading ? "Loading..." : getDisplayName()}
                                </span>
                                <span className="text-xs text-text-secondary">
                                    {getDisplayEmail()}
                                </span>
                            </div>
                            {!user && (
                                <Button
                                    onClick={handleZkLogin}
                                    className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "..." : "Add Identity"}
                                </Button>
                            )}
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
