"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { approveChannel, rejectChannel } from "@/lib/channels/channel-actions";

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

const REJECT_REASONS = [
    "Doctor is not available please re-channel it",
    "You haven't provided properly information",
    "We need more information if you have had any treatment please add additional information",
    "Check if any user has same queue number add additional information"
];

export default function PendingChannels({ channels }: { channels: Channel[] }) {
    const pendingChannels = channels.filter((c) => c.status === "Pending");

    const [rejectingId, setRejectingId] = useState<number | null>(null);
    const [rejectReason, setRejectReason] = useState<string>(REJECT_REASONS[0]);

    const handleApprove = async (id: number) => {
        try {
            const result = await approveChannel(id);
            if (result.success) {
                toast.success("Channel approved successfully");
            } else {
                toast.error(result.error);
            }
        } catch (e) {
            toast.error("Failed to approve channel");
        }
    };

    const handleReject = async (id: number) => {
        if (rejectingId !== id) {
            setRejectingId(id);
            return;
        }

        try {
            const result = await rejectChannel(id, rejectReason);
            if (result.success) {
                toast.success("Channel rejected successfully");
                setRejectingId(null);
            } else {
                toast.error(result.error);
            }
        } catch (e) {
            toast.error("Failed to reject channel");
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Pending Approval</h2>
            {pendingChannels.length === 0 ? (
                <p className="text-muted-foreground">No pending channels.</p>
            ) : (
                <div className="flex overflow-x-auto gap-4 pb-4">
                    {pendingChannels.slice(0, 4).map((channel) => (
                        <Card key={channel.id} className="min-w-[300px] flex shrink-0 flex-col">
                            <CardHeader>
                                <CardTitle>{channel.username}</CardTitle>
                                <CardDescription>{channel.userphone}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 text-sm space-y-2">
                                <p><strong>Doctor:</strong> {channel.doctorname} ({channel.speciality})</p>
                                <p><strong>Date:</strong> {channel.dateforchannel}</p>
                                <p><strong>Time:</strong> {channel.timeforchannel}</p>
                                <p><strong>Notes:</strong> {channel.description}</p>
                                <Badge variant="outline">{channel.status}</Badge>

                                {rejectingId === channel.id && (
                                    <div className="mt-4 pt-4 border-t space-y-2">
                                        <p className="text-sm font-medium">Select a rejection reason:</p>
                                        <select
                                            className="w-full text-sm rounded-md border p-2 bg-background"
                                            value={rejectReason}
                                            onChange={(e) => setRejectReason(e.target.value)}
                                        >
                                            {REJECT_REASONS.map((reason, idx) => (
                                                <option key={idx} value={reason}>{reason}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                {rejectingId === channel.id ? (
                                    <>
                                        <Button variant="destructive" onClick={() => handleReject(channel.id)} className="w-full">
                                            Confirm Reject
                                        </Button>
                                        <Button variant="outline" onClick={() => setRejectingId(null)} className="w-full">
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-2 mt-1 items-center justify-center w-full">
                                            <Button variant="default" onClick={() => handleApprove(channel.id)} className="w-full bg-green-600 hover:bg-green-700 text-white">
                                                Approve
                                            </Button>

                                            <Button variant="destructive" onClick={() => setRejectingId(channel.id)} className="w-full">
                                                Reject
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
