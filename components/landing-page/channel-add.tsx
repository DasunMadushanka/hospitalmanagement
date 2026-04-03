// "use cache"
import { StarIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import { channelSelect } from "@/lib/channels/channel-select";
import ChannelCard from "./channel-card";

export default async function ChannelAdd() {
    const channels = await channelSelect();

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center">
                <SectionHeader
                    title="My Channels"
                    icon={<StarIcon className="w-6 h-6 text-yellow-500" />}
                    description="Check out your upcoming channeling appointments"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-12 max-w-7xl mx-auto px-4 w-full">
                {channels.map((channel) => (
                    <ChannelCard key={channel.id} channel={channel} />
                ))}

                {channels.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-lg">You don't have any pending channels at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}