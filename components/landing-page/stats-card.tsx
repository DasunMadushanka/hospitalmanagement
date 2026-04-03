"use client";

import { BedIcon, HospitalIcon, IdCardIcon, StethoscopeIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function StatsCard() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Trigger mount animation after component renders
        setMounted(true);
    }, []);

    return (
        <section>
            <div className="wrapper">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statData.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className={`bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-md shake-on-hover cursor-pointer ${mounted ? "animate-shake-once" : ""}`}
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <h2 className="text-center text-4xl mb-2 text-blue-500 dark:text-blue-400 animate-pulse animate-duration-1000"><Icon /></h2>
                                <h3 className="text-3xl font-bold mb-2 text-center text-blue-500 dark:text-blue-400">{stat.title}</h3>
                                <p className="text-2xl text-center font-bold text-black dark:text-blue-400 animate-bounce">{stat.value}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

const statData = [
    {
        icon: HospitalIcon,
        title: "Total Patients",
        value: "1000+",
    },
    {
        icon: StethoscopeIcon,
        title: "Total Doctors",
        value: "100+",
    },
    {
        icon: UsersIcon,
        title: "Total Staff",
        value: "100+",
    },
    {
        icon: BedIcon,
        title: "Total Beds",
        value: "100+",
    },
];