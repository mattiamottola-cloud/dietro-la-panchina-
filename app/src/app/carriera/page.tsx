"use client";

import { motion } from "framer-motion";
import { teams } from "@/data/teams";
import { useState } from "react";

export default function Carriera() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [coachName, setCoachName] = useState("");
  const [coachAge, setCoachAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [transferBudget, setTransferBudget] = useState("");
  const [salaryBudget, setSalaryBudget] = useState("");

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <motion.div
        className="w-full max-w-3xl p-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <h1 className="text-5xl font-bold text-center mb-10">
          NUOVA CARRIERA
        </h1>


        <div className="space-y-6">

       <input
  className="w-full p-4 rounded bg-gray-900 border border-gray-700"
  placeholder="Nome allenatore"
  value={coachName}
  onChange={(e) => setCoachName(e.target.value)}
/>
<input
  type="number"
  className="w-full p-4 rounded bg-gray-900 border border-gray-700"
  placeholder="Età allenatore"
  value={coachAge}
  onChange={(e) => setCoachAge(e.target.value)}
/>

         <input
  className="w-full p-4 rounded bg-gray-900 border border-gray-700"
  placeholder="Nazionalità"
  value={nationality}
  onChange={(e) => setNationality(e.target.value)}
/>


    <select
    className="w-full p-4 rounded bg-gray-900 border border-gray-700"
    value={selectedTeam}
    onChange={(e) => setSelectedTeam(e.target.value)}
    >
    <option value="">Scegli squadra</option>

    {teams.map((team) => (
        <option key={team.name} value={team.name}>
        {team.name}
        </option>
    ))}

    </select>

{selectedTeam && (
  <div className="mt-6 p-4 rounded-xl bg-gray-900 border border-gray-700 text-left">

    <h3 className="text-xl font-bold">
      {selectedTeam}
    </h3>

    <p className="mt-2 text-gray-300">
      🏟 Stadio:{" "}
      {
        teams.find(
          (team) => team.name === selectedTeam
        )?.stadium
      }
    </p>

    <p className="mt-2 text-gray-300">
      🎯 Obiettivo:{" "}
      {
        teams.find(
          (team) => team.name === selectedTeam
        )?.objective
      }
    </p>

  </div>
)}


          <select className="w-full p-4 rounded bg-gray-900 border border-gray-700">
            <option>Scegli modulo</option>
            <option>4-3-3</option>
            <option>4-2-3-1</option>
            <option>3-5-2</option>
          </select>


          <select className="w-full p-4 rounded bg-gray-900 border border-gray-700">
            <option>Obiettivo società</option>
            <option>Vincere il campionato</option>
            <option>Qualificazione europea</option>
            <option>Salvezza</option>
            <option>Valorizzare giovani</option>
          </select>


         <input
  type="number"
  className="w-full p-4 rounded bg-gray-900 border border-gray-700"
  placeholder="Budget mercato (€)"
  value={transferBudget}
  onChange={(e) => setTransferBudget(e.target.value)}
/>

       <input
  type="number"
  className="w-full p-4 rounded bg-gray-900 border border-gray-700"
  placeholder="Monte ingaggi annuale (€)"
  value={salaryBudget}
  onChange={(e) => setSalaryBudget(e.target.value)}
/>


          <button
            className="
            w-full
            mt-6
            bg-yellow-500
            text-black
            font-bold
            p-4
            rounded-xl
            text-xl
            hover:scale-105
            transition
            "
          >
            INIZIA STAGIONE
          </button>


        </div>

      </motion.div>

    </main>
  );
}
