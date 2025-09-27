import React from "react";
import { User } from "../types";
import {
    AssetsIcon,
    MintIcon,
    PortfolioIcon,
    SettingsIcon,
    LogoutIcon,
    VerifiedIcon,
    ActivityIcon,
} from "../components/icons/Icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const UserProfileCard = ({
    user,
    wallet,
}: {
    user: User;
    wallet: { address: string; balance: number };
}) => (
    <div className="p-4 rounded-lg bg-surface text-center">
        <img
            src={user.avatarUrl}
            alt={user.displayName}
            className="w-24 h-24 rounded-full mx-auto border-4 border-secondary"
        />
        <div className="flex items-center justify-center mt-4">
            <h2 className="text-xl font-bold text-text-primary">{user.displayName}</h2>
            {user.isVerifiedArtist && (
                <VerifiedIcon className="w-5 h-5 ml-2 text-primary" />
            )}
        </div>
        <p className="text-sm text-text-secondary mt-1">@{user.username}</p>
        <p className="text-xs mt-4 bg-secondary/50 dark:bg-secondary/50 rounded-md p-2 font-mono break-all">
            {wallet.address}
        </p>
        <p className="mt-2 text-lg font-bold text-primary">{wallet.balance} SUI</p>
    </div>
);

const ProfileLayout: React.FC<{
    user: User;
    wallet: { address: string; balance: number };
    disconnectWallet: () => void;
}> = ({ user, wallet, disconnectWallet }) => {
    const navigate = useNavigate();

    if (!user || !wallet) {
        return (
            <div className="pt-20 flex items-center justify-center h-screen">
                Redirecting...
            </div>
        );
    }

    return (
        <div className="flex min-h-screen pt-20">
            {/* Sidebar */}
            <aside className="custom-scrollbar fixed top-0 left-0 w-72 h-full bg-background border-r border-secondary pt-20 overflow-y-auto">
                <div className="p-6 h-full flex flex-col">
                    {/* User profile card */}
                    <UserProfileCard user={user} wallet={wallet} />

                    {/* ✅ Mint Asset Button */}
                    

                    {/* Navigation Links */}
                    <nav className="flex-grow space-y-2 mt-6">
                        <NavLink
                            to="mint"
                           
                        >
                            <button
                        
                        className="flex items-center justify-center w-full mt-6 px-4 py-3 bg-primary text-white rounded-lg text-sm font-semibold transition hover:bg-primary/80"
                    >
                        <MintIcon className="w-5 h-5 mr-2" />
                        Mint Asset
                    </button>
                        </NavLink>

    console.log(user);
    // console.log(wallet)


                        <NavLink
                            to="owned"
                            className={({ isActive }) =>
                                `flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                }`
                            }
                        >
                            <AssetsIcon className="w-5 h-5 mr-3" />
                            Owned Assets
                        </NavLink>

                        <NavLink
                            to="created"
                            className={({ isActive }) =>
                                `flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                }`
                            }
                        >
                            <MintIcon className="w-5 h-5 mr-3" />
                            Created Assets
                        </NavLink>

                        <NavLink
                            to="activity"
                            className={({ isActive }) =>
                                `flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                }`
                            }
                        >
                            <ActivityIcon className="w-5 h-5 mr-3" />
                            Activity Feed
                        </NavLink>

                        <NavLink
                            to="portfolio"
                            className={({ isActive }) =>
                                `flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                                    isActive
                                        ? "bg-primary text-white"
                                        : "text-text-secondary hover:bg-surface hover:text-text-primary"
                                }`
                            }
                        >
                            <PortfolioIcon className="w-5 h-5 mr-3" />
                            Portfolio
                        </NavLink>
                    </nav>

                    {/* Settings + Logout */}
                    <div className="mt-auto space-y-2">
                        <NavLink to="settings">
                        <button
                            
                            className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-colors text-text-secondary hover:bg-surface hover:text-text-primary"
                        >
                            <SettingsIcon className="w-5 h-5 mr-3" />
                            Settings
                        </button>
                            </NavLink>
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-colors text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                            <LogoutIcon className="w-5 h-5 mr-3" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="ml-72 flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default ProfileLayout;
