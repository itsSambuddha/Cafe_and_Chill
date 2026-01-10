"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { DbUser } from "@/types";

interface AuthContextType {
    user: FirebaseUser | null;
    mongoUser: DbUser | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    mongoUser: null,
    loading: true,
    refreshUser: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [mongoUser, setMongoUser] = useState<DbUser | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchMongoUser = async (firebaseUser: FirebaseUser) => {
        try {
            // In simplified mode, we pass user details directly
            const { uid, email, displayName } = firebaseUser;
            const res = await fetch("/api/auth/upsert-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, email, displayName }),
            });
            if (res.ok) {
                const data = await res.json();
                setMongoUser(data.user);
            }
        } catch (error) {
            console.error("Failed to fetch user profile", error);
        }
    };

    useEffect(() => {
        if (!auth) {
            console.warn("Auth not initialized. Check .env.local");
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                await fetchMongoUser(firebaseUser);
            } else {
                setMongoUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const refreshUser = async () => {
        if (user) await fetchMongoUser(user);
    };

    return (
        <AuthContext.Provider value={{ user, mongoUser, loading, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}
