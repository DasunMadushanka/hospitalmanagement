export default function StatsCard({ channelData }: { channelData: any[] }) {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 
            items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                <div className="bg-blue-600/10 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Total Channels</h3>
                    <p className="text-2xl font-bold">{channelData.length}</p>
                </div>
                <div className="bg-yellow-600/10 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Pending Channels</h3>
                    <p className="text-2xl font-bold">{channelData.filter((channel) => channel.status === "Pending").length}</p>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Approved Channels</h3>
                    <p className="text-2xl font-bold">{channelData.filter((channel) => channel.status === "Approved").length}</p>
                </div>
                <div className="bg-red-600/10 p-4 rounded-lg">
                    <h3 className="text-lg font-medium">Rejected Channels</h3>
                    <p className="text-2xl font-bold">{channelData.filter((channel) => channel.status === "Rejected").length}</p>
                </div>

            </div>
        </div>
    );
}