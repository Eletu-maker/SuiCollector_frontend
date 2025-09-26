import { Asset, Collection, Transaction, Provenance, User, Club, ActivityFeedItem } from './types';

export const MOCK_ASSETS: Asset[] = [
  { id: '1', name: 'Sunset Over Kyoto', imageUrl: 'https://picsum.photos/seed/kyoto/500/500', category: 'Art', creator: 'Emily Nguyen', price: 1.8, owner: 'Sophia Carter', royalties: 10, description: 'A serene sunset over Kyoto, blending warm tones and minimal brushwork.' },
  { id: '2', name: 'Dream in Colors', imageUrl: 'https://picsum.photos/seed/dreamcolors/500/500', category: 'Art', creator: 'Daniel Martins', price: 2.3, owner: 'Lucas Romero', royalties: 8, description: 'An abstract exploration of color and emotion in motion.' },
  { id: '3', name: 'Cyberpunk Portrait', imageUrl: 'https://picsum.photos/seed/cyberportrait/500/500', category: 'Collectibles', creator: 'Maya Chen', price: 0.75, owner: 'Olivia Reed', royalties: 5, description: 'A futuristic portrait in neon hues, inspired by cyberpunk aesthetics.' },
  { id: '4', name: 'Fractal Geometry', imageUrl: 'https://picsum.photos/seed/fractal/500/500', category: '3D Art', creator: 'Victor Ramos', price: 1.1, owner: 'Ethan Walker', royalties: 12, description: 'Intricate fractal shapes rendered in photorealistic 3D.' },
  { id: '5', name: 'Midnight Dunes', imageUrl: 'https://picsum.photos/seed/dunes/500/500', category: 'Photography', creator: 'Emily Nguyen', price: 0.9, owner: 'Marcus Taylor', royalties: 7, description: 'Desert dunes under a starlit night, captured in high contrast.' },
  { id: '6', name: 'Minimal Stone Form', imageUrl: 'https://picsum.photos/seed/ministone/500/500', category: 'Sculpture', creator: 'Sofia Lee', price: 3.4, owner: 'Ava Harper', royalties: 15, description: 'A smooth, minimalistic stone sculpture with natural textures.' },
  { id: '7', name: 'Jazz on the Blockchain', imageUrl: 'https://picsum.photos/seed/jazz/500/500', category: 'Music', creator: 'Miles Parker', price: 1.25, owner: 'Hannah Bell', royalties: 8, description: 'A smooth jazz composition minted as a rare music NFT.' },
  { id: '8', name: 'Galactic Runner NFT', imageUrl: 'https://picsum.photos/seed/runner/500/500', category: 'Gaming', creator: 'PixelForge Studios', price: 0.6, owner: 'Noah Hayes', royalties: 10, description: 'A playable character skin from the Galactic Runner game series.' },
];

export const MOCK_CREATED_ASSETS: Asset[] = [
  { id: 'c1', name: 'Genesis Bloom', imageUrl: 'https://picsum.photos/seed/genesis/500/500', category: 'Art', creator: 'Emily Nguyen', price: 1.5, owner: 'Emily Nguyen', royalties: 5, description: 'A vibrant generative art piece symbolizing new beginnings.' },
  { id: 'c2', name: 'Sui Horizon', imageUrl: 'https://picsum.photos/seed/horizon/500/500', category: 'Art', creator: 'Emily Nguyen', price: 2.1, owner: 'Marcus Taylor', royalties: 6, description: 'A dreamy horizon with flowing, layered gradients.' },
  { id: 'c3', name: 'Rustic Dreams', imageUrl: 'https://picsum.photos/seed/rustic/500/500', category: 'Photography', creator: 'Emily Nguyen', price: 1.0, owner: 'Sofia Lee', royalties: 4, description: 'A nostalgic rustic landscape, evoking calm and simplicity.' },
];

export const MOCK_MARKETPLACE_ASSETS: Asset[] = [
  { id: 'm1', name: 'Mystic Garden', imageUrl: 'https://picsum.photos/seed/mysticgarden/500/500', category: 'Art', creator: 'Liam Carter', price: 0.5, owner: 'Ava Harper', royalties: 5, description: 'A magical digital garden blooming with surreal colors.' },
  { id: 'm2', name: 'Neon Alley', imageUrl: 'https://picsum.photos/seed/neonalley/500/500', category: 'Collectibles', creator: 'Daniel Martins', price: 0.7, owner: 'Ethan Blake', royalties: 6, description: 'A glowing backstreet scene filled with neon lights and mystery.' },
  { id: 'm3', name: 'Whispering Pines', imageUrl: 'https://picsum.photos/seed/pines/500/500', category: 'Photography', creator: 'Maya Chen', price: 0.3, owner: 'Olivia Reed', royalties: 4, description: 'Tranquil pine forest captured with soft natural light.' },
  { id: 'm4', name: 'Starlight Horizon', imageUrl: 'https://picsum.photos/seed/starlight/500/500', category: 'Art', creator: 'Victor Ramos', price: 0.9, owner: 'Noah Hayes', royalties: 5, description: 'An ethereal night sky blending stars with vivid color streaks.' },
  { id: 'm5', name: 'Neon Skyline', imageUrl: 'https://picsum.photos/seed/skyline/500/500', category: '3D Art', creator: 'Sofia Lee', price: 0.6, owner: 'Isabella Carter', royalties: 7, description: 'A glowing futuristic skyline in vibrant 3D render.' },
  { id: 'm6', name: 'Digital Mirage', imageUrl: 'https://picsum.photos/seed/mirage/500/500', category: 'Art', creator: 'Amir Patel', price: 0.4, owner: 'Liam Foster', royalties: 5, description: 'A surreal mirage with floating digital elements.' },
  { id: 'm7', name: 'Quantum Drift', imageUrl: 'https://picsum.photos/seed/quantum/500/500', category: 'Collectibles', creator: 'Nora Kim', price: 0.8, owner: 'Mia Bennett', royalties: 6, description: 'An abstract collectible inspired by quantum mechanics.' },
  { id: 'm8', name: 'Pixel Oasis', imageUrl: 'https://picsum.photos/seed/oasis/500/500', category: 'Gaming', creator: 'Lucas Romero', price: 0.2, owner: 'Jackson Cole', royalties: 4, description: 'A rare pixel-art oasis scene, perfect for retro game fans.' },
  { id: 'm9', name: 'Lo-Fi Beats Album', imageUrl: 'https://picsum.photos/seed/lofi/500/500', category: 'Music', creator: 'Miles Parker', price: 1.2, owner: 'Hannah Bell', royalties: 8, description: 'A relaxing Lo-Fi beats album NFT for music lovers.' },
  { id: 'm10', name: 'AI Dreamscape', imageUrl: 'https://picsum.photos/seed/aidream/500/500', category: 'Digital Art', creator: 'Evelyn Zhao', price: 1.0, owner: 'Ryan Smith', royalties: 6, description: 'A surreal dreamscape generated by AI algorithms.' },
];


export const MOCK_TRENDING_ASSETS: Asset[] = [
  { id: 't1', name: 'Crimson Tide', imageUrl: 'https://picsum.photos/seed/crimson/300/300', category: 'Art', creator: 'Liam Carter', price: 1.4, owner: 'Ethan Walker', royalties: 9, description: 'A bold red abstract piece symbolizing passion and flow.' },
  { id: 't2', name: 'Digital Totem', imageUrl: 'https://picsum.photos/seed/totem/300/300', category: 'Collectibles', creator: 'Daniel Martins', price: 0.95, owner: 'Mia Powell', royalties: 7, description: 'A collectible digital sculpture inspired by ancient totems.' },
  { id: 't3', name: 'Ocean Bloom', imageUrl: 'https://picsum.photos/seed/ocean/300/300', category: 'Art', creator: 'Maya Chen', price: 1.1, owner: 'Lucas Romero', royalties: 6, description: 'A calming ocean scene with soft, dreamlike waves.' },
  { id: 't4', name: 'Solar Maze', imageUrl: 'https://picsum.photos/seed/maze/300/300', category: '3D Art', creator: 'Victor Ramos', price: 0.85, owner: 'Sofia Lee', royalties: 10, description: 'A 3D maze inspired by solar flares and geometric patterns.' },
  { id: 't5', name: 'Glass City', imageUrl: 'https://picsum.photos/seed/glasscity/300/300', category: 'Photography', creator: 'Sofia Lee', price: 0.65, owner: 'Olivia Reed', royalties: 5, description: 'An urban cityscape reflected through glass architecture.' },
  { id: 't6', name: 'Retro Synthwave', imageUrl: 'https://picsum.photos/seed/synthwave/300/300', category: 'Music', creator: 'Miles Parker', price: 1.3, owner: 'Hannah Bell', royalties: 8, description: 'A nostalgic synthwave soundtrack with retro vibes.' },
];

export const MOCK_COLLECTIONS: Collection[] = [
  { id: 'c1', name: 'Aurora Series', description: 'A collection inspired by the northern lights and cosmic energy.', imageUrl: 'https://picsum.photos/seed/aurora/600/400' },
  { id: 'c2', name: 'Metaverse Relics', description: 'Rare digital objects from across the metaverse.', imageUrl: 'https://picsum.photos/seed/metaverse/600/400' },
  { id: 'c3', name: 'Ethereal Dreams', description: 'A selection of soft, dreamlike works to calm the mind.', imageUrl: 'https://picsum.photos/seed/dreams/600/400' },
  { id: 'c4', name: 'Pixel Heroes', description: 'Retro-inspired pixel character collectibles.', imageUrl: 'https://picsum.photos/seed/pixelheroes/600/400' },
  { id: 'c5', name: 'Soundscapes', description: 'Immersive music NFTs and generative beats.', imageUrl: 'https://picsum.photos/seed/soundscapes/600/400' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { type: 'Minted', asset: 'Sunset Over Kyoto', date: '2023-07-15', value: 500 },
  { type: 'Bought', asset: 'Neon Alley', date: '2023-07-10', value: 200 },
  { type: 'Sold', asset: 'Pixel Oasis', date: '2023-07-05', value: 1000 },
  { type: 'Minted', asset: 'Fractal Geometry', date: '2023-06-20', value: 300 },
  { type: 'Bought', asset: 'Whispering Pines', date: '2023-06-16', value: 150 },
  { type: 'Listed', asset: 'Jazz on the Blockchain', date: '2023-06-15', value: 220 },
  { type: 'Transferred', asset: 'Galactic Runner NFT', date: '2023-06-10', value: 0 },
];

export const MOCK_PROVENANCE: Provenance[] = [
  { assetName: 'Sunset Over Kyoto', assetId: '1', currentOwner: 'Sophia Carter', previousOwners: ['Liam Harper', 'Ava Bennett'] },
  { assetName: 'Neon Alley', assetId: '2', currentOwner: 'Ethan Walker', previousOwners: [] },
  { assetName: 'Pixel Oasis', assetId: '3', currentOwner: 'Isabella Reed', previousOwners: ['Jackson Cole', 'Mia Powell'] },
  { assetName: 'Lo-Fi Beats Album', assetId: 'm9', currentOwner: 'Hannah Bell', previousOwners: ['Ryan Smith'] },
];

export const MOCK_USER: User = {
  username: 'emily_nguyen',
  displayName: 'Emily Nguyen',
  bio: 'Contemporary digital artist exploring the beauty of light, color, and motion.',
  avatarUrl: 'https://i.pravatar.cc/150?u=emilynguyen',
  email: 'emily.nguyen@example.com',
  isVerifiedArtist: true,
};

export const MOCK_ACTIVITY_FEED: ActivityFeedItem[] = [
  { id: 'act1', user: { name: 'CryptoPioneer', avatarUrl: 'https://i.pravatar.cc/150?u=pioneer' }, action: 'purchased', asset: { name: 'Starlight Horizon', imageUrl: 'https://picsum.photos/seed/starlight/100/100' }, price: 0.9, timestamp: '2 hours ago' },
  { id: 'act2', user: { name: 'ArtCollector_88', avatarUrl: 'https://i.pravatar.cc/150?u=collector88' }, action: 'listed', asset: { name: 'Quantum Drift', imageUrl: 'https://picsum.photos/seed/quantum/100/100' }, price: 0.8, timestamp: '5 hours ago' },
  { id: 'act3', user: { name: 'Emily Nguyen', avatarUrl: 'https://i.pravatar.cc/150?u=emilynguyen' }, action: 'minted', asset: { name: 'Sui Horizon', imageUrl: 'https://picsum.photos/seed/horizon/100/100' }, timestamp: '1 day ago' },
  { id: 'act4', user: { name: 'Noah Hayes', avatarUrl: 'https://i.pravatar.cc/150?u=noah' }, action: 'sold', asset: { name: 'Lo-Fi Beats Album', imageUrl: 'https://picsum.photos/seed/lofi/100/100' }, price: 1.1, timestamp: '3 days ago' },
];

export const MOCK_CLUBS: Club[] = [
  {
    id: 'club1',
    name: 'Digital Art Collective',
    description: 'A global community for digital artists and enthusiasts.',
    imageUrl: 'https://picsum.photos/seed/club1/600/400',
    memberCount: 1250,
    members: [
      { name: 'Emily Nguyen', avatarUrl: 'https://i.pravatar.cc/150?u=emilynguyen' },
      { name: 'Olivia Reed', avatarUrl: 'https://i.pravatar.cc/150?u=olivia' },
    ],
    featuredAssets: MOCK_MARKETPLACE_ASSETS.slice(0, 4),
  },
  {
    id: 'club2',
    name: 'Pixel Pushers',
    description: 'Celebrating the art of pixelated and generative creations.',
    imageUrl: 'https://picsum.photos/seed/club2/600/400',
    memberCount: 840,
    members: [
      { name: 'Jackson Cole', avatarUrl: 'https://i.pravatar.cc/150?u=jackson' },
      { name: 'Mia Bennett', avatarUrl: 'https://i.pravatar.cc/150?u=mia' },
    ],
    featuredAssets: MOCK_MARKETPLACE_ASSETS.slice(4, 8),
  },
  {
    id: 'club3',
    name: 'Soundwave Society',
    description: 'A hub for music producers, DJs, and NFT musicians.',
    imageUrl: 'https://picsum.photos/seed/club3/600/400',
    memberCount: 540,
    members: [
      { name: 'Miles Parker', avatarUrl: 'https://i.pravatar.cc/150?u=miles' },
      { name: 'Hannah Bell', avatarUrl: 'https://i.pravatar.cc/150?u=hannah' },
    ],
    featuredAssets: [MOCK_MARKETPLACE_ASSETS[8], MOCK_MARKETPLACE_ASSETS[9]],
  },
];
