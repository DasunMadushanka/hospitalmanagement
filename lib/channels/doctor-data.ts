import { format, addDays } from "date-fns";

export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    room: string;
}

export interface DoctorSlot {
    doctorId: string;
    date: string; // "YYYY-MM-DD"
    times: string[]; // ["09:00 AM", "10:30 AM", ...]
}

// All specialties
export const SPECIALTIES = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Ophthalmology",
    "ENT",
    "Pediatrics",
    "Gynecology",
    "Urology",
    "Nephrology",
] as const;

export type Specialty = (typeof SPECIALTIES)[number];

// Manual doctor data
export const DOCTORS: Doctor[] = [
    { id: "DOC-001", name: "Dr. John Doe", specialty: "Cardiology", room: "Room 101" },
    { id: "DOC-002", name: "Dr. Priya Sharma", specialty: "Cardiology", room: "Room 102" },
    { id: "DOC-003", name: "Dr. Jane Smith", specialty: "Neurology", room: "Room 201" },
    { id: "DOC-004", name: "Dr. Rahul Verma", specialty: "Neurology", room: "Room 202" },
    { id: "DOC-005", name: "Dr. Kamal Kumar", specialty: "Orthopedics", room: "Room 301" },
    { id: "DOC-006", name: "Dr. Sneha Gupta", specialty: "Orthopedics", room: "Room 302" },
    { id: "DOC-007", name: "Dr. Amit Singh", specialty: "Dermatology", room: "Room 401" },
    { id: "DOC-008", name: "Dr. Pooja Yadav", specialty: "Dermatology", room: "Room 402" },
    { id: "DOC-009", name: "Dr. Rajesh Kumar", specialty: "Ophthalmology", room: "Room 501" },
    { id: "DOC-010", name: "Dr. Neha Singh", specialty: "Ophthalmology", room: "Room 502" },
    { id: "DOC-011", name: "Dr. Amit Kumar", specialty: "ENT", room: "Room 601" },
    { id: "DOC-012", name: "Dr. Priya Singh", specialty: "ENT", room: "Room 602" },
    { id: "DOC-013", name: "Dr. Rahul Kumar", specialty: "Pediatrics", room: "Room 701" },
    { id: "DOC-014", name: "Dr. Sneha Singh", specialty: "Pediatrics", room: "Room 702" },
    { id: "DOC-015", name: "Dr. Pooja Singh", specialty: "Gynecology", room: "Room 801" },
    { id: "DOC-016", name: "Dr. Sarah Fernando", specialty: "Gynecology", room: "Room 802" },
    { id: "DOC-017", name: "Dr. Nimal Perera", specialty: "Urology", room: "Room 901" },
    { id: "DOC-018", name: "Dr. Kasun Silva", specialty: "Urology", room: "Room 902" },
    { id: "DOC-019", name: "Dr. Dilshan Jayawardena", specialty: "Nephrology", room: "Room 1001" },
    { id: "DOC-020", name: "Dr. Chamari Bandara", specialty: "Nephrology", room: "Room 1002" },
];

// Available time slot templates — each doctor gets a subset
const SLOT_TEMPLATES: string[][] = [
    ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
    ["08:30 AM", "09:30 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"],
    ["09:00 AM", "10:00 AM", "11:30 AM", "01:30 PM", "03:00 PM", "04:30 PM"],
    ["08:00 AM", "09:30 AM", "11:00 AM", "01:00 PM", "03:30 PM"],
    ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "04:00 PM"],
];

// Generate slots for the next 14 days for all doctors
function generateSlots(): DoctorSlot[] {
    const slots: DoctorSlot[] = [];
    const today = new Date();

    for (const doctor of DOCTORS) {
        // Each doctor gets a consistent slot template based on their index
        const doctorIndex = DOCTORS.indexOf(doctor);
        const template = SLOT_TEMPLATES[doctorIndex % SLOT_TEMPLATES.length];

        for (let dayOffset = 0; dayOffset <= 14; dayOffset++) {
            const date = addDays(today, dayOffset);
            const dateStr = format(date, "yyyy-MM-dd");

            // Skip Sundays (day 0) — doctors don't work Sundays
            if (date.getDay() === 0) continue;

            slots.push({
                doctorId: doctor.id,
                date: dateStr,
                times: [...template],
            });
        }
    }

    return slots;
}

export const DOCTOR_SLOTS = generateSlots();

// Helper: get doctors by specialty
export function getDoctorsBySpecialty(specialty: string): Doctor[] {
    return DOCTORS.filter((d) => d.specialty === specialty);
}

// Helper: get doctor by ID
export function getDoctorById(id: string): Doctor | undefined {
    return DOCTORS.find((d) => d.id === id);
}

// Helper: get available slots for a doctor on a specific date
export function getSlotsForDoctorOnDate(doctorId: string, date: string): string[] {
    const slot = DOCTOR_SLOTS.find((s) => s.doctorId === doctorId && s.date === date);
    return slot ? slot.times : [];
}
