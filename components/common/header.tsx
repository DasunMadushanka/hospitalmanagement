import { Show, SignIn, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { HeartIcon, UserIcon, UserRoundCheckIcon, LogOutIcon, Signpost, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const Logo = () => {
    return (
        <div className="flex flex-row items-center justify-center gap-2 group">
            <Link href="/">
                <h1 className="text-2xl flex flex-row items-center justify-center gap-2 fixed top-0 left-0 right-0 z-50 bg-blue-100 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out font-bold text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out"><HeartIcon className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out" />Hospital Management System</h1>
            </Link>
        </div>
    );
}

export default function Header() {

    // const isSignedIn = false;

    return (
        <header className="flex flex-col py-12 mt-4 lg:mt-13 lg:h-[25vh] bg-[url('../public/docimage.jpg')] lg:bg-[url('../public/docimagelg.jpg')] lg:bg-opacity-90 bg-cover bg-center bg-no-repeat">
            <nav>
                <ul className="flex flex-row items-center justify-center gap-6">
                    <Logo />

                    <li className="text-1xl flex flex-row items-center justify-center gap-2  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"><Link href="/">Home</Link></li>
                    <li className="text-1xl flex flex-row items-center justify-center gap-2  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"><Link href="/about">About</Link></li>
                    <li className="text-1xl flex flex-row items-center justify-center gap-2  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"><Link href="/contact">Contact</Link></li>
                    {/* {isSignedIn && <li className="text-1xl flex flex-row items-center justify-center gap-2  bg-primary rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out font-bold text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out"><Link href="/my-reports">My Reports</Link></li>} */}
                    {/* {!isSignedIn && <li className="text-1xl flex flex-row items-center justify-center gap-2  bg-primary rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out font-bold text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out"><Link href="/login">Login</Link></li>} */}
                    {/* {!isSignedIn && <li className="text-1xl flex flex-row items-center justify-center gap-2  bg-primary rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out font-bold text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out"><Link href="/register">Register</Link></li>} */}
                    <Suspense fallback={<Loader2Icon className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out animate-spin" />}>
                        <Show when="signed-in">
                            <li className="text-1xl flex flex-row items-center justify-center gap-2  text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 duration-300 ease-in-out"><Link href="/submit">Channels</Link></li>
                        </Show>
                    </Suspense>


                </ul>
                {/* <ul className="flex flex-row items-center justify-center gap-2 fixed top-0 right-0 z-50 bg-primary lg:mr-10 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"> */}
                {/* {isSignedIn ? <UserIcon className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out" /> : <Link href="/login"><UserIcon className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out" /></Link>} */}
                {/* {isSignedIn ? <UserButton /> : <Link href="/login"><UserIcon className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out" /></Link>} */}
                <ul className="flex flex-row items-center justify-center gap-2 fixed top-0 right-0 z-50 lg:mr-10 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
                    <Suspense fallback={<div><Loader2Icon className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out animate-spin" /></div>}>
                        <Show when="signed-in">
                            <UserButton />
                        </Show>
                    </Suspense>
                </ul>
                <ul className="flex flex-row items-center justify-center gap-2 lg:fixed lg:top-0 lg:right-0 lg:z-50 lg:mr-10 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer ">
                    <Suspense fallback={<div><Loader2Icon className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out animate-spin" /></div>}>
                        <li className="flex flex-row items-center justify-center gap-2 group "><Show when="signed-out">
                            <UserRoundCheckIcon className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out" />
                            <SignInButton>
                                <button className="cursor-pointer m-4">Sign In</button>
                            </SignInButton>


                        </Show></li>
                        <li className="flex flex-row items-center justify-center gap-2 group"><Show when="signed-out">

                            <Signpost className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-300 ease-in-out" />
                            <SignUpButton>
                                <button className="cursor-pointer m-4">Sign Up</button>

                            </SignUpButton>
                        </Show></li>

                    </Suspense>



                </ul>

            </nav>
        </header>
    );
}