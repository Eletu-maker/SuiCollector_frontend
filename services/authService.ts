// src/services/authService.ts
export interface User {
    id: string;
    name: string;
    avatarUrl: string;
}

export async function loginWithGoogle(idToken: string): Promise<User> {
    const res = await fetch("http://localhost:8000/users/zklogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        credentials: "include",
    });

    if (!res.ok) throw new Error("Login failed");
    return res.json();
}

export async function logout(): Promise<void> {
    await fetch("http://localhost:8000/logout", { method: "POST", credentials: "include" });
}

export async function getCurrentUser(): Promise<User | null> {
    const res = await fetch("http://localhost:8000/me", { credentials: "include" });
    if (res.ok) return res.json();
    return null;
}
