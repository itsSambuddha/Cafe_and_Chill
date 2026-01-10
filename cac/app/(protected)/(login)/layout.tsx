"use client";


import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthLogic({ children }: { children: React.ReactNode }) {
    const { mongoUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && mongoUser) {
            // If already logged in, redirect away from login/signup pages
            if (mongoUser.role === 'admin') router.push('/admin');
            else if (mongoUser.role === 'staff') {
                if (mongoUser.status === 'approved') router.push('/staff');
                else router.push('/waiting-approval');
            }
        }
    }, [mongoUser, loading, router]);

    return <>{children}</>;
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthLogic>
            {children}
        </AuthLogic>
    );
}
