"use client";

import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { LogInIcon, LogOutIcon, LogsIcon, SignalIcon, SparkleIcon } from "lucide-react";
import { SignInButton, SignUpButton, Show, useUser } from "@clerk/nextjs";


const LiveBadge = () => {
    return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-50 animate-pulse">
            <span className="relative flex h-1 w-1 rounded-full bg-green-500 animate-ping">
                <span className="relative h-full w-full rounded-full bg-primary opacity-75"></span></span>We are providing best hospital management system</Badge>
    )
}



export default function LandingPage() {

    const { user } = useUser();

    return (
        <section className="relative overflow-hidden bg-linear-to-b from-blue-50 to-white dark:from-blue-900 dark:to-blue-50">
            <div className="wrapper">
                <div className="flex flex-col items-center justify-center pt-20 lg:py-20 py-12 text-center">
                    <LiveBadge />

                    <h1 className="text-4xl font-bold mt-6 mb-4">Hospital Management System</h1>
                    <p className="text-lg mb-6">Manage your hospital details efficiently</p>
                    {/* <Button variant="outline" size="lg" className="mr-4 mt-1 cursor-pointer bg-blue-500 text-white">Get Started</Button> */}
                    <Show when="signed-out">
                        <SignInButton>
                            <Button variant="outline" size="lg" className="mt-1 cursor-pointer bg-blue-500 text-white"><Link href="/login" className="flex items-center"><LogInIcon className="mr-2 size-4" />Login</Link></Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button variant="outline" size="lg" className="mt-1 cursor-pointer bg-blue-500 text-white"><Link href="/register" className="flex items-center"><LogsIcon className="mr-2 size-4" />Register</Link></Button>
                        </SignUpButton>
                    </Show>
                    <Show when="signed-in">
                        <h1 className="text-2xl font-bold text-transform: uppercase">Welcome To DM Hospitals</h1>
                        <h1 className="mt-6 text-xl font-semibold">
                            You are signed in as <span className="text-blue-600 text-transform: uppercase">{user?.firstName} {user?.lastName}</span>
                        </h1>
                    </Show>
                </div>
            </div>
            <hr className="border-gray-200 dark:border-gray-800 mt-10 w-full max-w-7xl mx-auto px-4 py-2 rounded-full" />

        </section>
    );
}