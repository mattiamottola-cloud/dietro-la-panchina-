"use client";

import { motion } from "framer-motion";
import { teams } from "@/data/teams";
import { useState } from "react";
import type { Career } from "@/types/career";

export default function Carriera() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [coachName, setCoachName] = useState("");
  const [coachAge, setCoachAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [transferBudget, setTransferBudget] = useState("");
  const [salaryBudget, setSalaryBudget] = useState("");
  const [playStyle, setPlayStyle] = useState("");
const [pressing, setPressing] = useState("");
const [defensiveLine, setDefensiveLine] = useState("");
const [formation, setFormation] = useState("");
const [objective, setObjective] = useState("");

const startCareer = () => {
  const transferBudgetNumber = Number(
  transferBudget.replace(/\./g, "")
);

const salaryBudgetNumber = Number(
  salaryBudget.replace(/\./g, "")
);
  const career: Career = {
    currentDate: new Date().toISOString(),

    coach: {
      name: coachName,
      age: Number(coachAge),
      nationality,
    },

    philosophy: {
      style: playStyle,
      pressing,
      defensiveLine,
    },

    team: {
      name: selectedTeam,
      formation,
      objective,
    },

    finance: {
      initialTransferBudget: transferBudgetNumber,
      currentTransferBudget: transferBudgetNumber,
      initialSalaryBudget: salaryBudgetNumber,
      currentSalaryBudget: salaryBudgetNumber,
      transactions: [],
    },

    clubState: {
      presidentTrust: 50,
      boardPressure: 0,
    },

    results: [],
    meetings: [],
    decisions: [],
  };

  localStorage.setItem("career", JSON.stringify(career));

  window.location.href = "/dashboard";
};

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <motion.div
        className="w-full max-w-7xl p-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <h1 className="text-5xl font-bold text-center mb-10">
          NUOVA CARRIERA
        </h1>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


  {/* PROFILO ALLENATORE */}
  {/* PROFILO ALLENATORE */}
<div
  className="
  rounded-2xl
  p-6
  border
  border-gray-700
  bg-cover
  bg-center
  bg-[url('/images/coach.jpg')]
  "
>
    <h2 className="text-2xl font-bold mb-6">
  👤 Allenatore
</h2>


<input
  className="w-full p-4 rounded bg-black border border-gray-700 mb-4"
  placeholder="Nome allenatore"
  value={coachName}
  onChange={(e) => setCoachName(e.target.value)}
/>


<input
  type="number"
  className="w-full p-4 rounded bg-black border border-gray-700 mb-4"
  placeholder="Età allenatore"
  value={coachAge}
  onChange={(e) => setCoachAge(e.target.value)}
/>


<input
  className="w-full p-4 rounded bg-black border border-gray-700 mb-4"
  placeholder="Nazionalità"
  value={nationality}
  onChange={(e) => setNationality(e.target.value)}
/>


<select
  className="w-full p-4 rounded bg-black border border-gray-700 mb-4"
  value={playStyle}
  onChange={(e) => setPlayStyle(e.target.value)}
>
  <option value="">
    Stile di gioco
  </option>
  <option value="Tiki-Taka">
    Tiki-Taka
  </option>
  <option value="Tiki-Taka verticale">
    Tiki-Taka verticale
  </option>
  <option value="Contropiede">
    Contropiede
  </option>
  <option value="Contropiede fluido">
    Contropiede fluido
  </option>
</select>


<select
  className="w-full p-4 rounded bg-black border border-gray-700 mb-4"
  value={pressing}
  onChange={(e) => setPressing(e.target.value)}
>
  <option value="">
    Pressing
  </option>
  <option value="Alto">
    Alto
  </option>
  <option value="Medio">
    Medio
  </option>
  <option value="Basso">
    Basso
  </option>
</select>


<select
  className="w-full p-4 rounded bg-black border border-gray-700"
  value={defensiveLine}
  onChange={(e) => setDefensiveLine(e.target.value)}
>
  <option value="">
    Linea difensiva
  </option>
  <option value="Alta">
    Alta
  </option>
  <option value="Media">
    Media
  </option>
  <option value="Bassa">
    Bassa
  </option>
</select>
  </div>


{/* SQUADRA */}
<div
  className="
  rounded-2xl
  p-6
  border
  border-gray-700
  bg-cover
  bg-center
  bg-[url('/images/team.jpg')]
  "
>

  <h2 className="text-2xl font-bold mb-6">
    🏟 Squadra
  </h2>


<select
className="w-full p-4 rounded bg-black border border-gray-700 mb-4"
value={selectedTeam}
onChange={(e) => setSelectedTeam(e.target.value)}
>

<option value="">
Scegli squadra
</option>

{teams.map((team) => (
<option key={team.name} value={team.name}>
{team.name}
</option>
))}

</select>


<select
className="w-full p-4 rounded bg-black border border-gray-700 mb-4"
value={formation}
onChange={(e) => setFormation(e.target.value)}
>

<option value="">
Scegli modulo
</option>

<option value="4-3-3">
4-3-3
</option>

<option value="4-2-3-1">
4-2-3-1
</option>

<option value="3-5-2">
3-5-2
</option>

<option value="4-4-2">
4-4-2
</option>

</select>


<select
className="w-full p-4 rounded bg-black border border-gray-700"
value={objective}
onChange={(e) => setObjective(e.target.value)}
>

<option value="">
Obiettivo società
</option>

<option value="Vincere il campionato">
Vincere il campionato
</option>

<option value="Qualificazione europea">
Qualificazione europea
</option>

<option value="Salvezza">
Salvezza
</option>

<option value="Valorizzare giovani">
Valorizzare giovani
</option>

</select>


</div>

 {/* SOCIETA */}
<div
  className="
  rounded-2xl
  p-6
  border
  border-gray-700
  bg-cover
  bg-center
  bg-[url('/images/finance.jpg')]
  "
>

  <h2 className="text-2xl font-bold mb-6">
    💰 Società
  </h2>


<input
className="w-full p-4 rounded bg-black border border-gray-700 mb-4"
placeholder="Budget mercato (€)"
value={transferBudget}
onChange={(e) =>
  setTransferBudget(
    Number(e.target.value.replace(/\D/g, ""))
      .toLocaleString("it-IT")
  )
}
/>


<input
className="w-full p-4 rounded bg-black border border-gray-700 mb-6"
placeholder="Monte ingaggi annuale (€)"
value={salaryBudget}
onChange={(e) =>
  setSalaryBudget(
    Number(e.target.value.replace(/\D/g, ""))
      .toLocaleString("it-IT")
  )
}
/>

</div>



</div>


    
<button

  onClick={startCareer}

  className="

  mt-8

  mx-auto

  block

  w-80

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
        

      </motion.div>

    </main>
  );
}
