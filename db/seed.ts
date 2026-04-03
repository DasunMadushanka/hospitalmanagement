import { drizzle } from "drizzle-orm/neon-http";
import { allChannels } from "./data";
import { channel } from "./schema";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {

    console.log("Seeding database...");

    //clear existing data
    await db.delete(channel);
    console.log("Existing data cleared");

    //insert new data from data.ts
    for (const channelData of allChannels) {
        await db.insert(channel).values({
            speciality: channelData.speciality,
            doctorname: channelData.doctorname,
            doctorid: channelData.doctorid,
            dateforchannel: channelData.dateforchannel,
            timeforchannel: channelData.timeforchannel,
            description: channelData.description,
            createdAt: channelData.createdAt,
            updatedAt: channelData.updatedAt,
            deletedAt: channelData.deletedAt,
            isDeleted: channelData.isDeleted,
            userId: channelData.userId,
            username: channelData.username,
            useremail: channelData.useremail,
            userphone: channelData.userphone,
            status: channelData.status,
        });
    }

    console.log(`Database seeded successfully ${allChannels.length}`);

    //verify the inserted channel lists
    const insertChannels = await db.select().from(channel);
    console.log(`Database seeded successfully ${insertChannels.length} channels seeded successfully`);

    console.log("\n channels in database:");
    insertChannels.forEach((ch) => {
        console.log(ch);
    });
}

main().catch((error) => {
    console.error("\n error seeding database", error);
    process.exit(1);
})
    .finally(() => {
        console.log("\n seeding database completed");
        process.exit(0);
    })
