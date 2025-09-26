import React from "react";
import { Asset } from "../types";
import { useNavigate } from "react-router-dom";

interface AssetCardProps {
    asset: Asset;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
    const navigate = useNavigate();

    const handleViewAsset = () => {
        navigate(`/asset/${asset.id}`);
    };

    return (
        <button
            onClick={handleViewAsset}
            className="bg-surface rounded-lg overflow-hidden group text-left w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
            <div className="aspect-square overflow-hidden">
                <img
                    src={asset.imageUrl}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-text-primary truncate">{asset.name}</h3>
                {asset.price && asset.owner ? (
                    <div className="text-sm text-text-secondary mt-1">
                        <span className="font-bold text-primary">{asset.price} SUI</span>
                    </div>
                ) : (
                    <p className="text-sm text-text-secondary mt-1">Not for sale</p>
                )}
                <p className="text-xs text-text-secondary mt-2">
                    Creator:{" "}
                    <span className="font-medium text-text-primary">{asset.creator}</span>
                </p>
            </div>
        </button>
    );
};
