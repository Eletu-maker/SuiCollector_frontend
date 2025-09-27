import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { ArrowLeftIcon, CheckCircleIcon, UserIcon, LinkIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

interface User {
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

const ProfileSetUp = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        username: '',
        walletAddress: '',
        profession: '',
        bio: '',
        socialTwitter: '',
        socialDiscord: '',
        socialWebsite: '',
    });

    useEffect(() => {
        // Get wallet address from localStorage and auto-fill
        const savedWalletAddress = localStorage.getItem('walletAddress');
        if (savedWalletAddress) {
            setUser(prev => ({ ...prev, walletAddress: savedWalletAddress }));
        }
    }, []);

    const steps = [
        { number: 1, title: 'Basic Info', icon: UserIcon },
        { number: 2, title: 'Profile Details', icon: BriefcaseIcon },
        { number: 3, title: 'Social Links', icon: LinkIcon },
        { number: 4, title: 'Review', icon: CheckCircleIcon },
    ];

    const handleInputChange = (field: keyof User, value: string) => {
        setUser(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            // Submit user data to your backend API
            console.log(user);
            const response = await fetch('https://sui-collect.onrender.com/users/register-wallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            console.log(response);

            if (response.ok) {
                // Navigate to dashboard after successful profile creation
                window.location.href = '/profile';
            } else {
                console.error('Failed to create profile');
            }
        } catch (error) {
            console.error('Error creating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fixed StepIndicator with proper Tailwind classes
    const StepIndicator = () => {
        const getStepPosition = (index: number) => {
            const positions = ['left-0', 'left-1/4', 'left-2/4', 'left-3/4'];
            return positions[index] || 'left-0';
        };

        const getConnectorWidth = (index: number) => {
            const widths = ['w-1/4', 'w-1/4', 'w-1/4', 'w-0'];
            return widths[index] || 'w-0';
        };

        return (
            <div className="max-w-4xl mx-auto mb-12">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface transform -translate-y-1/2 -z-10" />
                    {steps.map((step, index) => (
                        <div key={step.number} className="flex flex-col items-center relative z-10">
                            <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                                currentStep >= step.number
                                    ? 'bg-primary border-primary text-white'
                                    : 'bg-surface border-secondary text-text-secondary'
                            } transition-all duration-300`}>
                                <step.icon className="w-6 h-6" />
                            </div>
                            <span className={`mt-2 text-sm font-medium ${
                                currentStep >= step.number ? 'text-text-primary' : 'text-text-secondary'
                            }`}>
                                {step.title}
                            </span>

                            {/* Fixed connector lines */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`absolute top-6 ${getStepPosition(index)} ${getConnectorWidth(index)} h-1 ${
                                        currentStep > step.number ? 'bg-primary' : 'bg-surface'
                                    } transition-all duration-300`}
                                    style={{ transform: 'translateY(-50%)' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Step components with proper input handling
    const Step1 = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Basic Information</h3>
                <p className="text-text-secondary">Let's start with the essentials</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-secondary rounded-lg focus:outline-none focus:border-primary text-text-primary"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-secondary rounded-lg focus:outline-none focus:border-primary text-text-primary"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        Username *
                    </label>
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-secondary rounded-lg focus:outline-none focus:border-primary text-text-primary"
                        placeholder="Choose a unique username"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        Wallet Address
                    </label>
                    <input
                        type="text"
                        value={user.walletAddress}
                        disabled
                        className="w-full px-4 py-3 bg-surface border border-secondary rounded-lg text-text-secondary cursor-not-allowed"
                        placeholder="Wallet address will auto-fill"
                    />
                </div>
            </div>
        </div>
    );

    const Step2 = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Profile Details</h3>
                <p className="text-text-secondary">Tell us more about yourself</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        Profession
                    </label>
                    <input
                        type="text"
                        value={user.profession}
                        onChange={(e) => handleInputChange('profession', e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-secondary rounded-lg focus:outline-none focus:border-primary text-text-primary"
                        placeholder="What do you do?"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        Bio *
                    </label>
                    <textarea
                        value={user.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-surface border border-secondary rounded-lg focus:outline-none focus:border-primary text-text-primary resize-none"
                        placeholder="Tell us about yourself..."
                    />
                    <p className="text-xs text-text-secondary mt-1">Brief description about you and your interests</p>
                </div>
            </div>
        </div>
    );

    const Step3 = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Social Links</h3>
                <p className="text-text-secondary">Connect your social profiles (optional)</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        Twitter
                    </label>
                    <div className="flex items-center">
                        <span className="px-3 py-3 bg-surface border border-r-0 border-secondary rounded-l-lg text-text-secondary">@</span>
                        <input
                            type="text"
                            value={user.socialTwitter}
                            onChange={(e) => handleInputChange('socialTwitter', e.target.value)}
                            className="flex-1 px-4 py-3 bg-surface border border-secondary rounded-r-lg focus:outline-none focus:border-primary text-text-primary"
                            placeholder="username"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        Discord
                    </label>
                    <input
                        type="text"
                        value={user.socialDiscord}
                        onChange={(e) => handleInputChange('socialDiscord', e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-secondary rounded-lg focus:outline-none focus:border-primary text-text-primary"
                        placeholder="Your Discord username"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        Website
                    </label>
                    <input
                        type="url"
                        value={user.socialWebsite}
                        onChange={(e) => handleInputChange('socialWebsite', e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-secondary rounded-lg focus:outline-none focus:border-primary text-text-primary"
                        placeholder="https://yourwebsite.com"
                    />
                </div>
            </div>
        </div>
    );

    const Step4 = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Review Your Profile</h3>
                <p className="text-text-secondary">Make sure everything looks good before submitting</p>
            </div>

            <div className="bg-surface border border-secondary rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <span className="text-sm text-text-secondary">Name:</span>
                        <p className="text-text-primary font-medium">{user.name || 'Not provided'}</p>
                    </div>
                    <div>
                        <span className="text-sm text-text-secondary">Email:</span>
                        <p className="text-text-primary font-medium">{user.email || 'Not provided'}</p>
                    </div>
                    <div>
                        <span className="text-sm text-text-secondary">Username:</span>
                        <p className="text-text-primary font-medium">{user.username || 'Not provided'}</p>
                    </div>
                    <div>
                        <span className="text-sm text-text-secondary">Profession:</span>
                        <p className="text-text-primary font-medium">{user.profession || 'Not provided'}</p>
                    </div>
                    <div className="md:col-span-2">
                        <span className="text-sm text-text-secondary">Bio:</span>
                        <p className="text-text-primary font-medium">{user.bio || 'Not provided'}</p>
                    </div>
                    <div>
                        <span className="text-sm text-text-secondary">Wallet Address:</span>
                        <p className="text-text-primary font-medium text-xs font-mono">{user.walletAddress}</p>
                    </div>
                </div>

                {(user.socialTwitter || user.socialDiscord || user.socialWebsite) && (
                    <div className="pt-4 border-t border-secondary">
                        <span className="text-sm text-text-secondary">Social Links:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {user.socialTwitter && (
                                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">Twitter: @{user.socialTwitter}</span>
                            )}
                            {user.socialDiscord && (
                                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">Discord: {user.socialDiscord}</span>
                            )}
                            {user.socialWebsite && (
                                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">Website: {user.socialWebsite}</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return user.name && user.email && user.username;
            case 2:
                return user.bio;
            case 3:
                return true; // Social links are optional
            case 4:
                return user.name && user.email && user.username && user.bio;
            default:
                return false;
        }
    };

    return (
        <div className="pt-20 min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Step Indicator */}
                <StepIndicator />

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="h-2 bg-surface rounded-full">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / steps.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-surface/50 border border-secondary rounded-xl p-8 mb-8">
                    {currentStep === 1 && <Step1 />}
                    {currentStep === 2 && <Step2 />}
                    {currentStep === 3 && <Step3 />}
                    {currentStep === 4 && <Step4 />}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                    <Button
                        onClick={handleBack}
                        variant="outline"
                        className="flex items-center gap-2 px-6 py-3"
                        disabled={currentStep === 1}
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back
                    </Button>

                    <div className="flex items-center gap-4">
                        <span className="text-text-secondary text-sm">
                            Step {currentStep} of {steps.length}
                        </span>

                        {currentStep < steps.length ? (
                            <Button
                                onClick={handleNext}
                                className="px-8 py-3"
                                disabled={!isStepValid()}
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                className="px-8 py-3 bg-green-500 hover:bg-green-600"
                                disabled={!isStepValid()}
                            >
                                { loading ? "Completing profile..." : "Complete Profile setup" }
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetUp;
