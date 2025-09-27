// services/useZkLogin.ts
import { useState, useEffect } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { loginWithZk } from './authService';

interface User {
    name: string;
    email: string;
    avatar?: string;
}

export const useZkLogin = () => {
    const currentAccount = useCurrentAccount();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleZkLogin = async () => {
            if (!currentAccount) {
                setUser(null);
                return;
            }

            setIsLoading(true);
            try {
                const idToken = window.localStorage.getItem("zk_id_token");
                if (idToken) {
                    const data = await loginWithZk(idToken);
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("zkLogin failed:", err);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        handleZkLogin();
    }, [currentAccount]);

    return { user, isLoading };
};