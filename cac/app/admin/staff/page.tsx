"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/admin/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Trash2, Shield, User as UserIcon } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

interface UserData {
    _id: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    displayName?: string;
}

export default function StaffPage() {
    const { mongoUser } = useAuth();
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/staff");
            if (res.ok) {
                setUsers(await res.json());
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAction = async (id: string, action: "approve" | "reject" | "delete") => {
        if (!confirm(`Are you sure you want to ${action} this user?`)) return;

        const method = action === 'delete' ? "DELETE" : "POST";
        const url = `/api/admin/staff/${id}/${action}`; // For delete it might be different path if I implemented it that way, but I did [id]/delete/route.ts

        try {
            const res = await fetch(url, { method });
            if (res.ok) {
                fetchUsers();
            } else {
                alert("Action failed");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <PageShell
            title="Staff & User Management"
            description="Manage access requests and user roles."
        >
            <div className="rounded-md border border-stone-200 bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                        <tr>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Joined</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {loading ? (
                            <tr><td colSpan={5} className="p-4 text-center">Loading users...</td></tr>
                        ) : users.map(user => {
                            const isSelf = mongoUser && (mongoUser._id === user._id || mongoUser.email === user.email);
                            return (
                                <tr key={user._id} className="hover:bg-stone-50/50">
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-stone-900">{user.displayName || "No Name"}</span>
                                            <span className="text-xs text-stone-500">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            {user.role === 'admin' ? <Shield className="h-3 w-3 text-amber-700" /> : <UserIcon className="h-3 w-3 text-stone-500" />}
                                            <span className="capitalize">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {user.status === 'approved' && <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Approved</Badge>}
                                        {user.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">Pending</Badge>}
                                        {user.status === 'rejected' && <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">Rejected</Badge>}
                                    </td>
                                    <td className="px-4 py-3 text-stone-500 text-xs">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-3 text-right">
                                        {!isSelf && (
                                            <div className="flex justify-end gap-2">
                                                {user.status === 'pending' && (
                                                    <>
                                                        <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleAction(user._id, 'approve')} title="Approve">
                                                            <Check className="h-3 w-3" />
                                                        </Button>
                                                        <Button size="sm" variant="outline" className="h-7 w-7 p-0 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleAction(user._id, 'reject')} title="Reject">
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </>
                                                )}
                                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-stone-400 hover:text-red-600" onClick={() => handleAction(user._id, 'delete')} title="Delete User">
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </PageShell>
    );
}
