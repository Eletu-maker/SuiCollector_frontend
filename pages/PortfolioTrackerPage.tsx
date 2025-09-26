import React, { useState, useEffect } from 'react';
import { MOCK_TRANSACTIONS, MOCK_PROVENANCE } from '../constants';
import { Transaction, Provenance } from '../types';
import { Button } from '../components/Button';
import {BackButton} from "@/components/BackButton.tsx";

const StatCard: React.FC<{ value: string; label: string; isLoading: boolean }> = ({ value, label, isLoading }) => (
    <div className="bg-surface p-6 rounded-lg">
        <p className="text-sm text-text-secondary">{label}</p>
        {isLoading ? (
            <div className="h-9 w-3/4 bg-secondary/80 animate-pulse rounded-md mt-1"></div>
        ) : (
            <p className="text-3xl font-bold text-text-primary mt-1">{value}</p>
        )}
    </div>
);

const ProvenanceDetailModal: React.FC<{ item: Provenance; onClose: () => void; }> = ({ item, onClose }) => {
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verified' | 'failed'>('idle');

    const handleVerify = () => {
        setIsVerifying(true);
        setVerificationStatus('idle');
        setTimeout(() => {
            const success = Math.random() > 0.2; 
            setVerificationStatus(success ? 'verified' : 'failed');
            setIsVerifying(false);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-auto animate-fade-in-scale" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-text-primary mb-1">Provenance Details</h2>
                <p className="text-lg font-semibold text-primary mb-4">{item.assetName}</p>

                <div className="space-y-4 text-sm">
                    <div>
                        <h3 className="font-semibold text-text-secondary">Current Owner</h3>
                        <p className="text-text-primary">{item.currentOwner}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-text-secondary">Ownership History</h3>
                        {item.previousOwners.length > 0 ? (
                            <ul className="list-disc list-inside text-text-secondary mt-1 space-y-1">
                                {item.previousOwners.map((owner, index) => <li key={index}><span className="text-text-primary">{owner}</span></li>)}
                            </ul>
                        ) : (
                            <p className="text-text-secondary italic">No previous owners recorded.</p>
                        )}
                    </div>
                </div>
                
                <div className="mt-6 space-y-3">
                     <Button className="w-full" onClick={handleVerify} disabled={isVerifying}>
                        {isVerifying ? 'Verifying on-chain...' : 'Verify Authenticity'}
                    </Button>
                    {verificationStatus === 'verified' && <p className="text-center text-green-500 text-sm animate-fade-in-scale">✅ Authenticity Verified</p>}
                    {verificationStatus === 'failed' && <p className="text-center text-red-500 text-sm animate-fade-in-scale">❌ Verification Failed</p>}
                </div>

                <Button variant="secondary" className="w-full mt-3" onClick={onClose}>
                    Close
                </Button>
            </div>
             <style>{`
                @keyframes fadeInScale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale {
                    animation: fadeInScale 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
};


const TransactionHistoryTable: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
    <div className="bg-surface rounded-lg overflow-hidden">
        <h2 className="text-xl font-bold text-text-primary p-6">Transaction History</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="text-left text-text-secondary">
                    <tr>
                        <th className="px-6 py-3 font-medium">Type</th>
                        <th className="px-6 py-3 font-medium">Asset</th>
                        <th className="px-6 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium text-right">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx, index) => (
                        <tr key={index} className="border-t border-secondary">
                            <td className="px-6 py-4">{tx.type}</td>
                            <td className="px-6 py-4 font-medium text-text-primary">{tx.asset}</td>
                            <td className="px-6 py-4">{tx.date}</td>
                            <td className="px-6 py-4 text-right font-mono">${tx.value.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ProvenanceTrackingTable: React.FC<{ provenance: Provenance[], onAssetClick: (item: Provenance) => void; }> = ({ provenance, onAssetClick }) => (
    <div className="bg-surface rounded-lg overflow-hidden">
        <h2 className="text-xl font-bold text-text-primary p-6">Provenance Tracking</h2>
        <p className="text-sm text-text-secondary px-6 mb-4">Click on an asset to view its ownership history and verify its authenticity.</p>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="text-left text-text-secondary">
                    <tr>
                        <th className="px-6 py-3 font-medium">Asset</th>
                        <th className="px-6 py-3 font-medium">Current Owner</th>
                        <th className="px-6 py-3 font-medium">Previous Owners</th>
                    </tr>
                </thead>
                <tbody>
                    {provenance.map((item, index) => (
                        <tr key={index} className="border-t border-secondary">
                            <td className="px-6 py-4">
                               <button onClick={() => onAssetClick(item)} className="font-medium text-primary text-left hover:underline focus:outline-none focus:underline">
                                   {item.assetName}
                               </button>
                            </td>
                            <td className="px-6 py-4 text-text-primary">{item.currentOwner}</td>
                            <td className="px-6 py-4">{item.previousOwners.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const PortfolioChart: React.FC<{ data: { name: string, value: number }[] }> = ({ data }) => {
    const [recharts, setRecharts] = useState<any>(null);
    const [primaryColor, setPrimaryColor] = useState('#1313ec');

    useEffect(() => {
        // Load Recharts library from window
        const interval = setInterval(() => {
            if ((window as any).Recharts) {
                setRecharts((window as any).Recharts);
                clearInterval(interval);
            }
        }, 100);

        // Get theme color from CSS variables
        const color = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
        if (color) {
            setPrimaryColor(color);
        }

        return () => clearInterval(interval);
    }, []);

    if (!recharts) {
        return <div className="h-80 flex items-center justify-center bg-surface rounded-lg"><p>Loading Chart...</p></div>;
    }

    const { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } = recharts;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background border border-secondary p-2 rounded-lg shadow-lg">
                    <p className="label text-sm text-text-secondary">{`${label}`}</p>
                    <p className="intro font-bold text-primary">{`$${payload[0].value.toLocaleString()}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-80 w-full">
            <ResponsiveContainer>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number) => `$${value/1000}k`} />
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-secondary)" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="value" stroke={primaryColor} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export const PortfolioTrackerPage: React.FC = () => {
    const [selectedProvenance, setSelectedProvenance] = useState<Provenance | null>(null);
    const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
    const [stats, setStats] = useState({ totalAssets: 125, estimatedValue: 0, changePercent: 0 });
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const generateDynamicData = () => {
            const data = [];
            let currentValue = 20000 + Math.random() * 5000;
            const today = new Date();

            for (let i = 29; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                
                const fluctuation = (Math.random() - 0.45) * 1000;
                currentValue += fluctuation;
                if (currentValue < 1000) currentValue = 1000;

                data.push({
                    name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    value: Math.round(currentValue),
                });
            }
            
            const latestValue = data[data.length - 1].value;
            const startValue = data[0].value;
            const changePercent = ((latestValue - startValue) / startValue) * 100;

            setChartData(data);
            setStats({
                totalAssets: 125, // This can be dynamic if we have real asset data
                estimatedValue: latestValue,
                changePercent: changePercent,
            });
            setIsLoading(false);
        };

        setIsLoading(true);
        // Simulate network delay
        const timer = setTimeout(generateDynamicData, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-8">
            <BackButton label="Go Back" />

            {selectedProvenance && <ProvenanceDetailModal item={selectedProvenance} onClose={() => setSelectedProvenance(null)} />}

            <h1 className="text-3xl font-bold text-text-primary">Portfolio Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard value={stats.totalAssets.toString()} label="Total Assets" isLoading={isLoading} />
                <StatCard value={`$${stats.estimatedValue.toLocaleString()}`} label="Estimated Value" isLoading={isLoading}/>
            </div>

            <div className="bg-surface rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                     <div>
                        <h2 className="text-xl font-bold text-text-primary">Portfolio Value Over Time</h2>
                        {isLoading ? (
                             <div className="h-5 w-32 bg-secondary/80 animate-pulse rounded-md mt-1"></div>
                        ) : (
                            <p className="text-sm text-text-secondary">Last 30 Days 
                                <span className={`font-semibold ml-2 ${stats.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {stats.changePercent >= 0 ? '+' : ''}{stats.changePercent.toFixed(2)}%
                                </span>
                            </p>
                        )}
                     </div>
                </div>
                 {isLoading ? (
                    <div className="h-80 flex items-center justify-center bg-secondary/30 rounded-lg animate-pulse">
                        <p className="text-text-secondary">Generating Analytics...</p>
                    </div>
                 ) : (
                    <PortfolioChart data={chartData} />
                 )}
            </div>
            
            <TransactionHistoryTable transactions={MOCK_TRANSACTIONS} />

            <ProvenanceTrackingTable provenance={MOCK_PROVENANCE} onAssetClick={(item) => setSelectedProvenance(item)} />
        </div>
    );
}