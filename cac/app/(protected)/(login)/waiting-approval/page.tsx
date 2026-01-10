"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coffee, Lock } from "lucide-react";
import { auth } from "@/lib/firebase-client";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function WaitingApprovalPage() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
            <Card className="w-full max-w-md border-stone-200 shadow-xl bg-white/80 backdrop-blur-sm text-center">
                <CardHeader className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-8 h-8 text-amber-800" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-amber-950">Account Pending</CardTitle>
                    <CardDescription className="text-stone-600">
                        Your account is waiting for administrator approval.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-sm text-stone-500">
                        We've sent your request to the team. You will receive an email once your account has been approved and activated.
                    </p>

                    <Button variant="outline" onClick={handleLogout} className="w-full">
                        Sign Out
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
