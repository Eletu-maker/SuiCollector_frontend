import React, { useState, useEffect } from 'react';
import { AssetCard } from '../components/AssetCard';
import { MOCK_MARKETPLACE_ASSETS } from '../constants';
import { SearchIcon, ChevronDownIcon } from '../components/icons/Icons';
import { Asset } from '../types';
import { BackButton } from '../components/BackButton';

const FilterDropdown: React.FC<{ label: string }> = ({ label }) => (
    <button className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg text-sm font-medium text-text-secondary hover:bg-secondary">
        {label}
        <ChevronDownIcon className="w-4 h-4" />
    </button>
);

const AssetCardSkeleton: React.FC = () => (
    <div className="bg-surface rounded-lg overflow-hidden animate-pulse">
        <div className="aspect-square bg-secondary"></div>
        <div className="p-4">
            <div className="h-4 bg-secondary rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-secondary rounded w-1/2"></div>
            <div className="h-3 bg-secondary rounded w-1/3 mt-2"></div>
        </div>
    </div>
);

export const MarketplacePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setLoading(true);
        setTimeout(() => {
            setAssets(MOCK_MARKETPLACE_ASSETS);
            setLoading(false);
        }, 1500);
    }, []);

    const filteredAssets = assets.filter(asset =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.owner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.creator.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pt-20 min-h-screen relative">
            {/* Back button */}
            <BackButton label="Back" />

            <div className="max-w-screen-2xl mx-auto px-6 py-8">
                <header className="mb-8">
                    <div className="relative">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-text-secondary" />
                        <input
                            type="text"
                            placeholder="Search items, collections, and creators"
                            className="bg-surface border-2 border-secondary rounded-xl w-full pl-14 pr-4 py-4 text-lg focus:ring-primary focus:border-primary focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                        <FilterDropdown label="Price" />
                        <FilterDropdown label="Artist" />
                        <FilterDropdown label="Category" />
                        <button className="px-4 py-2 bg-primary rounded-lg text-sm font-medium text-white">
                            Recently Listed
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => <AssetCardSkeleton key={i} />)
                    ) : (
                        filteredAssets.map(asset => (
                            <AssetCard key={asset.id} asset={asset} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
