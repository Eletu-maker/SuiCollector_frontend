import React from "react";
import {
    useCurrentAccount,
    useConnectWallet,
    useDisconnectWallet,
    useWallets, ConnectButton
} from "@mysten/dapp-kit";
import { Wallet } from "../types";
import { useAppContext } from "../contexts/AppContext";
import { Button } from "./Button";
import { GoogleIcon } from "./icons/Icons";

export const ConnectWalletModal: React.FC = () => {
    const { isWalletModalOpen, closeWalletModal, connectWallet } = useAppContext();

    // dapp-kit hooks
    const currentAccount = useCurrentAccount();
    const { mutate: connect } = useConnectWallet(); // Corrected: access 'mutate' for connect
    const { mutate: disconnect } = useDisconnectWallet(); // Corrected: access 'mutate' for disconnect
    const wallets = useWallets();

    if (!isWalletModalOpen) return null;

    const handleZkLogin = () => {
        const zkWallet: Wallet = {
            name: "Google zkLogin",
            address: "0xzk...Ggl",
            balance: 0,
            icon: <GoogleIcon className="w-6 h-6" />,
            status: "Connected",
        };
        connectWallet(zkWallet, true);
        closeWalletModal();
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={closeWalletModal}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-surface rounded-2xl p-8 w-full max-w-md transform animate-fade-in-scale"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-center text-text-primary">
                    Connect Wallet
                </h2>
                <p className="text-text-secondary text-center mt-2 mb-6">
                    Choose your preferred wallet or sign in to continue.
                </p>

                <div className="space-y-3">
                    {/* zkLogin Option */}
                    <Button
                        variant="secondary"
                        className="w-full !justify-center flex items-center gap-3 py-3"
                        onClick={handleZkLogin}
                    >
                        <GoogleIcon className="w-5 h-5" />
                        Sign in with Google
                    </Button>

                    <div className="flex items-center text-xs text-text-secondary my-4">
                        <div className="flex-grow border-t border-secondary" />
                        <span className="mx-4">OR CONNECT WITH A WALLET</span>
                        <div className="flex-grow border-t border-secondary" />
                    </div>

                    {/* Wallets from dapp-kit */}
                    {wallets.map((w) => {
                        const isConnected = currentAccount && w.accounts.some(acc => acc.address === currentAccount.address);
                        return (
                            <div
                                key={w.name}
                                className={`flex items-center p-4 rounded-lg border transition-colors ${
                                    isConnected
                                        ? "bg-primary/10 border-primary"
                                        : "bg-surface hover:bg-secondary/40 border-transparent"
                                }`}
                            >
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                    {w.icon ? (
                                        <img
                                            src={w.icon}
                                            alt={`${w.name} logo`}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <span className="text-xs font-bold text-text-secondary">
                                            {w.name.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div className="ml-4 flex-grow">
                                    <h3 className="font-semibold text-text-primary">{w.name}</h3>
                                    {isConnected && (
                                        <p className="text-sm text-text-secondary">Connected</p>
                                    )}
                                </div>
                                {isConnected ? (
                                    <Button
                                        variant="secondary"
                                        className="px-3 py-1 text-xs"
                                        onClick={() => disconnect()}
                                    >
                                        Disconnect
                                    </Button>
                                ) : (
                                    // <Button
                                    //     onClick={() => connect({ wallet: w })} // Corrected: pass wallet object to connect
                                    //     className="px-4 py-2 text-sm"
                                    // >
                                    //     Connect
                                    // </Button>
                                    <ConnectButton />
                                )}
                            </div>
                        );
                    })}
                </div>

                <button className="text-sm text-primary w-full text-center mt-6">
                    Show more options
                </button>
            </div>

            <style>{`
        @keyframes fadeInScale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
        </div>
    );
};