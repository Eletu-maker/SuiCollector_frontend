// pages/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithZk } from "../services/authService";

export const AuthCallback: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.hash.substring(1));
            const idToken = urlParams.get("id_token");

            if (!idToken) {
                console.error("No id_token in callback");
                navigate("/");
                return;
            }

            try {
                // Save raw token in case you need it later
                window.localStorage.setItem("zk_id_token", idToken);

                // Verify with backend and get user profile
                const res = await loginWithZk(idToken);
                localStorage.setItem("user", JSON.stringify(res.user));

                // Done, send them home or to dashboard
                navigate("/");
            } catch (err) {
                console.error("zkLogin verification failed:", err);
                navigate("/");
            }
        };

        handleCallback();
    }, [navigate]);

    return <div>Processing login...</div>;
};
