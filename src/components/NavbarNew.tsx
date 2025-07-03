"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSavedEvents } from "@/context/SavedEventsContext";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// Custom NavLink component with hover effects
function NavLink({ href, label, isSpecial = false }: { href: string; label: string; isSpecial?: boolean }) {
  return (
    <Link href={href} className="group relative px-3 py-2 overflow-hidden">
      <div className="relative z-10">
        <span className={`relative ${isSpecial ? "text-gray-300" : "text-white"} group-hover:text-white transition-colors duration-300`}>
          {label}
        </span>

        {/* Underline effect */}
        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 bg-white rounded-md blur-md transition-opacity duration-300"></div>
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getSavedEventCount, isLoaded } = useSavedEvents();
  const [savedCount, setSavedCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) {
      setSavedCount(getSavedEventCount());
    }
  }, [isLoaded, getSavedEventCount]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Glow effect animation
  useEffect(() => {
    if (!glowRef.current) return;

    const el = glowRef.current;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const bounds = el.getBoundingClientRect();
      const x = clientX - bounds.x - bounds.width / 2;
      const y = clientY - bounds.y - bounds.height / 2;
      xTo(x);
      yTo(y);
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.nav
      id="main-navbar"
      data-navbar="true"
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-lg border-b border-[#ffffff10]" : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Glow effect */}        <div
          ref={glowRef}
          className="absolute w-[200px] h-[80px] rounded-full blur-[80px] bg-white/20 pointer-events-none opacity-0 lg:opacity-40"
          style={{ top: "-30px", left: "-40px" }}
        ></div>

        <Link href="/" className="text-2xl font-bold text-white z-20 relative flex items-center group">
          {/* Logo */}
          <div className="relative overflow-hidden mr-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src="/images/logo.png"
                alt="La Foresta Logo"
                width={40}
                height={40}
                className="relative z-10"
                style={{ filter: "grayscale(100%)" }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-white blur-md opacity-40 -z-10 group-hover:opacity-70 transition-opacity"></div>
          </div>

          <div className="flex flex-col">
            <span className="flex items-center">
              <span className="text-white font-bold tracking-wider">LA</span>
              <span className="ml-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-wider">
                FORESTA
              </span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-light">Techno Events</span>
          </div>
        </Link>

        <div className="hidden md:flex space-x-1 text-xs uppercase font-medium">
          {["Home", "Events", "About", "Interviews", "Gallery", "News", "Recordings"].map((item) => (
            <NavLink key={item} href={`/${item === "Home" ? "" : item.toLowerCase()}`} label={item} />
          ))}
          <NavLink href="/admin" label="Admin" isSpecial />
        </div>

        <div className="flex items-center z-20 relative space-x-2">
          <ThemeToggle />          <Link
            href="/saved-events"
            className="relative group"
            aria-label="Saved Events"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-black/20 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-black/40 transition-colors"
            >
              <svg
                className="w-5 h-5 text-white group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                ></path>
              </svg>

              {savedCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-white text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold"
                >
                  {savedCount}
                </motion.span>
              )}
            </motion.div>

            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl blur-md -z-10 transition-opacity"></div>
          </Link>

          <button
            className="relative z-20 p-2 focus:outline-none md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <div className="flex flex-col justify-between w-6 h-4">
              <motion.div
                className="h-0.5 bg-white origin-center"
                animate={{ rotateZ: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="h-0.5 bg-white"
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="h-0.5 bg-white origin-center"
                animate={{ rotateZ: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#050505] bg-opacity-98 flex items-center justify-center"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center max-w-md mx-auto px-6">
              <ul className="flex flex-col space-y-6 uppercase text-xl">
                {["HOME", "EVENTS", "ABOUT", "INTERVIEWS", "GALLERY", "NEWS", "RECORDINGS", "ADMIN"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
                      className="group relative inline-block overflow-hidden"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative z-10 text-white block px-4 py-1 transition-colors group-hover:text-[#00ffff]">
                        {item}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00ffff] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Social links */}
              <motion.div
                className="flex justify-center space-x-6 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {["facebook", "instagram", "twitter"].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#00ffff] transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      {social === "facebook" && (
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      )}
                      {social === "instagram" && (
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.917-.01-3.96-.058-.976-.045-1.505-.207-1.858-.344-.466-.182-.8-.398-1.15-.748-.35-.35-.566-.683-.748-1.15-.137-.353-.3-.882-.344-1.857-.047-1.023-.058-1.351-.058-3.807v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      )}
                      {social === "twitter" && (
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      )}
                    </svg>
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0.3,
                  }}
                  animate={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    background: i % 2 === 0 ? "#00ffff" : "#ff00ff",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
