import React from 'react';
import { ProfileLayout } from '../components/DashboardLayout';
import { useAppContext } from '../contexts/AppContext';
import { AssetCard } from '../components/AssetCard';
import { MOCK_ASSETS, MOCK_CREATED_ASSETS, MOCK_ACTIVITY_FEED } from '../constants';
import { PortfolioTrackerPage } from './PortfolioTrackerPage';
import { ActivityFeedItem } from '../types';
import { BackButton } from '../components/BackButton'; // ✅ import

const OwnedAssetsTab: React.FC = () => (
    <div>
        <h1 className="text-3xl font-bold text-text-primary mb-6">My Owned Assets</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_ASSETS.map(asset => (
                <AssetCard key={asset.id} asset={asset} />
            ))}
        </div>
    </div>
);

const CreatedAssetsTab: React.FC = () => (
    <div>
        <h1 className="text-3xl font-bold text-text-primary mb-6">My Created Assets</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_CREATED_ASSETS.map(asset => (
                <AssetCard key={asset.id} asset={asset} />
            ))}
        </div>
    </div>
);

const ActivityFeedTab: React.FC = () => {
    const renderActionText = (item: ActivityFeedItem) => {
        switch (item.action) {
            case 'minted':
                return <>minted <span className="font-bold text-text-primary">{item.asset.name}</span></>;
            case 'purchased':
                return <>purchased <span className="font-bold text-text-primary">{item.asset.name}</span> for <span className="font-bold text-primary">{item.price} SUI</span></>;
            case 'listed':
                return <>listed <span className="font-bold text-text-primary">{item.asset.name}</span> for <span className="font-bold text-primary">{item.price} SUI</span></>;
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-primary mb-6">Activity Feed</h1>
            <div className="space-y-4">
                {MOCK_ACTIVITY_FEED.map(item => (
                    <div key={item.id} className="flex items-center p-4 bg-surface rounded-lg">
                        <img src={item.user.avatarUrl} alt={item.user.name} className="w-10 h-10 rounded-full" />
                        <div className="ml-4 flex-grow">
                            <p className="text-sm">
                                <span className="font-bold text-text-primary">{item.user.name}</span> {renderActionText(item)}
                            </p>
                            <p className="text-xs text-text-secondary">{item.timestamp}</p>
                        </div>
                        <img src={item.asset.imageUrl} alt={item.asset.name} className="w-12 h-12 rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ProfilePage: React.FC = () => {
    const { currentProfileTab, user, wallet, disconnectWallet } = useAppContext();

    console.log(user);
    // console.log(wallet)


    const renderTabContent = () => {
        switch (currentProfileTab) {
            case 'owned':
                return <OwnedAssetsTab />;
            case 'created':
                return <CreatedAssetsTab />;
            case 'activity':
                return <ActivityFeedTab />;
            case 'portfolio':
                return <PortfolioTrackerPage />;
            default:
                return <OwnedAssetsTab />;
        }
    };

    return (
        <ProfileLayout
            user={user}
            wallet={wallet}
            disconnectWallet={disconnectWallet}
        >
            <BackButton label="Go Back" />
            {renderTabContent()}
        </ProfileLayout>
    );
};
