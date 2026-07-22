"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

  const [career, setCareer] = useState(null);

  useEffect(() => {
    const savedCareer = localStorage.getItem("career");

    if (savedCareer) {
      setCareer(JSON.parse(savedCareer));
    }
  }, []);

  if (!career) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Nessuna carriera trovata
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        DIETRO LA PANCHINA
      </h1>

      <div className="space-y-4 text-xl">

        <p>
          👤 Allenatore: {career.coachName}
        </p>

        <p>
          🎂 Età: {career.coachAge}
        </p>

        <p>
          🌍 Nazionalità: {career.nationality}
        </p>

        <p>
          🏟 Squadra: {career.team}
        </p>

        <p>
          💰 Budget mercato: {career.transferBudget} €
        </p>

        <p>
          👥 Monte ingaggi: {career.salaryBudget} €
        </p>

      </div>

    </main>
  );
}