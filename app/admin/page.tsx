import SectionHeader from "@/components/common/section-header";
import StatsCard from "@/components/admin/stats-cards";
import PendingChannels from "@/components/admin/pending-channels";
import AllChannels from "@/components/admin/all-channels";
import { channelSelect } from "@/lib/channels/channel-select";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { UserStar } from "lucide-react";
import { redirect } from "next/navigation";


export default async function AdminPage() {

    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const response = await clerkClient();
    const user = await response.users.getUser(userId);

    console.log(user);

    const metadata = user.publicMetadata;
    const isAdmin = metadata?.isAdmin ?? false;

    if (!isAdmin) {
        redirect("/");
    }

    const allChannels = await channelSelect();

    return (
        <div>
            <div className="wrapper">
                <SectionHeader title=" Admin Panel" description={`Login Email : ${user?.emailAddresses[0].emailAddress}`} icon={< UserStar />} />

            </div>
            {/*showing the channels total, pendings, approved, rejected from stats card component*/}
            <StatsCard channelData={allChannels} />
            <PendingChannels channels={allChannels} />
            <AllChannels channels={allChannels} />
        </div>
    );
}