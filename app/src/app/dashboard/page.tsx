"use client";

import { useEffect, useState } from "react";
import { staff } from "@/data/staff";
import type { Career } from "@/types/career";
import {
  loadCareer,
  saveCareer,
} from "@/lib/careerStorage";

export default function Dashboard() {
  const [career, setCareer] = useState<Career | null>(null);

  useEffect(() => {
    const savedCareer = loadCareer();

    if (savedCareer) {
      setCareer(savedCareer);
    }
  }, []);

  function advanceDay() {
    if (!career) {
      return;
    }

    const [year, month, day] = career.currentDate
      .split("-")
      .map(Number);

    if (
      Number.isNaN(year) ||
      Number.isNaN(month) ||
      Number.isNaN(day)
    ) {
      console.error("Data della carriera non valida.");
      return;
    }

    const nextDate = new Date(
      Date.UTC(year, month - 1, day + 1)
    );

    const updatedCareer: Career = {
      ...career,
      currentDate: nextDate.toISOString().slice(0, 10),
    };

    setCareer(updatedCareer);
    saveCareer(updatedCareer);
  }

  function formatCareerDate(date: string) {
    const [year, month, day] = date
      .split("-")
      .map(Number);

    const careerDate = new Date(
      Date.UTC(year, month - 1, day)
    );

    return new Intl.DateTimeFormat("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(careerDate);
  }

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
        p-4
        text-white
        md:p-10
      "
      style={{
        backgroundImage: "url('/images/stadium.jpg')",
      }}
    >
      <div className="min-h-screen rounded-3xl bg-black/70 p-5 md:p-10">
        <h1 className="mb-2 text-center text-4xl font-bold md:text-5xl">
          DIETRO LA PANCHINA
        </h1>

        <p className="text-center text-lg text-gray-300">
          {career.coach.name} · {career.team.name}
        </p>

        <p className="mt-2 text-center font-semibold text-yellow-400">
          {formatCareerDate(career.currentDate)}
        </p>

        <div className="mb-10 mt-6 text-center">
          <button
            type="button"
            onClick={advanceDay}
            className="
              rounded-xl
              bg-yellow-500
              px-8
              py-4
              font-bold
              text-black
              transition
              hover:scale-105
              hover:bg-yellow-400
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
                    transition
                    hover:bg-yellow-400
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