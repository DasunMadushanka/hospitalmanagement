import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CheckCircle2, XCircle } from "lucide-react";
import { channelSelectUserByEmail } from "@/lib/channels/channel-select";
import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function UserNotifications() {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const response = await clerkClient();
    const user = await response.users.getUser(userId);

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) {
        return null;
    }

    // Since we don't have a specific `channelSelectUserByEmail` we need to create it or fetch channels.
    // Wait, channelSelect might just fetch all. I will implement channelSelectUserByEmail action soon.
    const userChannels = await channelSelectUserByEmail(email);

    if (!userChannels || userChannels.length === 0) {
        return null;
    }

    // Only show notifications for recently updated/non-pending ones. 
    // To keep it simple, we just show Approved or Rejected channels.
    const notifiedChannels = userChannels.filter((c: any) => c.status === "Approved" || c.status === "Rejected");

    if (notifiedChannels.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-4 space-y-4">
            {notifiedChannels.map((channel: any) => (
                <Alert key={channel.id} variant={channel.status === "Rejected" ? "destructive" : "default"} className={channel.status === "Approved" ? "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/10 dark:text-green-400" : ""}>
                    {channel.status === "Approved" ? <CheckCircle2 className="h-4 w-4" color="#22c55e" /> : <XCircle className="h-4 w-4" />}
                    <AlertTitle>{channel.status === "Approved" ? "Channel Approved!" : "Channel Rejected"}</AlertTitle>
                    <AlertDescription>
                        Your channel request for Dr. {channel.doctorname} on {channel.dateforchannel} at {channel.timeforchannel} has been {channel.status.toLowerCase()}.
                        {channel.status === "Rejected" && channel.rejectReason && (
                            <span className="block mt-1"><strong>Reason:</strong> {channel.rejectReason}</span>
                        )}
                    </AlertDescription>
                </Alert>
            ))}
        </div>
    );
}
