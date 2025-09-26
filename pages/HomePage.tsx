import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Asset, Collection } from "../types";
import { MOCK_COLLECTIONS, MOCK_TRENDING_ASSETS } from "../constants";
import { Button } from "../components/Button";
import { useAppContext } from "../contexts/AppContext";
import CountUp from "react-countup";
// @ts-ignore
import image from "../assets/hero-bg.jpg";

const StatCard: React.FC<{ value: number; label: string }> = ({ value, label }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    return (
        <div ref={ref} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-4xl font-extrabold text-text-primary">
                {inView ? <CountUp start={0} end={value} duration={2} separator="," /> : "0"}
            </p>
            <p className="text-text-secondary mt-2 text-lg">{label}</p>
        </div>
    );
};

const CollectionCard: React.FC<{ collection: Collection }> = ({ collection }) => (
    <Link
        to={`/collections/${collection.id}`}
        className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group border border-gray-700"
    >
        <div className="aspect-[4/3] overflow-hidden bg-gray-700">
            <img
                src={collection.imageUrl}
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
            />
        </div>
        <div className="p-4 bg-surface">
            <h3 className="font-semibold text-lg text-text-primary">{collection.name}</h3>
            <p className="text-sm text-text-secondary mt-1">{collection.description}</p>
        </div>
    </Link>
);

const TrendingAssetCard: React.FC<{ asset: Asset }> = ({ asset }) => (
    <Link
        to={`/assets/${asset.id}`}
        className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group border border-gray-700"
    >
        <div className="aspect-square overflow-hidden bg-gray-700">
            <img
                src={asset.imageUrl}
                alt={asset.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
            />
        </div>
        <div className="p-3 bg-surface">
            <h4 className="font-semibold text-base text-text-primary truncate">{asset.name}</h4>
            <p className="text-xs text-text-secondary truncate">
                {asset.category === "Art" ? "Digital Art" : asset.category}
            </p>
        </div>
    </Link>
);

const CategoryCard: React.FC<{ name: string; icon: string }> = ({ name, icon }) => (
    <div className="bg-surface rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-700">
        <div className="text-4xl mb-4 text-primary">{icon}</div>
        <h3 className="font-semibold text-lg text-text-primary">{name}</h3>
    </div>
);

const HowItWorksStep: React.FC<{ step: number; title: string; description: string }> = ({
    step,
    title,
    description,
}) => (
    <div className="bg-surface p-6 rounded-xl shadow-md border border-gray-700">
        <div className="flex items-center mb-4">
            <div className="bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center text-xl font-bold mr-4">
                {step}
            </div>
            <h3 className="text-2xl font-bold text-text-primary">{title}</h3>
        </div>
        <p className="text-text-secondary">{description}</p>
    </div>
);

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const { openWalletModal, isAuthenticated } = useAppContext();

    const [showAllCollections, setShowAllCollections] = useState(false);

    const handleExplore = () => {
        if (isAuthenticated) {
            navigate("/marketplace");
        } else {
            openWalletModal();
        }
    };

    return (
        <div className="pt-20 bg-background min-h-screen text-text-primary">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center text-center px-4 mx-8 mt-4 md:mx-10 md:mt-8 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-0"></div>
                <img
                    src={image}
                    alt="Background of diverse digital collectibles"
                    className="absolute inset-0 w-full h-full object-fill animate-fade-in-slow"
                />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
                        Discover, Collect, and Trade Unique Digital Assets
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-200 drop-shadow-md">
                        Your gateway to a vibrant world of NFTs on the Sui blockchain: from stunning art and rare
                        collectibles to immersive gaming items and exclusive domains.
                    </p>
                    <Button
                        onClick={handleExplore}
                        className="mt-10 px-12 py-5 text-lg font-semibold rounded-full shadow-xl hover:scale-105 transition-transform duration-300 bg-primary hover:bg-primary-dark"
                    >
                        Explore The Marketplace
                    </Button>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="max-w-screen-xl mx-auto py-20 px-6">
                <h2 className="text-4xl font-bold mb-16 text-center text-text-primary">Our Growing Ecosystem</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <StatCard value={1200000} label="Total Assets Listed" />
                    <StatCard value={500000} label="Unique Collectors" />
                    <StatCard value={2500000} label="Transactions Completed" />
                </div>
            </section>

            {/* Discover by Category */}
            <section className="max-w-screen-xl mx-auto py-20 px-6">
                <h2 className="text-4xl font-bold mb-16 text-center text-text-primary">Discover by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                    <CategoryCard name="Art" icon="🎨" />
                    <CategoryCard name="Collectibles" icon="💎" />
                    <CategoryCard name="Gaming" icon="🎮" />
                    <CategoryCard name="Music" icon="🎶" />
                    <CategoryCard name="Domains" icon="🌐" />
                    <CategoryCard name="Photography" icon="📸" />
                    <CategoryCard name="Sports" icon="🏅" />
                    <CategoryCard name="Utility" icon="🛠️" />
                    <CategoryCard name="Virtual Worlds" icon="🌌" />
                    <CategoryCard name="Fashion" icon="👗" />
                </div>
            </section>

            {/* Featured Collections */}
            <section className="max-w-screen-xl mx-auto py-20 px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <h2 className="text-4xl font-bold mb-6 md:mb-0">
                        {showAllCollections ? "All Collections" : "Top Collections This Week"}
                    </h2>
                    <Button
                        onClick={() => setShowAllCollections((prev) => !prev)}
                        className="px-8 py-3 text-base rounded-full shadow-md hover:scale-105 transition-transform duration-300 bg-secondary hover:bg-secondary-dark"
                    >
                        {showAllCollections ? "Show Less" : "View All Collections"}
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {(showAllCollections ? MOCK_COLLECTIONS : MOCK_COLLECTIONS.slice(0, 3)).map((collection) => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>
            </section>

            {/* Trending Assets */}
            <section className="max-w-screen-xl mx-auto py-20 px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <h2 className="text-4xl font-bold mb-6 md:mb-0">Hot New Assets</h2>
                    <Button
                        onClick={() => navigate("/marketplace")}
                        className="px-8 py-3 text-base rounded-full shadow-md hover:scale-105 transition-transform duration-300 bg-secondary hover:bg-secondary-dark"
                    >
                        Explore Full Marketplace
                    </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {MOCK_TRENDING_ASSETS.slice(0, 5).map((asset) => (
                        <TrendingAssetCard key={asset.id} asset={asset} />
                    ))}
                </div>
            </section>

            {/* How it Works */}
            <section className="max-w-screen-xl mx-auto py-20 px-6">
                <h2 className="text-4xl font-bold mb-16 text-center text-text-primary">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <HowItWorksStep
                        step={1}
                        title="Set Up Your Wallet"
                        description="Connect your preferred Sui wallet in seconds to start your NFT journey."
                    />
                    <HowItWorksStep
                        step={2}
                        title="Explore & Discover"
                        description="Browse thousands of unique digital assets across various categories. Find your next treasure."
                    />
                    <HowItWorksStep
                        step={3}
                        title="Buy or Sell NFTs"
                        description="Easily buy assets at fixed prices or place bids. List your own creations or collectibles for sale."
                    />
                </div>
            </section>

            {/* Community Spotlight */}
            <section className="max-w-screen-xl mx-auto py-20 px-6 text-center">
                <h2 className="text-4xl font-bold mb-8 text-text-primary">Join Our Thriving Community</h2>
                <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-12">
                    Be part of a growing network of creators, collectors, and enthusiasts. Connect, share, and grow with
                    us.
                </p>
                <div className="flex justify-center space-x-6">
                    <Button className="px-8 py-4 text-lg rounded-full shadow-lg bg-primary hover:bg-primary-dark">
                        Join Discord
                    </Button>
                    <Button className="px-8 py-4 text-lg rounded-full shadow-lg bg-secondary hover:bg-secondary-dark">
                        Follow on X
                    </Button>
                </div>
            </section>
        </div>
    );
};
