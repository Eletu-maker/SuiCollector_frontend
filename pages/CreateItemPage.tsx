import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { UploadIcon } from "../components/icons/Icons";
import { useAppContext } from "../contexts/AppContext";
import { BackButton } from "../components/BackButton"; // <- back button component

// Simulated hashing function
const hashFile = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const MintConfirmationModal: React.FC<{
    onConfirm: () => void;
    onCancel: () => void;
    isMinting: boolean;
}> = ({ onConfirm, onCancel, isMinting }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-surface rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold">Confirm Mint</h2>
            <p className="text-text-secondary mt-2 mb-4">
                You are about to mint this new item. Please review the details before
                proceeding.
            </p>
            <div className="bg-secondary/50 p-3 rounded-md text-sm space-y-2">
                <div className="flex justify-between">
                    <span className="text-text-secondary">Gas Estimate:</span>
                    <span className="font-mono text-text-primary">0.025 SUI</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-text-secondary">Network Fee:</span>
                    <span className="font-mono text-text-primary">0.001 SUI</span>
                </div>
                <div className="flex justify-between font-bold border-t border-secondary pt-2 mt-2">
                    <span className="text-text-primary">Total:</span>
                    <span className="font-mono text-primary">0.026 SUI</span>
                </div>
            </div>
            <div className="flex gap-4 mt-6">
                <Button variant="secondary" onClick={onCancel} className="w-full">
                    Cancel
                </Button>
                <Button onClick={onConfirm} className="w-full" disabled={isMinting}>
                    {isMinting ? "Confirming..." : "Confirm & Mint"}
                </Button>
            </div>
        </div>
    </div>
);

export const CreateItemPage: React.FC = () => {
    const { isAuthenticated, openWalletModal } = useAppContext();
    const navigate = useNavigate();

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [royalties, setRoyalties] = useState("");
    const [isMinting, setIsMinting] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [isPhysical, setIsPhysical] = useState(false);
    const [qrId, setQrId] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleFileChange = useCallback(async (selectedFile: File | undefined) => {
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));

            // Duplicate check
            const fileHash = await hashFile(selectedFile);
            console.log("File Hash:", fileHash);
            if (Math.random() > 0.8) {
                setIsDuplicate(true);
            } else {
                setIsDuplicate(false);
            }
        }
    }, []);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(e.target.files?.[0]);
    };

    const onDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            handleFileChange(e.dataTransfer.files?.[0]);
        },
        [handleFileChange]
    );

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleAttemptMint = () => {
        if (!isAuthenticated) {
            openWalletModal();
            return;
        }
        setShowConfirmModal(true);
    };

    const handleConfirmMint = () => {
        setIsMinting(true);
        console.log({ file, name, description, royalties, isPhysical, qrId });
        setTimeout(() => {
            alert("Mint successful! (Simulated)");
            setIsMinting(false);
            setShowConfirmModal(false);
            // Reset form
            setFile(null);
            setPreviewUrl(null);
            setName("");
            setDescription("");
            setRoyalties("");
            setIsDuplicate(false);
            setIsPhysical(false);
            setQrId("");
        }, 2000);
    };

    if (!isAuthenticated) {
        return (
            <div className="pt-20 min-h-screen flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold">Create New Item</h1>
                <p className="mt-4 text-text-secondary max-w-md">
                    You need to connect your wallet before you can mint a new digital
                    asset.
                </p>
                <Button onClick={openWalletModal} className="mt-6">
                    Connect Wallet
                </Button>
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen">
            {showConfirmModal && (
                <MintConfirmationModal
                    onConfirm={handleConfirmMint}
                    onCancel={() => setShowConfirmModal(false)}
                    isMinting={isMinting}
                />
            )}
            <div className="max-w-screen-lg mx-auto px-6 py-12">
                <BackButton /> {/* back to previous */}
                <h1 className="text-4xl font-bold mb-8">Create New Item</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div>
                        <div className="space-y-6">
                            {/* Upload */}
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2">
                                    Upload Asset
                                </label>
                                <div
                                    className="border-2 border-dashed border-secondary rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                                    onDrop={onDrop}
                                    onDragOver={onDragOver}
                                    onClick={() =>
                                        document.getElementById("file-upload")?.click()
                                    }
                                >
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={onFileChange}
                                        accept="image/*,video/*,audio/*,.glb"
                                    />
                                    <UploadIcon className="mx-auto h-12 w-12 text-text-secondary" />
                                    <p className="mt-2 text-sm text-text-secondary">
                    <span className="font-semibold text-primary">
                      Upload a file
                    </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p className="text-xs text-text-secondary mt-1">
                                        PNG, JPG, GIF, MP4, MP3 up to 100MB
                                    </p>
                                </div>
                                {isDuplicate && (
                                    <p className="text-yellow-500 text-xs mt-2">
                                        Warning: This file appears to be a duplicate of an existing
                                        asset.
                                    </p>
                                )}
                            </div>

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-text-secondary mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Item name"
                                    className="w-full bg-surface border border-secondary rounded-lg px-3 py-2 focus:ring-primary focus:border-primary focus:outline-none"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-text-secondary mb-2"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    placeholder="Provide a detailed description of your item"
                                    className="w-full bg-surface border border-secondary rounded-lg px-3 py-2 focus:ring-primary focus:border-primary focus:outline-none"
                                ></textarea>
                            </div>

                            {/* Royalties */}
                            <div>
                                <label
                                    htmlFor="royalties"
                                    className="block text-sm font-medium text-text-secondary mb-2"
                                >
                                    Royalties (%)
                                </label>
                                <input
                                    type="number"
                                    id="royalties"
                                    value={royalties}
                                    onChange={(e) => setRoyalties(e.target.value)}
                                    placeholder="e.g. 10"
                                    className="w-full bg-surface border border-secondary rounded-lg px-3 py-2 focus:ring-primary focus:border-primary focus:outline-none"
                                />
                            </div>

                            {/* Physical */}
                            <div className="flex items-center justify-between bg-surface p-3 rounded-lg">
                                <label
                                    htmlFor="isPhysical"
                                    className="font-medium text-text-primary"
                                >
                                    Is this a physical item?
                                </label>
                                <input
                                    type="checkbox"
                                    id="isPhysical"
                                    checked={isPhysical}
                                    onChange={(e) => setIsPhysical(e.target.checked)}
                                    className="h-6 w-6 rounded-md border-gray-300 text-primary focus:ring-primary"
                                />
                            </div>

                            {isPhysical && (
                                <div>
                                    <label
                                        htmlFor="qrId"
                                        className="block text-sm font-medium text-text-secondary mb-2"
                                    >
                                        QR/NFC Tag ID (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="qrId"
                                        value={qrId}
                                        onChange={(e) => setQrId(e.target.value)}
                                        placeholder="Enter unique identifier"
                                        className="w-full bg-surface border border-secondary rounded-lg px-3 py-2 focus:ring-primary focus:border-primary focus:outline-none"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Preview</h2>
                        <div className="bg-surface rounded-lg p-4 sticky top-28">
                            <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <p className="text-text-secondary">Image preview</p>
                                )}
                            </div>
                            <h3 className="text-xl font-semibold">
                                {name || "Item Name"}
                            </h3>
                            <p className="text-text-secondary mt-2 h-16 overflow-y-auto">
                                {description || "Description of the item will appear here."}
                            </p>
                            <Button
                                className="w-full mt-6 py-3 text-lg"
                                onClick={handleAttemptMint}
                                disabled={!file || !name}
                            >
                                Mint
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
