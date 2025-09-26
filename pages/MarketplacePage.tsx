import React, { useState, useEffect, useMemo } from 'react';
import { AssetCard } from '../components/AssetCard';
import { MOCK_MARKETPLACE_ASSETS } from '../constants';
import { SearchIcon, ChevronDownIcon } from '../components/icons/Icons';
import { Asset } from '../types';
import { BackButton } from '../components/BackButton';

const FilterDropdown: React.FC<{ label: string; options: string[]; onSelect: (value: string) => void }> = ({ label, options, onSelect }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg text-sm font-medium text-text-secondary hover:bg-secondary"
            >
                {label}
                <ChevronDownIcon className="w-4 h-4" />
            </button>

            {open && (
                <div className="absolute z-10 mt-2 w-40 bg-surface border border-secondary rounded-lg shadow-lg">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            onClick={() => {
                                onSelect(opt);
                                setOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-secondary text-sm"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

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

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedPrice, setSelectedPrice] = useState<string>('All');

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            // Sanitize data to ensure price and owner are always defined
            const sanitizedAssets = MOCK_MARKETPLACE_ASSETS.map(asset => ({
                ...asset,
                price: asset.price ?? 0,
                owner: asset.owner || "Unknown Owner",
                royalties: asset.royalties ?? 0,
            }));
            setAssets(sanitizedAssets);
            setLoading(false);
        }, 1000);
    }, []);

    // Extract categories dynamically from assets
    const categories = useMemo(() => {
        const unique = Array.from(new Set(assets.map(a => a.category)));
        return ['All', ...unique];
    }, [assets]);

    const filteredAssets = assets.filter((asset) => {
        const matchesSearch =
            asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.creator.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === 'All' || asset.category === selectedCategory;

        const matchesPrice =
            selectedPrice === 'All' ||
            (selectedPrice === '< 0.5' && asset.price < 0.5) ||
            (selectedPrice === '0.5 - 0.8' && asset.price >= 0.5 && asset.price <= 0.8) ||
            (selectedPrice === '> 0.8' && asset.price > 0.8);

        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div className="pt-20 min-h-screen relative">
            {/* Back button */}
            

            <div className="max-w-screen-2xl mx-auto px-6 py-8">
                <header className="mb-8 flex items-center gap-4">
                   {/* Back button */}
    <BackButton label="Back" />

    {/* Search bar */}
    <div className="flex items-center gap-3 flex-1 bg-surface border-2 border-secondary rounded-xl px-4 py-3">
        <SearchIcon className="w-6 h-6 text-text-secondary" />
        <input
            type="text"
            placeholder="Search items, collections, and creators"
            className="w-full bg-transparent focus:outline-none text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
                    {/* Filters */}
                    <div className="flex items-center gap-4 mt-6 flex-wrap">
                        <FilterDropdown
                            label={`Category: ${selectedCategory}`}
                            options={categories}
                            onSelect={setSelectedCategory}
                        />
                        <FilterDropdown
                            label={`Price: ${selectedPrice}`}
                            options={['All', '< 0.5', '0.5 - 0.8', '> 0.8']}
                            onSelect={setSelectedPrice}
                        />
                        <button
                            className="px-4 py-2 bg-primary rounded-lg text-sm font-medium text-white"
                            onClick={() => {
                                setSelectedCategory('All');
                                setSelectedPrice('All');
                                setSearchTerm('');
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                </header>

                {/* Asset grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => <AssetCardSkeleton key={i} />)
                    ) : filteredAssets.length > 0 ? (
                        filteredAssets.map((asset) => (
                            <AssetCard key={asset.id} asset={asset} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-text-secondary mt-10">
                            No assets found matching your filters.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
