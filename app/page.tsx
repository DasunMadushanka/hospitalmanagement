import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import HeroSection from "@/components/landing-page/hero-section";
import StatsCard from "@/components/landing-page/stats-card";
import FeaturedServices from "@/components/landing-page/featured-services";
// import RecentProducts from "@/components/landing-page/recent-products";
import ChannelAdd from "@/components/landing-page/channel-add";
import { Show } from "@clerk/nextjs";
import UserNotifications from "@/components/notifications/user-notifications";
// import { useEffect } from "react";


export default function Home() {


  // useEffect(() => {
  //   const handler = (event: PageTransitionEvent) => {
  //     if (event.persisted) {
  //       window.location.reload();
  //     }
  //   };
  //   window.addEventListener("pageshow", handler);
  //   return () => window.removeEventListener("pageshow", handler);
  // }, []);


  return (
    <div>

      <HeroSection />
      <UserNotifications />
      <StatsCard />
      <hr className="border-gray-200 dark:border-gray-800 mt-10 w-full max-w-7xl mx-auto px-4 py-2 rounded-full sm:w-1/2 lg:w-1/4" />
      <FeaturedServices />
      <hr className="border-gray-200 dark:border-gray-800 mt-10 w-full max-w-7xl mx-auto px-4 py-2 rounded-full sm:w-1/2 lg:w-1/4" />


      {/* <RecentProducts /> */}
      <Show when="signed-in">
        <ChannelAdd />
      </Show>

      <Show when="signed-out">
        <p className="text-center text-lg font-medium animate-in fade-in zoom-in duration-500 mt-10 text-red-600">Please sign in to add a channel</p>

      </Show>

      <hr className="border-gray-200 dark:border-gray-800 mt-10 w-full max-w-7xl mx-auto px-4 py-2 rounded-full sm:w-1/2 lg:w-1/4" />

    </div>
  );
}
