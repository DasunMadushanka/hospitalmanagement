"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cancelChannel, rescheduleChannel } from "@/lib/channels/channel-actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, differenceInHours, parse } from "date-fns";
import { getSlotsForDoctorOnDate } from "@/lib/channels/doctor-data";

type ChannelType = {
    id: number;
    speciality: string;
    doctorname: string;
    doctorid: string;
    dateforchannel: string;
    timeforchannel: string;
    description: string;
    status: string;
};

export default function ChannelCard({ channel }: { channel: ChannelType }) {
    const [isCanceling, setIsCanceling] = useState(false);
    const [isRescheduling, setIsRescheduling] = useState(false);
    
    // Dialog states
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
    
    // Reschedule form state
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    
    // Calculate time differences
    // Parse scheduled time: "YYYY-MM-DD" and "hh:mm a"
    const scheduledDateTimeStr = `${channel.dateforchannel} ${channel.timeforchannel}`;
    const scheduledDate = parse(scheduledDateTimeStr, "yyyy-MM-dd hh:mm a", new Date());
    const now = new Date();
    const hoursRemaining = differenceInHours(scheduledDate, now);
    
    // Business rules
    const CANCEL_LIMIT_HOURS = 48;
    const RESCHEDULE_LIMIT_HOURS = 24;
    
    const handleCancelClick = () => {
        if (hoursRemaining <= CANCEL_LIMIT_HOURS) {
            toast.error("Cancellation Not Allowed", {
                description: "You can only cancel an appointment if it is more than 2 days (48 hours) away."
            });
            return;
        }
        setShowCancelDialog(true);
    };
    
    const handleRescheduleClick = () => {
        if (hoursRemaining <= RESCHEDULE_LIMIT_HOURS) {
            toast.error("Reschedule Not Allowed", {
                description: "You can only reschedule an appointment if it is more than 1 day (24 hours) away."
            });
            return;
        }
        setShowRescheduleDialog(true);
    };
    
    const confirmCancel = async () => {
        setIsCanceling(true);
        const result = await cancelChannel(channel.id);
        
        if (result.success) {
            toast.success("Appointment Canceled", {
                description: "Your channeling appointment has been successfully canceled."
            });
        } else {
            toast.error("Failed to cancel", {
                description: result.error || "An unknown error occurred."
            });
        }
        
        setIsCanceling(false);
        setShowCancelDialog(false);
    };
    
    const confirmReschedule = async () => {
        if (!selectedDate || !selectedTime) {
            toast.error("Please select both a new date and time.");
            return;
        }
        
        setIsRescheduling(true);
        const result = await rescheduleChannel(channel.id, selectedDate, selectedTime);
        
        if (result.success) {
            toast.success("Appointment Rescheduled", {
                description: `Your appointment has been moved to ${selectedDate} at ${selectedTime}.`
            });
            setShowRescheduleDialog(false);
        } else {
            toast.error("Failed to reschedule", {
                description: result.error || "An unknown error occurred."
            });
        }
        
        setIsRescheduling(false);
    };

    const handleDateSelect = (val: string) => {
        setSelectedDate(val);
        setSelectedTime(""); // Reset time when date changes
        const slots = getSlotsForDoctorOnDate(channel.doctorid, val);
        setAvailableTimes(slots);
    };
    
    // Determine available future dates for rescheduling (next 14 days)
    const availableDates: string[] = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        if (d.getDay() !== 0) { // Skip Sundays
            availableDates.push(format(d, "yyyy-MM-dd"));
        }
    }

    return (
        <div className="flex flex-col items-center justify-center bg-blue-100/30 rounded-[2rem] p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-blue-200/50">
            <h1 className="text-2xl font-bold mb-3 text-blue-900 bg-blue-100/80 rounded-full px-6 py-2 shadow-sm">{channel.doctorname}</h1>
            
            <div className="w-full bg-white/70 rounded-xl p-4 mb-4 space-y-2 text-left">
               <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                   <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">Specialty</span>
                   <span className="font-semibold text-gray-800">{channel.speciality}</span>
               </div>
               <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                   <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">Doctor ID</span>
                   <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{channel.doctorid}</span>
               </div>
               <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                   <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">Date</span>
                   <span className="font-semibold text-blue-700">{channel.dateforchannel}</span>
               </div>
               <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                   <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">Time</span>
                   <span className="font-semibold text-blue-700">{channel.timeforchannel}</span>
               </div>
               <div className="flex justify-between items-center pt-1">
                   <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">Status</span>
                   <span className="font-semibold px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">{channel.status}</span>
               </div>
            </div>

            {/* Time remaining indicator */}
            <div className="w-full text-center mb-4">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {hoursRemaining > 0 
                        ? `Time remaining: ~${Math.floor(hoursRemaining / 24)}d ${hoursRemaining % 24}h` 
                        : "Appointment has passed"}
                </span>
            </div>

            <div className="flex gap-3 w-full mt-2">
                <Button 
                    variant="outline" 
                    className="flex-1 bg-white border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl"
                    onClick={handleCancelClick}
                >
                    Cancel
                </Button>
                <Button 
                    variant="default" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md"
                    onClick={handleRescheduleClick}
                >
                    Reschedule
                </Button>
            </div>

            {/* Cancel Confirmation Dialog */}
            <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently cancel your channeling appointment with <strong className="text-gray-800">{channel.doctorname}</strong> on {channel.dateforchannel} at {channel.timeforchannel}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isCanceling} className="rounded-xl">Keep Appointment</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={(e) => { e.preventDefault(); confirmCancel(); }} 
                            disabled={isCanceling}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
                        >
                            {isCanceling ? "Canceling..." : "Yes, Cancel"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Reschedule Dialog */}
            <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Reschedule Appointment</DialogTitle>
                        <DialogDescription>
                            Select a new date and time for your appointment with {channel.doctorname}.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">New Date</Label>
                            <Select onValueChange={handleDateSelect} value={selectedDate}>
                                <SelectTrigger className="w-full rounded-xl">
                                    <SelectValue placeholder="Select a date" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableDates.map(date => (
                                        <SelectItem key={date} value={date}>{date}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="time">New Time</Label>
                            <Select onValueChange={setSelectedTime} value={selectedTime} disabled={!selectedDate || availableTimes.length === 0}>
                                <SelectTrigger className="w-full rounded-xl">
                                    <SelectValue placeholder={!selectedDate ? "Select date first" : availableTimes.length === 0 ? "No slots available" : "Select a time"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableTimes.map(time => (
                                        <SelectItem key={time} value={time}>{time}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    
                    <DialogFooter className="sm:justify-end">
                        <Button variant="outline" onClick={() => setShowRescheduleDialog(false)} disabled={isRescheduling} className="rounded-xl">
                            Close
                        </Button>
                        <Button 
                            onClick={confirmReschedule} 
                            disabled={isRescheduling || !selectedDate || !selectedTime}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                        >
                            {isRescheduling ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
