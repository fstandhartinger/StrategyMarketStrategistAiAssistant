import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import React from "react";
import CookieBanner from "./cookie-banner";
import StartupSelector from "../shared/StartupSelector";

interface LayoutProps {
  children: React.ReactNode;
}

const countriesRequiringConsent = [
  "Austria",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "United Kingdom",
];

export default function Layout({
  meta,
  children,
  showWelcomeBg = true,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
  showWelcomeBg?: boolean;
}) {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <Meta {...meta} />
      <CookieBanner countriesRequiringConsent={countriesRequiringConsent} />
      <SignInModal />
      {showWelcomeBg && ( // Conditionally render welcome-bg
        <div className="welcome-bg fixed h-screen w-full" />
      )}
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/stra-mark-logo2.png"
              alt="logo"
              width="374"
              height="78"
              className="mr-2 rounded-sm mt-1"
            ></Image>
            <p className="golden-glow-small"></p>
          </Link>
          <div className="startup ml-8">
            <div>
              <p className="text-gray-900">Selected Startup</p>
              <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-l font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-2xl ">
                {/* Futurebike ▾ */}
                <StartupSelector/>
              </h1>
            </div>
          </div>
          <div>
            <AnimatePresence>
              {!session && status !== "loading" ? (
                <motion.button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Sign In
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <main className="flex w-full flex-grow flex-col items-center justify-center pt-16">
        {children}
      </main>
    </>
  );
}
