"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const screens = [
  "WhatsApp Image 2026-07-20 at 11.41.32 PM (1).jpeg",
  "WhatsApp Image 2026-07-20 at 11.41.32 PM (4).jpeg",
  "WhatsApp Image 2026-07-20 at 11.41.32 PM.jpeg",
  "WhatsApp Image 2026-07-20 at 11.53.57 PM (3).jpeg",
  "WhatsApp Image 2026-07-20 at 11.53.57 PM (5).jpeg",
  "WhatsApp Image 2026-07-20 at 11.53.57 PM (6).jpeg",
  "WhatsApp Image 2026-07-20 at 11.53.57 PM (8).jpeg",
  "WhatsApp Image 2026-07-20 at 11.53.58 PM (7).jpeg",
  "WhatsApp Image 2026-07-21 at 1.11.18 AM (2).jpeg",
  "WhatsApp Image 2026-07-21 at 1.28.34 AM (2).jpeg",
  "WhatsApp Image 2026-07-21 at 1.28.35 AM.jpeg",
].map((name) => `/assets/screens/${encodeURIComponent(name)}`);

export function CataScreensShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[300px] flex-col items-center">
      <div
        className="relative flex h-[620px] w-[300px] flex-col overflow-hidden rounded-[2.75rem] border-[10px] shadow-[0_40px_90px_rgba(30,20,10,.22)]"
        style={{ borderColor: "#1a1a18", background: "#100D0B" }}
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-0 z-20 h-5 w-28 -translate-x-1/2 rounded-b-2xl"
          style={{ background: "#1a1a18" }}
        />
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={screens[index]}
                alt="Captura de la app CATA"
                fill
                sizes="300px"
                className="object-cover object-top"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5 flex gap-1.5">
        {screens.map((src, i) => (
          <span
            key={src}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-4 bg-accent" : "w-1.5 bg-border-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
