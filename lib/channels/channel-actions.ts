"use server";

import { db } from "@/db";
import { channel } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function cancelChannel(id: number) {
    try {
        await db.delete(channel).where(eq(channel.id, id));
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to cancel channel:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to cancel the channel. Please try again." 
        };
    }
}

export async function rescheduleChannel(id: number, newDate: string, newTime: string) {
    try {
        await db.update(channel)
            .set({
                dateforchannel: newDate,
                timeforchannel: newTime,
                updatedAt: new Date()
            })
            .where(eq(channel.id, id));
            
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to reschedule channel:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to reschedule the channel. Please try again." 
        };
    }
}

export async function approveChannel(id: number) {
    try {
        await db.update(channel).set({ status: "Approved", rejectReason: null }).where(eq(channel.id, id));
        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to approve channel:", error);
        return { success: false, error: "Failed to approve channel" };
    }
}

export async function rejectChannel(id: number, reason: string) {
    try {
        await db.update(channel).set({ status: "Rejected", rejectReason: reason }).where(eq(channel.id, id));
        revalidatePath("/admin");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to reject channel:", error);
        return { success: false, error: "Failed to reject channel" };
    }
}
