"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Channel = {
    id: number;
    username: string;
    userphone: string;
    useremail: string;
    doctorname: string;
    speciality: string;
    dateforchannel: string;
    timeforchannel: string;
    status: string;
    description: string;
    rejectReason: string | null;
};

export default function AllChannels({ channels }: { channels: Channel[] }) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredChannels = useMemo(() => {
        return channels.filter((c) => {
            const matchesSearch = c.username.toLowerCase().includes(search.toLowerCase()) || 
                                  c.userphone.includes(search);
            const matchesStatus = statusFilter === "All" || c.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [channels, search, statusFilter]);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">All Channels</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input 
                    placeholder="Search by username or mobile number..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-md"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {filteredChannels.length === 0 ? (
                <p className="text-muted-foreground">No channels found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto pb-4 px-2">
                    {filteredChannels.map((channel) => (
                        <Card key={channel.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle>{channel.username}</CardTitle>
                                <CardDescription>{channel.userphone}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 text-sm space-y-2">
                                <p><strong>Doctor:</strong> {channel.doctorname} ({channel.speciality})</p>
                                <p><strong>Date:</strong> {channel.dateforchannel}</p>
                                <p><strong>Time:</strong> {channel.timeforchannel}</p>
                                <div className="mt-2 text-xs text-muted-foreground break-words line-clamp-3">
                                    Notes: {channel.description}
                                </div>
                                <div className="mt-2">
                                    <Badge variant={channel.status === "Approved" ? "default" : channel.status === "Rejected" ? "destructive" : "outline"}>
                                        {channel.status}
                                    </Badge>
                                </div>
                                {channel.status === "Rejected" && channel.rejectReason && (
                                    <p className="text-xs text-destructive mt-2"><strong>Reason:</strong> {channel.rejectReason}</p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
