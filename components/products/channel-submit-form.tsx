"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { insertChannel } from "@/lib/channels/channel-insert";
import {
    SPECIALTIES,
    getDoctorsBySpecialty,
    getDoctorById,
    getSlotsForDoctorOnDate,
    type Doctor,
} from "@/lib/channels/doctor-data";

export default function ChannelSubmitForm() {
    // Form state
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [selectedDoctorId, setSelectedDoctorId] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState("");
    const [description, setDescription] = useState("No additional information");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");

    // Derived state
    const [queueNumber, setQueueNumber] = useState<number | null>(null);

    // Error state
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    // Submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<{
        success: boolean;
        message: string;
    } | null>(null);

    // Get filtered doctors based on specialty
    const filteredDoctors = selectedSpecialty
        ? getDoctorsBySpecialty(selectedSpecialty)
        : [];

    // Get selected doctor object
    const selectedDoctor: Doctor | undefined = selectedDoctorId
        ? getDoctorById(selectedDoctorId)
        : undefined;

    // Get available time slots for the selected doctor on the selected date
    const availableSlots =
        selectedDoctorId && selectedDate
            ? getSlotsForDoctorOnDate(
                selectedDoctorId,
                format(selectedDate, "yyyy-MM-dd")
            )
            : [];

    // Date constraints
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = addDays(today, 14);

    // Handlers
    function handleSpecialtyChange(value: string) {
        setSelectedSpecialty(value);
        setSelectedDoctorId("");
        setSelectedDate(undefined);
        setSelectedTime("");
        setQueueNumber(null);
        setErrors((prev) => ({ ...prev, specialty: "", doctor: "", date: "", time: "" }));
    }

    function handleDoctorChange(value: string) {
        setSelectedDoctorId(value);
        setSelectedDate(undefined);
        setSelectedTime("");
        setQueueNumber(null);
        setErrors((prev) => ({ ...prev, doctor: "", date: "", time: "" }));
    }

    function handleDateSelect(date: Date | undefined) {
        setSelectedDate(date);
        setSelectedTime("");
        setQueueNumber(null);
        setErrors((prev) => ({ ...prev, date: "", time: "" }));
    }

    function handleTimeSelect(time: string) {
        setSelectedTime(time);
        // Generate queue number and assign on time pick
        const queue = Math.floor(Math.random() * 20) + 1;
        setQueueNumber(queue);
        setErrors((prev) => ({ ...prev, time: "" }));
    }

    // Validation
    function validate(): Record<string, string> {
        const errs: Record<string, string> = {};

        if (!selectedSpecialty) errs.specialty = "Please select a specialty.";
        if (!selectedDoctorId) errs.doctor = "Please select a doctor.";
        if (!selectedDate) {
            errs.date = "Please select a date.";
        } else {
            const d = new Date(selectedDate);
            d.setHours(0, 0, 0, 0);
            if (d < today) errs.date = "Cannot select a past date.";
            if (d > maxDate) errs.date = "Date must be within the next 2 weeks.";
        }
        if (!selectedTime) errs.time = "Please select a time slot.";
        if (!userEmail.trim()) {
            errs.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
            errs.email = "Please enter a valid email address.";
        }
        if (!userPhone.trim()) {
            errs.phone = "Phone number is required.";
        } else if (!/^\+94\d{9}$/.test(userPhone)) {
            errs.phone = "Phone must be in format +94XXXXXXXXX (e.g. +94777123456).";
        }
        if (!description.trim()) {
            errs.description = "Description is required.";
        }

        return errs;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        setSubmitted(true);
        setSubmitResult(null);

        if (Object.keys(validationErrors).length > 0) return;

        setIsSubmitting(true);

        try {
            const result = await insertChannel({
                speciality: selectedSpecialty,
                doctorname: selectedDoctor?.name ?? "",
                doctorid: selectedDoctorId,
                dateforchannel: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
                timeforchannel: selectedTime,
                description,
                useremail: userEmail,
                userphone: userPhone,
            });

            if (result.success) {
                setSubmitResult({
                    success: true,
                    message: `Channeling submitted successfully! Queue #${queueNumber} — ${selectedDoctor?.room}. Record ID: ${result.id}`,
                });
                // Reset form
                setSelectedSpecialty("");
                setSelectedDoctorId("");
                setSelectedDate(undefined);
                setSelectedTime("");
                setDescription("No additional information");
                setUserEmail("");
                setUserPhone("");
                setQueueNumber(null);
                setErrors({});
                setSubmitted(false);
            } else {
                setSubmitResult({
                    success: false,
                    message: result.error,
                });
            }
        } catch {
            setSubmitResult({
                success: false,
                message: "An unexpected error occurred. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
            {/* Specialty */}
            <div className="space-y-2">
                <Label htmlFor="specialty" className="text-sm font-semibold">
                    Specialty <span className="text-destructive">*</span>
                </Label>
                <Select value={selectedSpecialty} onValueChange={handleSpecialtyChange}>
                    <SelectTrigger id="specialty">
                        <SelectValue placeholder="Select a specialty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {SPECIALTIES.map((s) => (
                                <SelectItem key={s} value={s}>
                                    {s}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {errors.specialty && (
                    <p className="text-sm text-destructive">{errors.specialty}</p>
                )}
            </div>

            {/* Doctor Name */}
            <div className="space-y-2">
                <Label htmlFor="doctor" className="text-sm font-semibold">
                    Doctor Name <span className="text-destructive">*</span>
                </Label>
                <Select
                    value={selectedDoctorId}
                    onValueChange={handleDoctorChange}
                    disabled={!selectedSpecialty}
                >
                    <SelectTrigger id="doctor">
                        <SelectValue
                            placeholder={
                                selectedSpecialty
                                    ? "Select a doctor"
                                    : "Select a specialty first"
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {filteredDoctors.map((doc) => (
                                <SelectItem key={doc.id} value={doc.id}>
                                    {doc.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {errors.doctor && (
                    <p className="text-sm text-destructive">{errors.doctor}</p>
                )}
            </div>

            {/* Doctor ID (auto-filled, disabled) */}
            <div className="space-y-2">
                <Label htmlFor="doctorid" className="text-sm font-semibold">
                    Doctor ID
                </Label>
                <Input
                    type="text"
                    id="doctorid"
                    value={selectedDoctor?.id ?? ""}
                    disabled
                    className="bg-muted cursor-not-allowed font-mono"
                    placeholder="Auto-filled when doctor is selected"
                />
            </div>

            {/* Date for Channel */}
            <div className="space-y-2">
                <Label htmlFor="dateforchannel" className="text-sm font-semibold">
                    Date for Channeling <span className="text-destructive">*</span>
                </Label>
                <p className="text-xs text-muted-foreground">
                    You can only select dates within the next 2 weeks.
                </p>
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => {
                        const d = new Date(date);
                        d.setHours(0, 0, 0, 0);
                        return d < today || d > maxDate || d.getDay() === 0;
                    }}
                    className="rounded-md border w-fit"
                />
                {selectedDate && (
                    <p className="text-sm text-muted-foreground">
                        Selected: <span className="font-medium text-foreground">{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                    </p>
                )}
                {errors.date && (
                    <p className="text-sm text-destructive">{errors.date}</p>
                )}
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
                <Label className="text-sm font-semibold">
                    Available Time Slots <span className="text-destructive">*</span>
                </Label>
                {!selectedDoctorId || !selectedDate ? (
                    <p className="text-sm text-muted-foreground">
                        Select a doctor and date to see available time slots.
                    </p>
                ) : availableSlots.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No available slots for this date. The doctor may not be working on this day.
                    </p>
                ) : (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {availableSlots.map((time) => (
                            <Button
                                key={time}
                                type="button"
                                variant={selectedTime === time ? "default" : "outline"}
                                size="sm"
                                className={
                                    selectedTime === time
                                        ? "ring-2 ring-primary ring-offset-2"
                                        : ""
                                }
                                onClick={() => handleTimeSelect(time)}
                            >
                                {time}
                            </Button>
                        ))}
                    </div>
                )}
                {errors.time && (
                    <p className="text-sm text-destructive">{errors.time}</p>
                )}
            </div>

            {/* Queue Number & Room — shown after time selection */}
            {selectedTime && queueNumber !== null && selectedDoctor && (
                <Card className="border-primary/30 bg-primary/5">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                    Queue Number
                                </p>
                                <p className="text-3xl font-bold text-primary mt-1">
                                    #{queueNumber}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                    Room
                                </p>
                                <p className="text-3xl font-bold text-primary mt-1">
                                    {selectedDoctor.room}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* User Email */}
            <div className="space-y-2">
                <Label htmlFor="useremail" className="text-sm font-semibold">
                    Email <span className="text-destructive">*</span>
                </Label>
                <Input
                    type="email"
                    id="useremail"
                    value={userEmail}
                    onChange={(e) => {
                        setUserEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder="example@email.com"
                />
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                )}
            </div>

            {/* User Phone */}
            <div className="space-y-2">
                <Label htmlFor="userphone" className="text-sm font-semibold">
                    Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                    type="tel"
                    id="userphone"
                    value={userPhone}
                    onChange={(e) => {
                        setUserPhone(e.target.value);
                        setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    placeholder="+94777123456"
                />
                <p className="text-xs text-muted-foreground">
                    Format: +94XXXXXXXXX (e.g. +94777123456)
                </p>
                {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                )}
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold">
                    Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setErrors((prev) => ({ ...prev, description: "" }));
                    }}
                    placeholder="Describe your condition or reason for visit..."
                    rows={4}
                />
                <p className="text-xs text-muted-foreground">
                    Default: &quot;No additional information&quot;. You can submit as-is or add details.
                </p>
                {errors.description && (
                    <p className="text-sm text-destructive">{errors.description}</p>
                )}
            </div>

            {/* Success Message */}
            {submitResult?.success && (
                <Card className="border-green-500/30 bg-green-500/5">
                    <CardContent className="pt-6">
                        <p className="text-sm font-semibold text-green-700 mb-1">✅ Submission Successful!</p>
                        <p className="text-sm text-green-600">{submitResult.message}</p>
                    </CardContent>
                </Card>
            )}

            {/* Server Error */}
            {submitResult && !submitResult.success && (
                <Card className="border-destructive/30 bg-destructive/5">
                    <CardContent className="pt-6">
                        <p className="text-sm font-semibold text-destructive">❌ Submission Failed</p>
                        <p className="text-sm text-destructive">{submitResult.message}</p>
                    </CardContent>
                </Card>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Channeling"}
            </Button>

            {/* Summary of errors after submission attempt */}
            {submitted && Object.keys(errors).length > 0 && (
                <Card className="border-destructive/30 bg-destructive/5">
                    <CardContent className="pt-6">
                        <p className="text-sm font-semibold text-destructive mb-2">
                            Please fix the following errors:
                        </p>
                        <ul className="list-disc list-inside text-sm text-destructive space-y-1">
                            {Object.values(errors)
                                .filter(Boolean)
                                .map((err, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </form>
    );
}