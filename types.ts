export enum Page {
  Home,
  MyAssets,
  MintNewAsset,
  Marketplace,
  PortfolioTracker,
  Settings,
  EditProfile,
  Profile,
  Clubs,
  ClubDetail,
  AssetDetail,
}

export type Theme = 'light' | 'dark';

export interface Asset {
  id: string;
  name: string;
  imageUrl: string;
  price?: number;
  owner?: string;
  creator: string;
  category: 'Collectibles' | 'Art' | 'Other';
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Wallet {
  name: string;
  address: string;
  balance: number;
  icon: JSX.Element;
  status: 'Connected' | 'Not Connected';
  recommended?: boolean;
  popular?: boolean;
}

export interface User {
    name: string;
    email: string;
    username: string;
    walletAddress: string;
    profession: string;
    bio: string;
    socialTwitter: string;
    socialDiscord: string;
    socialWebsite: string;
}

export interface Transaction {
  type: 'Minted' | 'Bought' | 'Sold' | 'Transferred';
  asset: string;
  date: string;
  value: number;
  from?: string;
  to?: string;
}

export interface Provenance {
    assetName: string;
    assetId: string;
    currentOwner: string;
    previousOwners: string[];
}

export interface Club {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    memberCount: number;
    members: { name: string; avatarUrl: string; }[];
    featuredAssets: Asset[];
}

export interface ActivityFeedItem {
    id: string;
    user: { name: string; avatarUrl: string; };
    action: 'minted' | 'purchased' | 'listed';
    asset: { name: string; imageUrl: string; };
    price?: number;
    timestamp: string;
}
