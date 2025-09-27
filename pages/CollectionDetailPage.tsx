import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MOCK_COLLECTIONS, MOCK_USER } from "../constants";
import { Button } from "../components/Button";
import { VerifiedIcon } from "../components/icons/Icons";

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
    >
        <span className="text-lg">←</span>
        <span>Back</span>
    </button>
);

export const CollectionDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // ✅ Find the collection from mock data
    const collection = MOCK_COLLECTIONS.find((c) => c.id === id);
    const creator = MOCK_USER; // Demo creator

    if (!collection) {
        return (
            <div className="pt-20 min-h-screen flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold">Collection not found</h2>
                <p className="text-text-secondary mt-2">
                    The collection you are looking for does not exist or has been moved.
                </p>
                <Button onClick={() => navigate("/collections")} className="mt-4">
                    Back to Collections
                </Button>
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-6 py-12">
                {/* Back Button */}
                <BackButton onClick={() => navigate(-1)} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Left side: Image */}
                    <div>
                        <div className="aspect-square bg-surface rounded-xl overflow-hidden shadow-2xl sticky top-28">
                            <img
                                src={collection.imageUrl}
                                alt={collection.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right side: Details */}
                    <div>
                        <p className="text-primary font-semibold">Collection</p>
                        <h1 className="text-4xl lg:text-5xl font-bold mt-2">
                            {collection.name}
                        </h1>

                        {/* Creator Info */}
                        <div className="flex items-center space-x-4 mt-6">
                            <img
                                src={creator.avatarUrl}
                                alt={creator.displayName}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <p className="text-sm text-text-secondary">Creator</p>
                                <div className="flex items-center">
                                    <p className="font-semibold text-text-primary">
                                        {creator.displayName}
                                    </p>
                                    {creator.isVerifiedArtist && (
                                        <VerifiedIcon className="w-5 h-5 ml-2 text-primary" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-8">
                            <h2 className="text-xl font-bold">Description</h2>
                            <p className="text-text-secondary mt-2 leading-relaxed">
                                {collection.description ||
                                    "No description provided for this collection."}
                            </p>
                        </div>

                        {/* Featured Assets */}
                        {collection.featuredAssets?.length > 0 && (
                            <div className="mt-8">
                                <h2 className="text-xl font-bold mb-4">Featured Assets</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {collection.featuredAssets.map((asset) => (
                                        <div
                                            key={asset.id}
                                            onClick={() =>
                                                navigate(`/asset/${asset.id}`, {
                                                    state: { asset },
                                                })
                                            }
                                            className="bg-surface rounded-lg p-3 shadow hover:shadow-lg transition cursor-pointer"
                                        >
                                            <img
                                                src={asset.imageUrl}
                                                alt={asset.name}
                                                className="rounded-md w-full aspect-square object-cover"
                                            />
                                            <p className="mt-2 font-semibold text-sm text-text-primary">
                                                {asset.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
