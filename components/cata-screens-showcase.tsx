"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Files live in public/assets/screens/. Each entry keeps the image and its caption together.
const slides = [
  ["WhatsApp Image 2026-10-21 at 6.09.36 PM.jpeg", "Tu perfil de sabor", "CATA descubre tu estilo: sabores favoritos, insignias e historias de tus comidas."],
  ["WhatsApp Image 2026-10-21 at 6.48.27 PM.jpeg", "Explora a tu alrededor", "Busca platillos, restaurantes y personas, y encuentra lugares cerca de ti según tu gusto."],
  ["WhatsApp Image 2026-07-21 at 1.11.18 AM (2).jpeg", "¿No sabes dónde comer?", "Elige un tipo de cocina y deja que CATA sortee un lugar cerca de ti."],
  ["WhatsApp Image 2026-07-21 at 1.28.35 AM.jpeg", "Conoce cada restaurante", "Fotos, calificaciones y dirección. Guárdalo, márcalo como visitado o súmalo a tu viaje."],
  ["WhatsApp Image 2026-10-21 at 6.51.51 PM.jpeg", "Registra cada platillo", "Agrega foto, fecha, restaurante y con quién lo compartiste."],
  ["WhatsApp Image 2026-10-21 at 6.51.51 PM (1).jpeg", "Califica lo que probaste", "Marca ingredientes, sabores y aromas con una intensidad del 1 al 5."],
  ["WhatsApp Image 2026-10-21 at 6.51.51 PM (2).jpeg", "Revisa y publica", "Confirma tu reseña y elige quién puede verla."],
  ["WhatsApp Image 2026-10-21 at 1.02.08 PM.jpeg", "Tu radar de sabor", "Descubre qué intensidades dominan tu paladar: mantecoso, cálido, dulce y más."],
  ["WhatsApp Image 2026-07-20 at 11.53.57 PM (8).jpeg", "Tu diario gastronómico", "Guarda cada viaje como una colección: Italia, Ciudad de México, Copenhague y más."],
  ["WhatsApp Image 2026-07-20 at 11.53.57 PM (6).jpeg", "Planea tu ruta", "Ve tus paradas en orden sobre el mapa, con un botón para llegar a cada una."],
  ["WhatsApp Image 2026-07-20 at 11.53.57 PM (5).jpeg", "Agrega paradas a tu viaje", "Restaurante, platillo, fecha, calificación y notas de cada parada."],
  ["WhatsApp Image 2026-07-20 at 11.41.32 PM (4).jpeg", "Listas para descubrir", "Guarda listas curadas, solicita unirte y compártelas con tus amigos."],
  ["WhatsApp Image 2026-07-20 at 11.53.57 PM (3).jpeg", "Crea tus propias recetas", "Importa desde un enlace, foto o texto, con ingredientes y pasos."],
];

const screens = slides.map(([name]) => `/assets/screens/${encodeURIComponent(name)}`);
const captions = slides.map(([, title, text]) => [title, text]);

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
      <div className="mt-5 min-h-16 text-center" aria-live="polite">
        <p className="font-heading text-lg font-semibold">{captions[index][0]}</p>
        <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-muted-foreground">{captions[index][1]}</p>
      </div>
    </div>
  );
}
