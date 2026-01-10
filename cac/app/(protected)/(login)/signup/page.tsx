"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Coffee } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (name) {
                await updateProfile(userCredential.user, { displayName: name });
            }
            // AuthProvider will detect change and sync
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to create account.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4 pt-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-amber-200/20 blur-3xl opacity-50" />
                <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-coffee-200/20 blur-3xl opacity-50" />
            </div>

            <Card className="w-full max-w-md border-stone-200 shadow-xl bg-white/90 backdrop-blur-md relative z-10">
                <CardHeader className="space-y-1 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-amber-700/10 rounded-full flex items-center justify-center mb-2">
                        <Coffee className="w-6 h-6 text-amber-800" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-amber-950">
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-stone-500">
                        Join the team at Cafe & Chill
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSignup} className="space-y-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none text-stone-700" htmlFor="name">Full Name</label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none text-stone-700" htmlFor="email">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none text-stone-700" htmlFor="password">Password</label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-white"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        <Button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white" disabled={loading}>
                            {loading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <div className="text-sm text-stone-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-amber-800 hover:text-amber-900 font-semibold hover:underline">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
