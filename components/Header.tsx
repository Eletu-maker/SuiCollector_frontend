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

export const Header: React.FC = () => {
  const { openWalletModal } = useAppContext();
  const navigate = useNavigate();

  // Wallet state from dapp-kit
  const currentAccount = useCurrentAccount();
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const wallets = useWallets();

  const currentWallet = wallets.find((w) =>
    w.accounts.some((acc) => acc.address === currentAccount?.address)
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleExplore = () => {
    if (currentAccount) {
      navigate("/marketplace");
    } else {
      openWalletModal();
      // Or connect(); if you prefer dapp-kit’s modal
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
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
          <div className="relative hidden md:flex w-full max-w-md">
            {/* Search Bar with Icon */}
            <div className="flex items-center bg-surface border border-secondary rounded-full pl-4 pr-4 w-full">
              <SearchIcon className="w-5 h-5 text-text-secondary mr-3" />
              <input
                type="text"
                placeholder="Search assets, collections..."
                className="bg-transparent flex-grow focus:outline-none text-text-primary py-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            {/* Search Button Outside the Border */}
            <Button
              onClick={handleSearch}
              className="ml-2 px-5 py-2.5 rounded-full"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Right: Wallet */}
        <div className="flex items-center gap-5 shrink-0">
          {currentAccount ? (
            <div className="flex items-center gap-4 bg-surface px-4 py-2 rounded-full shadow-md">
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-text-primary">
                  {currentWallet?.name || "Wallet"}
                </span>
                <span className="text-xs text-text-secondary">
                  {currentAccount.address.slice(0, 6)}...
                  {currentAccount.address.slice(-4)}
                </span>
              </div>
              <Button
                onClick={() => disconnect()}
                className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-full"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              onClick={openWalletModal}
              className="px-6 py-3 rounded-full shadow-md"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
