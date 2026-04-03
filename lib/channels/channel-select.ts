import { db } from "@/db";
import { channel } from "@/db/schema";
import { eq } from "drizzle-orm";
import { connection } from "next/server";

export async function channelSelect() {
    // "use cache"; dont use beacuse we need always relatime data -dynamic data
    // await connection();
    const channelData = await db.select().from(channel);
    return channelData;
}

export async function channelSelectUserByEmail(email: string) {
    const channelData = await db.select().from(channel).where(eq(channel.useremail, email));
    return channelData;
}