import React from "react";
import { MOCK_ASSETS } from "../../constants";
import { AssetCard } from "../../components/AssetCard";

const OwnedAssetsTab: React.FC = () => (
  <div>
    <h1 className="text-3xl font-bold text-text-primary mb-6">My Owned Assets</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {MOCK_ASSETS.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  </div>
);

export default OwnedAssetsTab;
