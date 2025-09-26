import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CLUBS } from '../constants';
import { AssetCard } from '../components/AssetCard';
import { Button } from '../components/Button';

// BackButton component
const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
    >
        <span className="text-lg">←</span>
        <span>Back</span>
    </button>
);

export const ClubDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // grab `id` from the route
    const navigate = useNavigate();

    const club = MOCK_CLUBS.find(c => c.id === id);

    if (!club) {
        return (
            <div className="pt-20 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold">Club not found</h2>
                <Button
                    onClick={() => navigate("/clubs")}
                    className="mt-4"
                >
                    Back to Clubs
                </Button>
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-6">
                {/* Back button */}
                <BackButton onClick={() => navigate("/clubs")} />
            </div>

            <header className="relative h-64 bg-surface">
                <img
                    src={club.imageUrl}
                    alt={`${club.name} banner`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            </header>

            <div className="max-w-screen-xl mx-auto px-6 pb-12 -mt-16">
                <div className="flex items-end space-x-6">
                    <div className="w-32 h-32 rounded-lg bg-surface border-4 border-background shadow-lg overflow-hidden">
                        <img
                            src={club.imageUrl.replace('600/400', '400/400')}
                            alt={club.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">{club.name}</h1>
                        <p className="text-text-secondary mt-1">
                            {club.memberCount.toLocaleString()} Members
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                    <div className="lg:col-span-1">
                        <div className="bg-surface p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-2">About {club.name}</h2>
                            <p className="text-text-secondary text-sm">{club.description}</p>

                            <h3 className="text-lg font-bold mt-6 mb-4">Members</h3>
                            <div className="flex items-center space-x-2">
                                {club.members.map(member => (
                                    <img
                                        key={member.name}
                                        src={member.avatarUrl}
                                        alt={member.name}
                                        title={member.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                ))}
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs text-text-secondary">
                                    +...
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-6">Featured Assets</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {club.featuredAssets.map(asset => (
                                <AssetCard key={asset.id} asset={asset} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
