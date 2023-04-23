import Card from "@/components/home/card";
import VideoCard from "@/components/home/videocard";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { WAITLIST_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import React from "react";
import YouTube from "react-youtube";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {

  const { data: session } = useSession();
  const router = useRouter();

  // If the user is logged in, redirect to the dashboard
  useEffect(() => {
    
      router.replace("/dashboard");
  }, [session, router]);

  return (
    <Layout showWelcomeBg={true}>
     
        <motion.h1
          className="m-44 bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Loading...</Balancer>
        </motion.h1>

    </Layout>
  );
}
