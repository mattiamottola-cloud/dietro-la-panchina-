"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

  const [career, setCareer] = useState<any>(null);

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
    👤 Allenatore: {career.coach.name}
  </p>

  <p>
    🎂 Età: {career.coach.age}
  </p>

  <p>
    🌍 Nazionalità: {career.coach.nationality}
  </p>


  <hr className="border-gray-700 my-6" />


  <p>
    🏟 Squadra: {career.team.name}
  </p>

  <p>
    ⚽ Modulo: {career.team.formation}
  </p>

  <p>
    🎯 Obiettivo: {career.team.objective}
  </p>


  <hr className="border-gray-700 my-6" />


  <p>
    🧠 Stile di gioco: {career.philosophy.style}
  </p>

  <p>
    🔥 Pressing: {career.philosophy.pressing}
  </p>

  <p>
    🛡 Linea difensiva: {career.philosophy.defensiveLine}
  </p>


  <hr className="border-gray-700 my-6" />


  <p>
    💰 Budget mercato: {career.finance.transferBudget} €
  </p>

  <p>
    👥 Monte ingaggi: {career.finance.salaryBudget} €
  </p>

</div>

    </main>
  );
}