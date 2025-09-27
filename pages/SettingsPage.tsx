import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Button } from '../components/Button';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { SunIcon, MoonIcon } from '../components/icons/Icons';

export const SettingsPage: React.FC = () => {
    const { user, theme, toggleTheme } = useAppContext();
    const [username, setUsername] = useState(user?.username || '');
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    
    // Notification states
    const [itemSold, setItemSold] = useState(true);
    const [newBid, setNewBid] = useState(true);
    const [newsletter, setNewsletter] = useState(false);


    const handleSaveChanges = () => {
        setIsSaving(true);
        setTimeout(() => {
            console.log("Saved profile:", { username, displayName, bio });
            alert("Profile saved successfully! (Simulated)");
            setIsSaving(false);
        }, 1500);
    };

    if (!user) {
        return (
            <div className="pt-20 flex items-center justify-center h-screen">
                <p>Please connect your wallet to view settings.</p>
            </div>
        );
    }
    
    const TabButton = ({ id, label }: { id: string; label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === id ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-screen-md mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold">Settings</h1>
                <p className="text-text-secondary mt-2">Manage your account and preferences.</p>

                <div className="border-b border-secondary my-8">
                    <div className="flex space-x-2">
                        <TabButton id="profile" label="Edit Profile" />
                        <TabButton id="notifications" label="Notifications" />
                        <TabButton id="appearance" label="Appearance" />
                    </div>
                </div>

                {activeTab === 'profile' && (
                    <div className="space-y-8">
                        <div className="flex items-center space-x-6">
                            <img src={user.avatarUrl} alt="avatar" className="w-24 h-24 rounded-full" />
                            <Button variant="secondary">Change Avatar</Button>
                        </div>
                         <form className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-2">Username</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">@</span>
                                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-surface border border-secondary rounded-lg pl-7 pr-3 py-2.5 focus:ring-primary focus:border-primary focus:outline-none"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="displayName" className="block text-sm font-medium text-text-secondary mb-2">Display Name</label>
                                <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full bg-surface border border-secondary rounded-lg px-3 py-2.5 focus:ring-primary focus:border-primary focus:outline-none"/>
                            </div>
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-text-secondary mb-2">Bio</label>
                                <textarea id="bio" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself..." className="w-full bg-surface border border-secondary rounded-lg px-3 py-2.5 focus:ring-primary focus:border-primary focus:outline-none"></textarea>
                            </div>
                            <Button type="button" onClick={handleSaveChanges} className="px-6 py-2.5" disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </form>
                    </div>
                )}
                
                {activeTab === 'notifications' && (
                    <div className="space-y-6 bg-surface p-6 rounded-lg">
                        <h2 className="text-xl font-bold">Email Notifications</h2>
                        <ToggleSwitch enabled={itemSold} onChange={setItemSold} label="Item Sold"/>
                        <ToggleSwitch enabled={newBid} onChange={setNewBid} label="New Bid"/>
                        <ToggleSwitch enabled={newsletter} onChange={setNewsletter} label="Newsletter"/>
                    </div>
                )}

                {activeTab === 'appearance' && (
                     <div className="space-y-6 bg-surface p-6 rounded-lg">
                         <h2 className="text-xl font-bold">Theme</h2>
                         <p className="text-sm text-text-secondary">Choose how SuiCollect looks to you. Select a theme preference.</p>
                         <div className="flex space-x-4">
                            <button onClick={toggleTheme} className={`flex items-center justify-center w-32 h-20 rounded-lg border-2 ${theme === 'light' ? 'border-primary' : 'border-transparent'}`}>
                                <SunIcon className="w-8 h-8 text-yellow-500" />
                            </button>
                            <button onClick={toggleTheme} className={`flex items-center justify-center w-32 h-20 rounded-lg border-2 bg-gray-800 ${theme === 'dark' ? 'border-primary' : 'border-transparent'}`}>
                                <MoonIcon className="w-8 h-8 text-slate-300" />
                            </button>
                         </div>
                    </div>
                )}

            </div>
        </div>
    );
};
