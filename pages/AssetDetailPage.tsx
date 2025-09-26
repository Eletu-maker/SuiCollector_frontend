import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_ASSETS, MOCK_CREATED_ASSETS, MOCK_MARKETPLACE_ASSETS, MOCK_PROVENANCE, MOCK_USER, MOCK_CLUBS } from '../constants';
import { Asset } from '../types';
import { Button } from '../components/Button';
import { VerifiedIcon } from '../components/icons/Icons';

// BackButton Component
const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
    >
        <span className="text-lg">←</span>
        <span>Back</span>
    </button>
);

const BuyConfirmationModal: React.FC<{
    asset: Asset;
    onConfirm: () => void;
    onCancel: () => void;
    isPurchasing: boolean;
}> = ({ asset, onConfirm, onCancel, isPurchasing }) => (
    <div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        onClick={onCancel}
    >
        <div
            className="bg-surface rounded-lg p-6 max-w-sm w-full mx-auto animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-xl font-bold">Confirm Purchase</h2>
            <p className="text-text-secondary mt-2 mb-4">You are about to buy "{asset.name}".</p>
            <div className="flex items-center space-x-4 bg-secondary/50 p-3 rounded-lg">
                <img src={asset.imageUrl} alt={asset.name} className="w-16 h-16 rounded-md object-cover" />
                <div>
                    <h3 className="font-bold text-text-primary">{asset.name}</h3>
                    <p className="font-mono text-primary text-lg">{asset.price} SUI</p>
                </div>
            </div>
            <div className="bg-secondary/50 p-3 rounded-md text-sm space-y-2 mt-4">
                <div className="flex justify-between">
                    <span className="text-text-secondary">Network Fee (est.):</span>
                    <span className="font-mono text-text-primary">0.002 SUI</span>
                </div>
                <div className="flex justify-between font-bold border-t border-secondary pt-2 mt-2">
                    <span className="text-text-primary">Total:</span>
                    <span className="font-mono text-primary">{(asset.price! + 0.002).toFixed(3)} SUI</span>
                </div>
            </div>
            <div className="flex gap-4 mt-6">
                <Button variant="secondary" onClick={onCancel} className="w-full" disabled={isPurchasing}>
                    Cancel
                </Button>
                <Button onClick={onConfirm} className="w-full" disabled={isPurchasing}>
                    {isPurchasing ? 'Processing...' : 'Confirm & Buy'}
                </Button>
            </div>
        </div>
        <style>{`
            @keyframes fadeInScale {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .animate-fade-in-scale {
                animation: fadeInScale 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
        `}</style>
    </div>
);

export const AssetDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isPurchasing, setIsPurchasing] = useState(false);

    // Combine all asset sources to find the asset
    const allAssets = [
        ...MOCK_ASSETS,
        ...MOCK_CREATED_ASSETS,
        ...MOCK_MARKETPLACE_ASSETS,
        ...MOCK_CLUBS.flatMap((c) => c.featuredAssets),
    ];
    const asset = allAssets.find((a) => a.id === id);
    const provenance = MOCK_PROVENANCE.find((p) => p.assetId === id);

    const creator = MOCK_USER; // placeholder creator data

    const handleBuyNowClick = () => {
        // Replace this with actual auth/wallet logic later
        setShowConfirmModal(true);
    };

    const handleConfirmPurchase = () => {
        setIsPurchasing(true);
        console.log(`Simulating purchase for asset: ${asset?.name}`);
        setTimeout(() => {
            setIsPurchasing(false);
            setShowConfirmModal(false);
            alert(`Successfully purchased ${asset?.name}! (Simulated)`);
        }, 2000);
    };

    if (!asset) {
        return (
            <div className="pt-20 min-h-screen flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold">Asset not found</h2>
                <p className="text-text-secondary mt-2">The asset you are looking for does not exist or has been moved.</p>
                <Button onClick={() => navigate('/marketplace')} className="mt-4">
                    Back to Marketplace
                </Button>
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen">
            {showConfirmModal && (
                <BuyConfirmationModal
                    asset={asset}
                    onConfirm={handleConfirmPurchase}
                    onCancel={() => setShowConfirmModal(false)}
                    isPurchasing={isPurchasing}
                />
            )}

            <div className="max-w-screen-xl mx-auto px-6 py-12">
                {/* Back Button */}
                <BackButton onClick={() => navigate(-1)} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left side: Image */}
                    <div>
                        <div className="aspect-square bg-surface rounded-xl overflow-hidden sticky top-28 shadow-2xl">
                            <img src={asset.imageUrl} alt={asset.name} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Right side: Details */}
                    <div>
                        <p className="text-primary font-semibold">{asset.category}</p>
                        <h1 className="text-4xl lg:text-5xl font-bold mt-2">{asset.name}</h1>

                        <div className="flex items-center space-x-4 mt-6">
                            <img src={creator.avatarUrl} alt={creator.displayName} className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="text-sm text-text-secondary">Creator</p>
                                <div className="flex items-center">
                                    <p className="font-semibold text-text-primary">{creator.displayName}</p>
                                    {creator.isVerifiedArtist && <VerifiedIcon className="w-5 h-5 ml-2 text-primary" />}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-surface p-6 rounded-lg border border-secondary">
                            <p className="text-sm text-text-secondary">Current Price</p>
                            <p className="text-3xl font-bold text-primary">
                                {asset.price ? `${asset.price} SUI` : 'Not for sale'}
                            </p>
                            {asset.price && (
                                <Button onClick={handleBuyNowClick} className="w-full mt-4 py-3 text-lg">
                                    Buy Now
                                </Button>
                            )}
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-bold">Description</h2>
                            <p className="text-text-secondary mt-2 leading-relaxed">
                                {asset.description || 'No description provided for this asset.'}
                            </p>
                        </div>

                        {provenance && (
                            <div className="mt-8">
                                <h2 className="text-xl font-bold">Ownership History</h2>
                                <div className="mt-4 space-y-3 text-sm border border-secondary rounded-lg p-4 bg-surface/50">
                                    <div>
                                        <p className="font-semibold text-text-secondary">Current Owner</p>
                                        <p className="text-text-primary font-medium">{provenance.currentOwner}</p>
                                    </div>
                                    {provenance.previousOwners.length > 0 && (
                                        <div className="border-t border-secondary pt-3 mt-3">
                                            <p className="font-semibold text-text-secondary">Previous Owners</p>
                                            <ul className="list-disc list-inside text-text-secondary mt-1 space-y-1">
                                                {provenance.previousOwners.map((owner, index) => (
                                                    <li key={index}>
                                                        <span className="text-text-primary">{owner}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
