import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { UploadIcon } from "../components/icons/Icons";
import { useAppContext } from "../contexts/AppContext";
import { BackButton } from "../components/BackButton";

// --- Utility: Hash file for duplicate detection ---
const hashFile = async (file: File): Promise<string> => {
    try {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch (err) {
        console.error("File hashing failed:", err);
        return "";
    }
};

// --- Screenshot Blocker Provider ---
const usePreventScreenshot = () => {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey && e.key === "PrintScreen") || e.key === "PrintScreen") {
                alert("Screenshots are disabled for this page.");
                e.preventDefault();
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);
};

// --- Mint Confirmation Modal ---
const MintConfirmationModal: React.FC<{
    onConfirm: () => void;
    onCancel: () => void;
    isMinting: boolean;
    gasFee: string;
    networkFee: string;
}> = ({ onConfirm, onCancel, isMinting, gasFee, networkFee }) => {
    const total = (parseFloat(gasFee) + parseFloat(networkFee)).toFixed(3);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-surface rounded-lg p-6 max-w-sm w-full mx-4">
                <h2 className="text-xl font-bold text-primary">Confirm Mint</h2>
                <p className="text-text-secondary mt-2 mb-4">
                    Please review the transaction before proceeding.
                </p>
                <div className="bg-secondary/50 p-3 rounded-md text-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-text-secondary">Gas Estimate:</span>
                        <span className="font-mono text-text-primary">{gasFee} SUI</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-text-secondary">Network Fee:</span>
                        <span className="font-mono text-text-primary">{networkFee} SUI</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-secondary pt-2 mt-2">
                        <span className="text-text-primary">Total:</span>
                        <span className="font-mono text-primary">{total} SUI</span>
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
};

// --- Main Page ---
export const CreateItemPage: React.FC = () => {
    usePreventScreenshot();

    const { isAuthenticated, openWalletModal } = useAppContext();
    const navigate = useNavigate();

    // State
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [royalties, setRoyalties] = useState("0.1"); // default 0.1
    const [isMinting, setIsMinting] = useState(false);
    const [price, setPrice] = useState("");
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [qrId, setQrId] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Fees
    const gasFee = "0.025";
    const networkFee = "0.001";

    // File Upload
    const handleFileChange = useCallback(async (selectedFile: File | undefined) => {
        if (!selectedFile) return;

        if (selectedFile.size > 100 * 1024 * 1024) {
            alert("File size exceeds 100MB limit.");
            return;
        }

        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));

        const fileHash = await hashFile(selectedFile);
        console.log("File Hash:", fileHash);

        setIsDuplicate(Math.random() > 0.85);
    }, []);

    const handleLogoChange = (selectedFile: File | undefined) => {
        if (!selectedFile) return;
        setLogoFile(selectedFile);
        setLogoPreview(URL.createObjectURL(selectedFile));
    };

    const onDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            handleFileChange(e.dataTransfer.files?.[0]);
        },
        [handleFileChange]
    );

    const handleAttemptMint = () => {
        if (!isAuthenticated) {
            openWalletModal();
            return;
        }
        if (!file || !logoFile || !name.trim()) {
            alert("Please complete all required fields (artwork, logo, name).");
            return;
        }
        if (!qrId.trim()) {
            alert("Please provide an NFC tag ID.");
            return;
        }
        setShowConfirmModal(true);
    };

    const handleConfirmMint = () => {
        setIsMinting(true);
        console.log({
            file,
            logoFile,
            name,
            description,
            royalties,
            price,
            qrId,
        });

        setTimeout(() => {
            alert("Mint successful! (Simulated)");
            setIsMinting(false);
            setShowConfirmModal(false);

            // Revoke object URLs to free memory
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            if (logoPreview) URL.revokeObjectURL(logoPreview);

            // Reset form
            setFile(null);
            setPreviewUrl(null);
            setLogoFile(null);
            setLogoPreview(null);
            setName("");
            setDescription("");
            setRoyalties("0.1");
            setIsDuplicate(false);
            setQrId("");
        }, 2000);
    };

    return (
        <div className="pt-20 min-h-screen">
            {showConfirmModal && (
                <MintConfirmationModal
                    onConfirm={handleConfirmMint}
                    onCancel={() => setShowConfirmModal(false)}
                    isMinting={isMinting}
                    gasFee={gasFee}
                    networkFee={networkFee}
                />
            )}

            <div className="max-w-screen-lg mx-auto px-6 py-12">
                <BackButton />
                <h1 className="text-4xl font-bold mb-8 text-primary">Create New Item</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left - Form */}
                    <div className="space-y-6">
                        {/* Artwork Upload */}
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                Upload Artwork
                            </label>
                            <div
                                className="border-2 border-dashed border-secondary rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors bg-surface"
                                onDrop={onDrop}
                                onDragOver={(e) => e.preventDefault()}
                                onClick={() => document.getElementById("file-upload")?.click()}
                            >
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e.target.files?.[0])}
                                    accept="image/*,video/*,audio/*,.glb"
                                />
                                <UploadIcon className="mx-auto h-12 w-12 text-text-secondary" />
                                <p className="mt-2 text-sm text-text-secondary">
                                    <span className="font-semibold text-primary">Upload a file</span>{" "}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-text-secondary mt-1">
                                    PNG, JPG, GIF, MP4, MP3 up to 100MB
                                </p>
                            </div>
                            {isDuplicate && (
                                <p className="text-yellow-500 text-xs mt-2">
                                    Warning: This file appears to be a duplicate of an existing asset.
                                </p>
                            )}
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                Upload Logo (for watermark)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleLogoChange(e.target.files?.[0])}
                                className="w-full bg-surface border border-secondary rounded-lg px-3 py-2 text-sm text-text-primary file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary/80 cursor-pointer"
                            />
                            {logoPreview && (
                                <p className="text-xs text-green-500 mt-1">Logo ready for watermarking</p>
                            )}
                        </div>

                        {/* Metadata */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Item name"
                                className="w-full bg-surface border border-secondary rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary focus:ring-primary focus:border-primary focus:outline-none"
                            />
                        </div>

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
                                className="w-full bg-surface border border-secondary rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary focus:ring-primary focus:border-primary focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-text-secondary mb-2">
                                Price (SUI)
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="e.g. 2.5"
                                min="0"
                                step="0.01"
                                className="w-full bg-surface border border-secondary rounded-lg px-3 py-2
                                text-text-primary placeholder-text-secondary
                                focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none
                                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="royalties" className="block text-sm font-medium text-text-secondary mb-2">
                                Royalties (%)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="royalties"
                                    value={royalties}
                                    onChange={(e) => setRoyalties(e.target.value)}
                                    placeholder="e.g. 10"
                                    className="w-full bg-surface border border-secondary rounded-lg px-3 py-2 pr-10
                                    text-text-primary placeholder-text-secondary
                                    focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none
                                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                {/* Custom increment/decrement buttons */}
                                <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center mr-2">
                                    <button
                                        type="button"
                                        onClick={() => setRoyalties((prev) => String(Number(prev || 0) + 1))}
                                        className="w-5 h-5 flex items-center justify-center text-text-secondary hover:text-primary text-xs"
                                    >
                                        ▲
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRoyalties((prev) => String(Math.max(Number(prev || 0) - 1, 0)))}
                                        className="w-5 h-5 flex items-center justify-center text-text-secondary hover:text-primary text-xs"
                                    >
                                        ▼
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* NFC Tag */}
                        <div>
                            <label htmlFor="qrId" className="block text-sm font-medium text-text-secondary mb-2">
                                NFC Tag ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="qrId"
                                value={qrId}
                                onChange={(e) => setQrId(e.target.value)}
                                placeholder="Enter unique NFC tag identifier"
                                className="w-full bg-surface border border-secondary rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary focus:ring-primary focus:border-primary focus:outline-none"
                                required
                            />
                            <p className="text-xs text-text-secondary mt-1">
                                Every artwork must have a unique NFC tag ID.
                            </p>
                        </div>
                    </div>

                    {/* Right - Preview */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-primary">Preview</h2>
                        <div className="bg-surface rounded-lg p-4 sticky top-28">
                            <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-4 flex items-center justify-center relative">
                                {previewUrl ? (
                                    <>
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        {logoPreview && (
                                            <img
                                                src={logoPreview}
                                                alt="Watermark"
                                                className="absolute bottom-2 right-2 w-16 h-16 opacity-60"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <p className="text-text-secondary">Image preview</p>
                                )}
                            </div>
                            <h3 className="text-xl font-semibold text-text-primary">
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
