"use client";

import { useEffect, useState } from "react";
import { staff } from "@/data/staff";
import type { Career } from "@/types/career";
import { loadCareer } from "@/lib/careerStorage";

export default function Dashboard() {
  const [career, setCareer] = useState<Career | null>(null);

  useEffect(() => {
    const savedCareer = loadCareer();

    if (savedCareer) {
      setCareer(savedCareer);
    }
  }, []);

  if (!career) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <h1>Nessuna carriera trovata</h1>
      </main>
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-black
        bg-cover
        bg-center
        p-10
        text-white
      "
      style={{
        backgroundImage: "url('/images/stadium.jpg')",
      }}
    >
      <div className="min-h-screen rounded-3xl bg-black/70 p-10">
        <h1 className="mb-6 text-center text-5xl font-bold">
          DIETRO LA PANCHINA
        </h1>

        <div className="mb-10 text-center">
          <button
            type="button"
            className="
              rounded-xl
              bg-yellow-500
              px-8
              py-4
              font-bold
              text-black
              transition
              hover:scale-105
            "
          >
            AVANZA GIORNO
          </button>
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-3
          "
        >
          {staff.map((person) => (
            <div
              key={person.id}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-700
                bg-gray-900/80
                transition
                hover:scale-105
              "
            >
              <img
                src={person.image}
                alt={`${person.name}, ${person.role}`}
                className="
                  h-48
                  w-full
                  object-cover
                "
              />

              <div className="p-5">
                <h2 className="text-2xl font-bold">
                  {person.name}
                </h2>

                <p className="mt-2 text-gray-300">
                  {person.role}
                </p>

                <button
                  type="button"
                  className="
                    mt-5
                    w-full
                    rounded-xl
                    bg-yellow-500
                    p-3
                    font-bold
                    text-black
                  "
                >
                  APRI CHAT
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}