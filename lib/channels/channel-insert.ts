"use server";

import { db } from "@/db";
import { channel } from "@/db/schema";

interface ChannelInsertData {
    speciality: string;
    doctorname: string;
    doctorid: string;
    dateforchannel: string;
    timeforchannel: string;
    description: string;
    useremail: string;
    userphone: string;
}

export async function insertChannel(data: ChannelInsertData) {
    try {
        const result = await db
            .insert(channel)
            .values({
                speciality: data.speciality,
                doctorname: data.doctorname,
                doctorid: data.doctorid,
                dateforchannel: data.dateforchannel,
                timeforchannel: data.timeforchannel,
                description: data.description,
                userId: "guest",
                username: data.useremail.split("@")[0],
                useremail: data.useremail,
                userphone: data.userphone,
                status: "Pending",
            })
            .returning({ id: channel.id });

        return { success: true as const, id: result[0].id };
    } catch (error) {
        console.error("Failed to insert channel:", error);
        return {
            success: false as const,
            error: error instanceof Error ? error.message : "Failed to submit channeling. Please try again.",
        };
    }
}
