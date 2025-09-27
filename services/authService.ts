// services/authService.ts
import { User } from "../types"; // adjust the path if needed

function generateNonce(): string {
    // use a cryptographically safe random string for real apps
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const startZkLogin = async (): Promise<void> => {
    const clientId =
        "31415212217-606mri9r2adon27kj4cse957e5natmnj.apps.googleusercontent.com"; // 👈 needs to be a string

    const nonce = generateNonce();
    window.localStorage.setItem("zk_login_nonce", nonce);

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: window.location.origin + "/auth/callback",
        response_type: "id_token",
        scope: "openid email profile",
        nonce: nonce,
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
};

export const loginWithZk = async (
    idToken: string
): Promise<{ user: User }> => {
    const response = await fetch("/api/zklogin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
    });

    if (!response.ok) throw new Error("zkLogin failed");
    return response.json();
};
