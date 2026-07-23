"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Career } from "@/types/career";

type ContractSigningProps = {
  career: Career;
  onConfirm: () => void;
  onCancel: () => void;
};

type Scene = "intro" | "president" | "contract" | "signed";

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  const formattedDate = new Date(
    Date.UTC(year, month - 1, day)
  );

  if (Number.isNaN(formattedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(formattedDate);
}

export default function ContractSigning({
  career,
  onConfirm,
  onCancel,
}: ContractSigningProps) {
  const [scene, setScene] = useState<Scene>("intro");

  useEffect(() => {
    if (scene === "intro") {
      const timer = window.setTimeout(() => {
        setScene("president");
      }, 2200);

      return () => window.clearTimeout(timer);
    }

    if (scene === "president") {
      const timer = window.setTimeout(() => {
        setScene("contract");
      }, 3200);

      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [scene]);

  function signContract() {
    setScene("signed");

    window.setTimeout(() => {
      onConfirm();
    }, 2600);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black text-white">
      <div
        className="
          absolute
          inset-0
          bg-[url('/images/stadium.jpg')]
          bg-cover
          bg-center
        "
      />

      <div className="absolute inset-0 bg-black/85" />

      <AnimatePresence mode="wait">
        {scene === "intro" && (
          <motion.section
            key="intro"
            className="
              relative
              flex
              min-h-screen
              flex-col
              items-center
              justify-center
              px-6
              text-center
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.06,
              filter: "blur(10px)",
            }}
            transition={{ duration: 0.9 }}
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="
                mb-8
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                border
                border-yellow-500/40
                bg-yellow-500/10
                text-5xl
                shadow-2xl
                shadow-yellow-500/20
              "
            >
              ⚽
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.45em]
                text-yellow-500
              "
            >
              Nuovo incarico
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="
                mt-4
                text-4xl
                font-black
                uppercase
                tracking-tight
                md:text-7xl
              "
            >
              {career.team.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-5 text-lg text-gray-300"
            >
              Benvenuto, Mister.
            </motion.p>
          </motion.section>
        )}

        {scene === "president" && (
          <motion.section
            key="president"
            className="
              relative
              flex
              min-h-screen
              items-center
              justify-center
              px-6
            "
            initial={{
              opacity: 0,
              filter: "blur(14px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            transition={{ duration: 0.9 }}
          >
            <div className="w-full max-w-4xl text-center">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="
                  mx-auto
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/10
                  text-5xl
                  backdrop-blur-xl
                "
              >
                👔
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="
                  mt-8
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.35em]
                  text-yellow-500
                "
              >
                Presidente
              </motion.p>

              <motion.blockquote
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="
                  mx-auto
                  mt-5
                  max-w-3xl
                  text-2xl
                  font-semibold
                  leading-relaxed
                  md:text-4xl
                "
              >
                “Il {career.team.name} è lieto di affidarle
                la guida tecnica della squadra.”
              </motion.blockquote>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.45 }}
                className="mt-6 text-gray-400"
              >
                La società si aspetta che raggiunga
                l&apos;obiettivo:{" "}
                <span className="font-semibold text-yellow-400">
                  {career.team.objective}
                </span>
                .
              </motion.p>
            </div>
          </motion.section>
        )}

        {scene === "contract" && (
          <motion.section
            key="contract"
            className="
              relative
              flex
              min-h-screen
              items-center
              justify-center
              overflow-y-auto
              px-4
              py-8
            "
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: "easeOut",
              }}
              className="
                w-full
                max-w-3xl
                rounded-[2rem]
                border
                border-white/15
                bg-zinc-950/90
                p-6
                shadow-2xl
                backdrop-blur-2xl
                md:p-10
              "
            >
              <div className="border-b border-white/10 pb-6 text-center">
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.4em]
                    text-yellow-500
                  "
                >
                  Contratto ufficiale
                </p>

                <h2 className="mt-3 text-3xl font-black md:text-5xl">
                  {career.team.name}
                </h2>

                <p className="mt-3 text-gray-400">
                  Conferimento dell&apos;incarico di allenatore
                  della prima squadra
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ContractItem
                  label="Allenatore"
                  value={career.coach.name}
                />

                <ContractItem
                  label="Nazionalità"
                  value={career.coach.nationality}
                />

                <ContractItem
                  label="Data di inizio"
                  value={formatDate(career.currentDate)}
                />

                <ContractItem
                  label="Durata iniziale"
                  value="3 stagioni"
                />

                <ContractItem
                  label="Modulo"
                  value={career.team.formation}
                />

                <ContractItem
                  label="Obiettivo"
                  value={career.team.objective}
                  highlighted
                />

                <ContractItem
                  label="Stile di gioco"
                  value={career.philosophy.style}
                />

                <ContractItem
                  label="Pressing"
                  value={career.philosophy.pressing}
                />
              </div>

              <div
                className="
                  mt-8
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  text-sm
                  leading-relaxed
                  text-gray-400
                "
              >
                Con la firma del presente accordo, l&apos;allenatore
                accetta la responsabilità tecnica della squadra e
                si impegna a perseguire gli obiettivi concordati con
                la società.
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onCancel}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-white/15
                    bg-white/5
                    px-6
                    py-4
                    font-bold
                    text-gray-300
                    transition
                    hover:bg-white/10
                  "
                >
                  TORNA INDIETRO
                </button>

                <button
                  type="button"
                  onClick={signContract}
                  className="
                    w-full
                    rounded-2xl
                    bg-yellow-500
                    px-6
                    py-4
                    font-black
                    text-black
                    shadow-lg
                    shadow-yellow-500/20
                    transition
                    hover:scale-[1.02]
                    hover:bg-yellow-400
                    active:scale-[0.98]
                  "
                >
                  FIRMA IL CONTRATTO
                </button>
              </div>
            </motion.div>
          </motion.section>
        )}

        {scene === "signed" && (
          <motion.section
            key="signed"
            className="
              relative
              flex
              min-h-screen
              flex-col
              items-center
              justify-center
              px-6
              text-center
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{
                scale: 0,
                rotate: -20,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 15,
              }}
              className="
                flex
                h-28
                w-28
                items-center
                justify-center
                rounded-full
                bg-yellow-500
                text-6xl
                text-black
                shadow-2xl
                shadow-yellow-500/40
              "
            >
              ✓
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="
                mt-8
                text-sm
                font-bold
                uppercase
                tracking-[0.4em]
                text-yellow-500
              "
            >
              Accordo ufficiale
            </motion.p>

            <motion.h2
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ delay: 0.7 }}
              className="
                mt-4
                text-4xl
                font-black
                md:text-7xl
              "
            >
              CONTRATTO FIRMATO
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "min(420px, 80vw)" }}
              transition={{
                delay: 1,
                duration: 0.8,
              }}
              className="mt-8 h-px bg-yellow-500"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35 }}
              className="mt-8 text-xl text-gray-300"
            >
              Benvenuto al {career.team.name},{" "}
              <span className="font-bold text-white">
                Mister {career.coach.name}
              </span>
              .
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.65 }}
              className="mt-3 text-gray-500"
            >
              Il centro sportivo ti aspetta.
            </motion.p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

type ContractItemProps = {
  label: string;
  value: string;
  highlighted?: boolean;
};

function ContractItem({
  label,
  value,
  highlighted = false,
}: ContractItemProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-4
      "
    >
      <p className="text-xs uppercase tracking-wider text-gray-500">
        {label}
      </p>

      <p
        className={`mt-2 font-bold ${
          highlighted ? "text-yellow-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}